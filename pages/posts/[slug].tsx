import { Page } from "components/page/page";
import { Tag } from "components/tag/tag";
import { contentManager, Post } from "lib/content-manager";
import format from "lib/format";
import { GetStaticPaths, GetStaticProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";

interface Props {
	post: Post;
	mdxRemoteProps: MDXRemoteSerializeResult;
}

export default function PostPage(props: Props) {
	const { mdxRemoteProps, post } = props;
	const { meta } = post;
	return (
		<Page title={meta.title}>
			<div className="max-w-2xl mx-auto space-y-4 pb-8 prose prose-lg">
				<div className="space-x-2">
					{meta.tags.map((tag) => (
						<Tag key={`tag-${tag}`}>{tag}</Tag>
					))}
				</div>
				<h1>{meta.title}</h1>
				<p className="text-gray-600">
					Published on {format.datetime(meta.postedAt)}
				</p>
				<MDXRemote {...mdxRemoteProps} />
			</div>
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

export const config = {
	unstable_runtimeJS: false,
};
