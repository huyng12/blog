import fs from "fs";
import matter from "gray-matter";
import path from "path";

export interface Meta {
	title: string;
	summary: string;
	tags: string[];
	postedAt: string;
}

export interface Post {
	slug: string;
	meta: Meta;
	content: string;
}

interface ContentManagerGeneric {
	getSlugs: () => string[];
	getPosts: () => Post[];
	getPostBySlug: (slug: string) => Post;
}

class ContentManager implements ContentManagerGeneric {
	private root: string;

	constructor() {
		this.root = path.resolve("posts");
	}

	getSlugs(): string[] {
		return fs
			.readdirSync(this.root)
			.map((filename) => filename.split(".")[0]);
	}

	private getMdx(slug: string): string {
		return fs.readFileSync(path.join(this.root, `${slug}.mdx`), "utf-8");
	}

	private parse(mdx: string): Omit<Post, "slug"> {
		const { data: meta, content } = matter(mdx);
		return {
			content,
			meta: meta as Meta,
		};
	}

	getPostBySlug(slug: string): Post {
		const mdx = this.getMdx(slug);
		return { slug, ...this.parse(mdx) };
	}

	getPosts(): Post[] {
		const slugs = this.getSlugs();
		const posts = slugs.map((slug) => this.getPostBySlug(slug));
		return posts.sort(
			(p1, p2) =>
				new Date(p2.meta.postedAt).getTime() -
				new Date(p1.meta.postedAt).getTime()
		);
	}
}

export const contentManager = new ContentManager();
