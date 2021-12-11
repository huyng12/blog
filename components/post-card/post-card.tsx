import { Tag } from "components/tag/tag";
import { Post } from "lib/content-manager";
import { useRouter } from "next/router";
import s from "./post-card.module.css";

interface Props {
	post: Post;
}

export function PostCard(props: Props) {
	const router = useRouter();
	const { meta, slug } = props.post;
	const onClick = () => void router.push(`/posts/${slug}`);
	return (
		<article className={s.article} onClick={onClick}>
			<div className={s.meta}>
				<Tag>{meta.tags[0]}</Tag>
				<span>{meta.postedAt}</span>
			</div>
			<h1 className="text-2xl font-bold">{meta.title}</h1>
			<p>{meta.summary}</p>
		</article>
	);
}
