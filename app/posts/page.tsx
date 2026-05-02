import type { Metadata } from "next";
import { PostList } from "@/components/post-list/post-list";
import { getAllPosts, getAllCategories } from "@/lib/posts";

export const metadata: Metadata = {
  title: "글",
  description: "지구가 쓴 모든 글",
};

export default function PostsPage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <div style={{ paddingTop: "40px" }}>
      <PostList posts={posts} categories={categories} />
    </div>
  );
}
