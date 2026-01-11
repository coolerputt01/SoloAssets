import React from "react";

type SearchResultProps = {
  url: string;
  title: string;
  description: string;
};

export default function SearchResult({
  url,
  title,
  description,
}: SearchResultProps) {
  return (
    <div>
      <a
        href={url}
        className="text-sm text-green-700 hover:underline block"
      >
        {url}
      </a>

      <a
        href={url}
        className="text-xl text-[#fc6f03] hover:underline block"
      >
        {title}
      </a>

      <p className="text-gray-600 mt-1">
        {description}
      </p>
    </div>
  );
}
