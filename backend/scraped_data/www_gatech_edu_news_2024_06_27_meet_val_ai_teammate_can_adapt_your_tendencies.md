[Science and Technology](https://www.gatech.edu/news/topic/science-and-technology)

# Meet VAL, an AI Teammate That Can Adapt to Your Tendencies

Jun 27, 2024


A team’s success in any competitive environment often hinges on how well each member can anticipate the actions of their teammates.

Assistant Professor [**Christopher MacLellan**](https://chrismaclellan.com/) thinks teachable artificial intelligence (AI) agents are uniquely suited for this role and make ideal teammates for video gamers.

With the help of funding from the U.S. Department of Defense, MacLellan hopes to prove his theory with a conversational, task-performing agent he co-engineered called the Verbal Apprentice Learner (VAL).

“You need the ability to adapt to what your teammates are doing to be an effective teammate,” MacLellan said. “We’re exploring this capability for AI agents in the context of video games.”

Unlike generative AI chatbots like ChatGPT, VAL uses an interactive task-learning approach.

“VAL learns how you do things in the way you want them done,” MacLellan said. “When you tell it to do something, it will do it the way you taught it instead of some generic random way from the internet.”

A key difference between VAL and a chatbot is that VAL can perceive and act within the gaming world. A chatbot, like ChatGPT, only perceives and acts within the chat dialog.

MacLellan immersed VAL into an open-sourced, simplified version of the popular Nintendo cooperative video game Overcooked to discover how well the agent can function as a teammate. In Overcooked, up to four players work together to prepare dishes in a kitchen while earning points for every completed order.

#### **How Fast Can Val Learn?**

In a study with 12 participants, MacLellan found that users could often correctly teach VAL new tasks with only a few examples.

First, the user must teach VAL how to play the game. Knowing that a single human error could compromise results, MacLellan designed three precautionary features:

- When VAL receives a command such as "cook an onion," it asks clarifying questions to understand and confirm its task. As VAL continues to learn, clarification prompts decrease.
- An “undo” button to ensure users can reverse an errant command.
- VAL contains GPT subcomponents to interpret user input, allowing it to adapt to ambiguous commands and typos. The GPT subcomponents drive changes in VAL’s task knowledge, which it uses to perform tasks without additional guidance.

The participants in MacLellan’s study used these features to ensure VAL learned the tasks correctly.

The high volume of prompts creates a more tedious experience. Still, MacLellan said it provides detailed data on system performance and user experience. That insight should make designing a more seamless experience in future versions of VAL possible.

The prompts also require the AI to be explainable.

“When VAL learns something, it uses the language model to label each node in the task knowledge graph that the system constructs,” MacLellan said. “You can see what it learned and how it breaks tasks down into actions.”

#### **Beyond Gaming**

MacLellan’s [**Teachable AI Lab**](https://tail.cc.gatech.edu/) is devoted to developing AI that inexperienced users can train.

“We are trying to come up with a more usable system where anyone, including people with limited expertise, could come in and interact with the agent and be able to teach it within just five minutes of interacting with it for the first time,” he said.

His work caught the attention of the Department of Defense, which awarded MacLellan multiple grants to fund several of his projects, including VAL. The possibilities of how the DoD could use VAL, on and off the battlefield, are innumerable.

“(The DoD) envisions a future in which people and AI agents jointly work together to solve problems,” MacLellan said. “You need the ability to adapt to what your teammates are doing to be an effective teammate.

“We look at the dynamics of different teaming circumstances and consider what are the right ways to team AI agents with people. The key hypothesis for our project is agents that can learn on the fly and adapt to their users will make better teammates than those that are pre-trained like GPT.”

#### **Design Your Own Agent**

MacLellan is co-organizing a gaming agent design competition sponsored by the Institute of Electrical and Electronic Engineers (IEEE) 2024 [**Conference on Games**](https://2024.ieee-cog.org/) in Milan, Italy.

[**The Dice Adventure Competition**](https://strong-tact.github.io/) invites participants to design their own AI agent to play a multi-player, turn-based dungeon crawling game or to play the game as a human teammate. The competition this month and in July offers $1,000 in prizes for players and agent developers in the top three teams.