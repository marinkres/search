import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
    const { userId, prompt, tag, rating } = await request.json();
    console.log('Data received by backend:', { prompt, userId, tag, rating }); // Log the data that is received by the backend
    try {
        await connectToDB();
        const newPrompt = new Prompt({ creator: userId, prompt, tag, rating });

        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        return new Response("Failed to create a new prompt", { status: 500 });
    }
}