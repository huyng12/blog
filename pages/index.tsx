import { Page } from "components/page/page";
import { contentManager, Post } from "lib/content-manager";
import { GetStaticProps } from "next";
import Link from "next/link";

interface Props {
	posts: Post[];
}

export default function HomePage(props: Props) {
	return (
		<Page>
			<h1>Home</h1>
			{props.posts.map((post) => (
				<article key={`post-${post.slug}`}>
					<Link href={`/posts/${post.slug}`}>
						<a>
							<h2>{post.meta.title}</h2>
						</a>
					</Link>
					<small>{post.meta.postedAt}</small>
					<p>{post.meta.summary}</p>
				</article>
			))}
		</Page>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const posts = contentManager.getPosts();
	return { props: { posts } };
};
