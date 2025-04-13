import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const response = await fetch("http://127.0.0.1:8080/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    const jsonResponse = JSON.parse(text);
    let content = jsonResponse.answer;
    if (content.startsWith("markdown\n")) {
      content = content.replace(/^markdown\n/, "");
    }

    return new NextResponse(content, {
      headers: {
        "Content-Type": content.startsWith("<") ? "text/html" : "text/plain",
      },
    });
  } catch (error) {
    console.error("Proxy error:", error);
    return NextResponse.json(
      { error: "Failed to proxy request" },
      { status: 500 },
    );
  }
}
