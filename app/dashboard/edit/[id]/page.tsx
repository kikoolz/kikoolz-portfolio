import PostForm from "@/components/admin/PostForm";
import { prisma } from "@/lib/prisma";

async function getPost(id: string) {
  const post = await prisma.post.findUnique({
    where: { id },
  });

  if (!post) {
    throw new Error('Post not found');
  }

  return post;
}

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const post = await getPost(id);

    return (
      <div className="p-8 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-zinc-100">Edit Post</h1>
        <PostForm initialData={post} />
      </div>
    );
  } catch (error) {
    return (
      <div className="p-8 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-zinc-100">Error</h1>
        <p className="text-zinc-600 dark:text-zinc-400">Failed to load post. Please try again.</p>
      </div>
    );
  }
}
