import type { Post } from "@/lib/posts";
import { cn } from "@/lib/utils";

/** Date and reading time for a post, with the byline when asked for. */
export default function PostMeta({ post, byline, className }: { post: Post; byline?: boolean; className?: string }) {
  return (
    <p className={cn("muted flex flex-wrap gap-x-5 gap-y-1 text-[0.875rem]", className)}>
      {byline ? <span>By {post.author}</span> : null}
      <time dateTime={post.date}>{post.dateLabel}</time>
      <span>{post.readTime}</span>
    </p>
  );
}
