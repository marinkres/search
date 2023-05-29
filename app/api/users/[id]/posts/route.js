import Prompt from "@models/prompt";
import User from "@models/user";

import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const prompts = await Prompt.find({ creator: params.id }).populate("creator")

        return new Response(JSON.stringify(prompts), { status: 200,
            headers: {
            'Cache-Control': 'no-store, max-age=0',
            } })
    } catch (error) {
        return new Response("Failed to fetch prompts created by user", { status: 500,
            headers: {
            'Cache-Control': 'no-store, max-age=0',
            } })
    }
} 