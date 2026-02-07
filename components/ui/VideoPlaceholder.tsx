"use client";

interface VideoPlaceholderProps {
  title?: string;
  videoUrl?: string;
  className?: string;
}

export default function VideoPlaceholder({
  title = "Video Coming Soon",
  videoUrl,
  className = "",
}: VideoPlaceholderProps) {
  // If a real YouTube URL is provided, render the embed
  if (videoUrl && videoUrl !== "" && !videoUrl.includes("PLACEHOLDER")) {
    return (
      <div className={`w-full ${className}`}>
        <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-md">
          <iframe
            src={videoUrl}
            title={title}
            className="absolute inset-0 w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    );
  }

  // Placeholder state
  return (
    <div className={`w-full ${className}`}>
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-charcoal/5 border-2 border-dashed border-sage/20 flex flex-col items-center justify-center gap-4">
        {/* Play button icon */}
        <div className="w-16 h-16 rounded-full bg-sage/10 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-sage ml-1"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <p className="text-soft-brown font-body text-sm">{title}</p>
      </div>
    </div>
  );
}
