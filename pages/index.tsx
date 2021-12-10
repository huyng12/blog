import { contentManager, Post } from "content-manager";
import { GetStaticProps } from "next";
import { Page } from "page/page";

interface Props {
	posts: Post[];
}

export default function Home(props: Props) {
	return (
		<Page>
			<h1>Home</h1>
			{props.posts.map((post) => (
				<article key={`post-${post.slug}`}>
					<h2>{post.meta.title}</h2>
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
