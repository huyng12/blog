import cn from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import s from "./navbar.module.css";

interface NavItemProps {
	href: string;
	label: string;
}

function NavItem(props: NavItemProps) {
	const router = useRouter();
	const isActive = router.asPath === props.href;
	const isExternal =
		props.href.startsWith("http") || props.href.startsWith("https");
	return (
		<Link href={props.href}>
			<a
				target={isExternal ? "_blank" : "_self"}
				className={cn(s.navItem, isActive && s.navItemActive)}
			>
				<span>{props.label}</span>
			</a>
		</Link>
	);
}

export function Navbar() {
	return (
		<nav className={s.nav}>
			<NavItem href="/" label="Home" />
			<NavItem href="https://github.com/huyng12" label="Github" />
			<NavItem href="mailto:touch@nguyenrk.com" label="Email" />
		</nav>
	);
}
