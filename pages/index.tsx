import { AppPage } from "app/page/page";
import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => (
	<AppPage>
		<Head>
			<title>nguyenrk.com</title>
		</Head>
		<div>
			<h1>Home</h1>
		</div>
	</AppPage>
);

export default Home;
