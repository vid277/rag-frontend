use actix_web::{App, HttpResponse, HttpServer, Responder, web};
use anyhow::Result;
use async_openai::Client;
use async_openai::config::OpenAIConfig;
use serde::{Deserialize, Serialize};
use std::path::PathBuf;
use swiftide::indexing::transformers::{
    ChunkMarkdown, Embed, MetadataKeywords, MetadataSummary, MetadataTitle,
};
use swiftide::indexing::{Pipeline, loaders::FileLoader};
use swiftide::integrations::openai::OpenAI;
use swiftide::integrations::qdrant::Qdrant;
use swiftide::query::{self, Query, answers, query_transformers, response_transformers, states};

#[derive(Deserialize)]
struct QueryRequest {
    query: String,
}

#[derive(Serialize)]
struct QueryResponse {
    answer: String,
}

async fn handle_query(
    query: web::Json<QueryRequest>,
    openai: web::Data<OpenAI>,
    qdrant: web::Data<Qdrant>,
) -> impl Responder {
    match query_internal(&query.query, &openai, &qdrant).await {
        Ok(result) => HttpResponse::Ok().json(QueryResponse {
            answer: result.answer().to_string(),
        }),
        Err(e) => HttpResponse::InternalServerError().body(format!("Error: {}", e)),
    }
}

async fn query_internal(
    query: &str,
    openai_client: &OpenAI,
    qdrant: &Qdrant,
) -> Result<Query<states::Answered>> {
    let pipeline = query::Pipeline::default()
        .then_transform_query(query_transformers::GenerateSubquestions::from_client(
            openai_client.clone(),
        ))
        .then_transform_query(query_transformers::Embed::from_client(
            openai_client.clone(),
        ))
        .then_retrieve(qdrant.clone())
        .then_transform_response(response_transformers::Summary::from_client(
            openai_client.clone(),
        ))
        .then_answer(answers::Simple::from_client(openai_client.clone()));

    pipeline.query(query).await
}

#[tokio::main]
pub async fn main() -> Result<()> {
    tracing_subscriber::fmt::init();
    dotenv::dotenv().ok();

    let api_key = std::env::var("OPENAI_API_KEY").expect("OPENAI_API_KEY must be set in .env file");

    let config = OpenAIConfig::new().with_api_key(api_key);
    let client = Client::with_config(config);

    let openai = OpenAI::builder()
        .default_embed_model("text-embedding-3-small")
        .default_prompt_model("gpt-4o-mini")
        .client(client)
        .build()?;

    let qdrant = Qdrant::builder()
        .vector_size(1536)
        .collection_name("gt-rag-v1")
        .build()?;

    let path = PathBuf::from("./scraped_data");
    index_content(&path, &openai, &qdrant).await?;

    let openai_data = web::Data::new(openai);
    let qdrant_data = web::Data::new(qdrant);

    let server_url = std::env::var("SERVER_URL").expect("SERVER_URL must be set in .env file");

    println!("Starting server at {}", server_url);

    HttpServer::new(move || {
        App::new()
            .app_data(openai_data.clone())
            .app_data(qdrant_data.clone())
            .route("/query", web::post().to(handle_query))
    })
    .bind(&server_url)?
    .run()
    .await?;

    Ok(())
}

async fn index_content(path: &PathBuf, openai: &OpenAI, qdrant: &Qdrant) -> Result<()> {
    tracing::info!(path=?path, "Indexing content");

    Pipeline::from_loader(FileLoader::new(path).with_extensions(&["md"]))
        .with_concurrency(2)
        .then_chunk(ChunkMarkdown::from_chunk_range(50..1024))
        .then(MetadataKeywords::new(openai.clone()))
        .then(MetadataTitle::new(openai.clone()))
        .then(MetadataSummary::new(openai.clone()))
        .then_in_batch(|nodes: Vec<swiftide::indexing::Node>| {
            use swiftide::indexing::IndexingStream;
            IndexingStream::iter(nodes.into_iter().map(|mut node| {
                node.metadata
                    .insert("processed".to_string(), "true".to_string());
                Ok(node)
            }))
        })
        .then_in_batch(Embed::new(openai.clone()))
        .then_store_with(qdrant.clone())
        .run()
        .await
}
