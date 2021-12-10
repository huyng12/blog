import { Page } from "components/page/page";
import { contentManager, Post } from "lib/content-manager";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import Link from "next/link";

interface Props {
	post: Post;
	mdxRemoteProps: MDXRemoteSerializeResult;
}

export default function PostPage(props: Props) {
	return (
		<Page title={props.post.meta.title}>
			<Link href="/">
				<a>
					<p>Back to home</p>
				</a>
			</Link>
			<MDXRemote {...props.mdxRemoteProps} />
		</Page>
	);
}

export const getStaticPaths: GetStaticPaths = async () => {
	const slugs = contentManager.getSlugs();
	return {
		paths: slugs.map((slug) => ({ params: { slug } })),
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async (context) => {
	const slug = context.params?.slug;
	if (slug === undefined) return { notFound: true };
	if (Array.isArray(slug)) return { notFound: true };

	const post = contentManager.getPostBySlug(slug);
	const mdxRemoteProps = await serialize(post.content);

	return { props: { post, mdxRemoteProps } };
};
