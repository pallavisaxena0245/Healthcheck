// frontend/pages/leaderboard.tsx
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

type Influencer = {
  id: number;
  name: string;
  twitter_handle: string;
  reputation_score: number;
};

export default function Leaderboard() {
  const [data, setData] = useState<Influencer[]>([]);

  useEffect(() => {
    async function fetchLeaderboard() {
      let { data, error } = await supabase
        .from("influencers")
        .select("*")
        .order("reputation_score", { ascending: false })
        .limit(10);

      if (!error) setData(data || []);
    }

    fetchLeaderboard();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold">Leaderboard</h1>
      <table className="mt-5 w-full border-collapse border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Name</th>
            <th className="border p-2">Twitter</th>
            <th className="border p-2">Reputation</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border">
              <td className="p-2">{item.name}</td>
              <td className="p-2">@{item.twitter_handle}</td>
              <td className="p-2">{item.reputation_score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
