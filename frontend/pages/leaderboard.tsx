import { supabase } from "../lib/supabase";
import { useEffect, useState } from "react";

type Influencer = {
  id: number;
  name: string;
  reputation_score: number;
};

export default function Leaderboard() {
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  useEffect(() => {
    async function fetchLeaderboard() {
      let { data, error } = await supabase
        .from("influencers")
        .select("id, name, reputation_score")
        .order("reputation_score", { ascending: false })
        .range((page - 1) * PAGE_SIZE, page * PAGE_SIZE - 1);

      if (!error) setInfluencers((prev) => [...prev, ...data]);
    }

    fetchLeaderboard();
  }, [page]);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Leaderboard</h1>
      <ul className="bg-white shadow-md rounded-lg overflow-hidden">
        {influencers.map((inf, index) => (
          <li key={inf.id} className="border-b p-4 flex justify-between items-center hover:bg-gray-100">
            <span className="font-semibold">{index + 1}. {inf.name}</span>
            <span className="text-blue-600 font-bold">Score: {inf.reputation_score}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={() => setPage(page + 1)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md w-full"
      >
        Load More
      </button>
    </div>
  );
}
