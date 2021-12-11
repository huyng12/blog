import { Navbar } from "components/navbar/navbar";
import Head from "next/head";
import { ReactNode } from "react";
import s from "./page.module.css";

interface Props {
	title?: string;
	children: ReactNode;
}

export function Page(props: Props) {
	const { children, ...more } = props;

	const meta = {
		title: "Huy Nguyen - Thoughts, technical posts and many interesting things",
		...more,
	};

	return (
		<div className={s.container}>
			<Head>
				<title>{meta.title}</title>
			</Head>
			<div className="px-8">
				<div className="py-8">
					<Navbar />
				</div>
				<main>{props.children}</main>
			</div>
		</div>
	);
}
