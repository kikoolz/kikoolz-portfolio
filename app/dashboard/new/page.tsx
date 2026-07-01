import PostForm from "@/components/admin/PostForm";

export default function NewPostPage() {
  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-zinc-900 dark:text-zinc-100">Create Post</h1>
      <PostForm />
    </div>
  );
}
