import Link from "next/link";
import { Eye } from "lucide-react";

interface BlogPost {
  title: string;
  slug: string;
  description: string;
  date: string;
  published: boolean;
  heroImage?: string;
}

type Props = {
	blog: BlogPost;
	views: number;
};

export const Article: React.FC<Props> = ({ blog, views }) => {
	return (
		<Link href={`/blog/${blog.slug}`}>
			<article className="p-4 md:p-6 h-full flex flex-col justify-between">
				<div className="flex justify-between gap-2 items-center mb-3">
					<span className="text-xs duration-1000 text-zinc-500 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-white group-hover:border-zinc-200 dark:group-hover:border-zinc-200 drop-shadow-orange">
						{blog.date ? (
							<time dateTime={new Date(blog.date).toISOString()}>
								{Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(
									new Date(blog.date),
								)}
							</time>
						) : (
							<span>SOON</span>
						)}
					</span>
					<span className="text-zinc-500 dark:text-zinc-400 text-xs  flex items-center gap-1">
						<Eye className="w-4 h-4" />{" "}
						{Intl.NumberFormat("en-US", { notation: "compact" }).format(views)}
					</span>
				</div>
				<div className="flex-1 flex flex-col justify-center">
					<h2 className="z-20 text-xl duration-1000 lg:text-2xl text-zinc-900 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-white line-clamp-2 leading-tight">
						{blog.title}
					</h2>
					<p className="z-20 mt-3 text-sm duration-1000 text-zinc-600 dark:text-zinc-400 opacity-65 group-hover:opacity-90 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 line-clamp-3 leading-relaxed">
						{blog.description}
					</p>
				</div>
				
			</article>
		</Link>
	);
};