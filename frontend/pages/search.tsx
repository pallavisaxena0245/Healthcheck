// frontend/pages/search.tsx
import { useState } from "react";
import { supabase } from "../lib/supabase";

type Influencer = {
  id: number;
  name: string;
  journals_quoted: string;
};

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Influencer[]>([]);

  const handleSearch = async () => {
    let { data, error } = await supabase
      .from("influencers")
      .select("id, name, journals_quoted")
      .ilike("journals_quoted", `%${query}%`);

    if (!error) setResults(data || []);
  };

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold">Search Influencers</h1>
      <input
        type="text"
        className="border p-2 w-full mt-3"
        placeholder="Search by journal..."
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="mt-3 bg-blue-500 text-white px-4 py-2" onClick={handleSearch}>
        Search
      </button>

      <ul className="mt-5">
        {results.map((item) => (
          <li key={item.id} className="border p-2">
            {item.name} - {item.journals_quoted}
          </li>
        ))}
      </ul>
    </div>
  );
}
