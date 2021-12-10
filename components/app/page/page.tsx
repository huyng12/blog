import { ReactNode } from "react";
import s from "./page.module.css";

interface Props {
	children: ReactNode;
}

export const AppPage = (props: Props): JSX.Element => (
	<div className={s.container}>
		<div className={s.main}>{props.children}</div>
	</div>
);
