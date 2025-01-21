// frontend/pages/influencer/[id].tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

type Influencer = {
  id: number;
  name: string;
  twitter_handle: string;
  reputation_score: number;
  journals_quoted: string;
};

export default function InfluencerPage() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState<Influencer | null>(null);

  useEffect(() => {
    if (!id) return;
    async function fetchInfluencer() {
      let { data, error } = await supabase
        .from("influencers")
        .select("*")
        .eq("id", id)
        .single();
      if (!error) setData(data);
    }
    fetchInfluencer();
  }, [id]);

  return (
    <div className="p-5">
      {data ? (
        <>
          <h1 className="text-3xl font-bold">{data.name}</h1>
          <p>@{data.twitter_handle}</p>
          <p>Reputation Score: {data.reputation_score}</p>
          <p>Journals Quoted: {data.journals_quoted}</p>
        </>
      ) : (
        "Loading..."
      )}
    </div>
  );
}
