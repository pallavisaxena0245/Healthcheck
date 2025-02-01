import { Client } from "twitter-api-sdk";

const twitterClient = new Client(process.env.TWITTER_BEARER_TOKEN!);

export const fetchTweets = async (username:string) => {
    try {
        const user = await twitterClient.users.findUserByUsername(username);
        if(!user || !user.data ) throw new Error("User not found");

        const tweets = await twitterClient.tweets.userIdTweets(user.data.id, max_results:10);

        return tweets.data || [];
    }
    catch(error){
        console.error("Error fetching tweets:", error);
        return [];
    }

    
};

