import Link from "next/link";

export default function PostCard({ post, subreddit }) {
  if (!post) {
    console.error("PostCard received undefined post:", post);
    return <p className="text-red-500">Error: Post data is missing.</p>;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-4 border border-gray-200 hover:shadow-xl transition-all">
      {/* Subreddit Label */}
      <div className="text-sm text-gray-500 mb-2">
        <Link href={`https://reddit.com/r/${subreddit}`} target="_blank">
          r/{subreddit}
        </Link>{" "}
        • <span className="font-semibold">{new Date(post.createdAt).toLocaleString()}</span>
      </div>

      {/* Title */}
      <h2 className="text-lg font-bold text-gray-900 mb-1">
        <Link href={post.redditUrl} target="_blank" className="hover:underline">
          {post.title}
        </Link>
      </h2>

      {/* ✅ Use <img> to allow dynamic external images without next.config.js */}
      {post.thumbnail && post.thumbnail.startsWith("http") && (
        <div className="w-full h-40 overflow-hidden rounded-lg">
          <img
            src={post.thumbnail}
            alt={post.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}

      {/* Votes & Comments */}
      <div className="flex items-center justify-between text-gray-500 text-sm mt-3">
        <span>⬆ {post.score} upvotes</span>
        <span>💬 {post.commentCount} comments</span>
      </div>
    </div>
  );
}
