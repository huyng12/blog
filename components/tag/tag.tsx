import s from "./tag.module.css";

interface Props {
	children: string;
}

export function Tag(props: Props) {
	return <span className={s.tag}>{props.children}</span>;
}
