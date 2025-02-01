import { OpenAI } from "openai";
import _ from "lodash";
import { supabase } from "./supabaseClient";

//Initialize OpenAI
const openai = new OpenAI({
    apiKey : process.env.OpenAI_API_KEY!,
});

export const extractHealthClaims = async (text:string) => {
    const prompt = `Extract health-related claims from the following text and categorize them into fields like Nutrition, Medicine, Mental Health, etc. List them separately:\n\n${text}`;
  
    const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }]
    });

    const claims = response.choices[0]?.message.split("\n").filter(Boolean) || [];
    return claims;


    export const storeClaims = async (claims: string[], influencerId: string) => {
        //storing unique claims
        const uniqueClaims = _.uniqBy(claims , (claim) => claim.toLowerCase());

        //inserting into supabase
        const {error} = await supabase.from("claims").insert(
            uniqueClaims.map((claim) => {
                text:claim,
                influencer_id : influencerId,
            })
        )

        if (error) console.error("Error storing claims:", error);
    }
}