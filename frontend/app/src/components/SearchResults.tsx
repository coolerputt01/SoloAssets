type SearchResultProps = {
  url: string;
  title: string;
  description: string;
  preview?: string; // optional image URL
};

export default function SearchResult({
  url,
  title,
  description,
  preview,
}: SearchResultProps) {
  // Truncate description if it's too long (e.g., 100 chars)
  const truncatedDescription =
    description.length > 60 ? description.slice(0, 50) + "..." : description;

  return (
    <div className="space-y-2">
      {/* Clickable preview image */}
      {preview && (
        <a href={url} target="_blank" rel="noopener noreferrer">
          <img
            src={preview}
            alt={title}
            className="max-w-xs w-full rounded-md border border-zinc-300 hover:scale-105 transition-transform"
          />
        </a>
      )}

      {/* Link URL */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-green-700 hover:underline block truncate"
        title={url} // hover shows full URL
      >
        {url}
      </a>

      {/* Title */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xl text-[#fc6f03] hover:underline block"
      >
        {title}
      </a>

      {/* Truncated Description */}
      <p className="text-gray-600 mt-1">{truncatedDescription}</p>
    </div>
  );
}
