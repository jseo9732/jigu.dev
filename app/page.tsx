import { Hero } from "@/components/hero/hero";
import { PostList } from "@/components/post-list/post-list";
import { getAllPosts, getAllCategories } from "@/lib/posts";

export default function HomePage() {
  const posts = getAllPosts();
  const categories = getAllCategories();

  return (
    <>
      <Hero postCount={posts.length} />
      <PostList posts={posts} categories={categories} />
    </>
  );
}
