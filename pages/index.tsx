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
			<div className="max-w-2xl mx-auto space-y-4 pb-8">
				<div className="prose prose-lg tight space-y-2">
					<h1>Huy Nguyen</h1>
					<h4>Senior Front-end Engineer</h4>
					<p>
						I am a minimalist, trying to do everything as simple as
						possible. I do front-end for the most of the time,
						besides that, I enjoy doing projects about blockchain,
						cryptocurrency and NFT.
					</p>
				</div>
				<div className="space-y-2">
					<h1 className="font-bold text-3xl">Blogs</h1>
					{props.posts.map((post) => (
						<PostCard key={post.slug} post={post} />
					))}
				</div>
			</div>
		</Page>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const posts = contentManager.getPosts();
	return { props: { posts } };
};
