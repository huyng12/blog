import { Page } from "components/page/page";
import { PostCard } from "components/post-card/post-card";
import { contentManager, Post } from "lib/content-manager";
import { GetStaticProps } from "next";

interface Props {
	posts: Post[];
}

export default function HomePage(props: Props) {
	return (
		<Page>
			<div className="max-w-xl mx-auto space-y-4">
				{[...props.posts, ...props.posts].map((post) => (
					<PostCard key={post.slug} post={post} />
				))}
			</div>
		</Page>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const posts = contentManager.getPosts();
	return { props: { posts } };
};
