import { Hero } from "@/components/hero/hero";
import { PostList } from "@/components/post-list/post-list";
import { getAllPosts, getAllCategories } from "@/lib/posts";
import { getGithubContributions } from "@/lib/github";

export default async function HomePage() {
  const posts = getAllPosts();
  const categories = getAllCategories();
  const contributions = await getGithubContributions();

  return (
    <>
      <Hero postCount={posts.length} contributions={contributions} />
      <PostList posts={posts} categories={categories} />
    </>
  );
}
