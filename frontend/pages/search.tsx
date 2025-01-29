import { supabase } from "../lib/supabase";
import { useState } from "react";

type Influencer = {
  id: number;
  name: string;
  reputation_score: number;
  journals_quoted: string;
};

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Influencer[]>([]);

  async function handleSearch() {
    let { data, error } = await supabase
      .from("influencers")
      .select("*")
      .or(`name.ilike.%${query}%, journals_quoted.ilike.%${query}%`);

    if (!error) setResults(data);
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Search Influencers</h1>
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search by name or journals..."
          className="border p-3 rounded-md w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-3 rounded-md">
          Search
        </button>
      </div>

      <ul className="mt-5 bg-white shadow-md rounded-lg overflow-hidden">
        {results.map((inf) => (
          <li key={inf.id} className="border-b p-4 flex justify-between hover:bg-gray-100">
            <a href={`/influencer/${inf.id}`} className="font-bold text-blue-600">{inf.name}</a>
            <span className="text-gray-700">Score: {inf.reputation_score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}