import React from "react";
import { useState } from "react";
import { useSearchParams , useNavigate } from "react-router-dom";

export default function ResultsPage() {

    const [params] = useSearchParams();
  const queryParam = params.get("q") ?? "";
  const [query, setQuery] = useState(queryParam);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };
  return (
    <div className="min-h-screen bg-white text-gray-800">

      <header className="mb-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-4">

          <div className="text-2xl font-bold text-[#fc6f03] text-left">SoloAssets</div>

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
            </div>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">

        <div className="space-y-8">
          <div>
            <a
              href="#"
              className="text-sm text-green-700 hover:underline block"
            >
              www.example.com › page
            </a>
            <a
              href="#"
              className="text-xl text-[#fc6f03] hover:underline block"
            >
              Example Result Title Goes Here
            </a>
            <p className="text-gray-600 mt-1">
              This is a short preview description of the page content that looks
              similar to a search engine snippet.
            </p>
          </div>

          {/* Result */}
          <div>
            <a
              href="#"
              className="text-sm text-green-700 hover:underline block"
            >
              www.coolsite.com
            </a>
            <a
              href="#"
              className="text-xl text-[#fc6f03] hover:underline block"
            >
              Another Result — With a Clickable Title
            </a>
            <p className="text-gray-600 mt-1">
              Tailwind makes it easy to style layouts like modern search engines
              with clean spacing and typography.
            </p>
          </div>

          {/* Add more results as needed */}
        </div>
      </main>
    </div>
  );
}
