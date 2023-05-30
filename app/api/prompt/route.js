import Prompt from "@models/prompt";
import User from "@models/user";

import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    console.log("BLABLABLA")
    try {
        await connectToDB()

        const prompts = await Prompt.find({}).populate('creator')
        return new Response(JSON.stringify(prompts), { status: 200,
            headers: {
                "Cache-Control": "s-maxage=0, stale-while-revalidate"
            }, })
        
    } catch (error) {
        return new Response("Failed to fetch all prompt", { status: 500,
            headers: {
                "Cache-Control": "s-maxage=0, stale-while-revalidate"
            },  })
    }
} 