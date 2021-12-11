import cn from "classnames";
import s from "./tag.module.css";

interface Props {
	children: string;
}

const colors: string[][] = [
	["bg-rose-200", "text-rose-800"],
	["bg-emerald-200", "text-emerald-800"],
	["bg-sky-200", "text-sky-800"],
	["bg-violet-200", "text-violet-800"],
];

const tagColor: Record<string, typeof colors[number]> = {
	"UI/UX": colors[0],
	Thought: colors[2],
	NFT: colors[3],
	Crypto: colors[3],
};

const getColor = (tag: string): string[] => {
	return Object.prototype.hasOwnProperty.call(tagColor, tag)
		? tagColor[tag]
		: ["bg-slate-200", "text-slate-800"];
};

export function Tag(props: Props) {
	const colorClasses = getColor(props.children);
	return <span className={cn(s.tag, colorClasses)}>{props.children}</span>;
}
