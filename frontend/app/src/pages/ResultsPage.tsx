import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { useSearchParams, useNavigate } from "react-router-dom";
import SearchResult from "../components/SearchResults.tsx";

type Asset = {
  title: string;
  link: string;
  preview: string;
};

export default function ResultsPage() {
  const [params] = useSearchParams();
  const queryParam = params.get("q") ?? "";
  const [query, setQuery] = useState(queryParam);
  const [results, setResults] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch results whenever queryParam changes
  useEffect(() => {
    if (!queryParam) return;

    setLoading(true);
    setError("");

    fetch(`https://solo-assets.vercel.app/api/search?q=${encodeURIComponent(queryParam)}`)
      .then((res) => res.json())
      .then((data: Asset[]) => {
        setResults(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch results");
        setLoading(false);
      });
  }, [queryParam]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Header */}
      <header className="mb-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">
          <div className="text-2xl font-bold text-[#fc6f03]">SoloAssets</div>
          <div className="flex-1">
            <form onSubmit={handleSubmit}>
              <div className="flex items-center border border-zinc-300 rounded-full shadow-md px-4 py-2">
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search…"
                  className="w-full outline-none"
                />
                <Search className="text-gray-500" />
              </div>
            </form>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-5xl mx-auto px-4 py-6">
        {loading && <p className="text-gray-500">Loading results...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && results.length === 0 && (
          <p className="text-gray-500">No results found for "{queryParam}".</p>
        )}

        <div className="space-y-8">
          {results.map((asset, idx) => (
            <SearchResult
              key={idx}
              url={asset.link}
              title={asset.title}
              description={asset.preview} // you could show the image too later
            />
          ))}
        </div>
      </main>
    </div>
  );
}
