"use client";
import React from "react";
import styles from "@app/page.module.css";
import Form from "@app/components/form";
import Card from "@app/components/card";
import { Error } from "./interfaces/Error";

export default function Home() {
	const [shortUrl, setShortUrl] = React.useState("");
	const [showCard, setShowCard] = React.useState(false);
	const [error, setError] = React.useState<Error | null>();
	return (
		<div className={styles.main}>
			<div className={styles.description}>
				<h1>Welcome to Scissor</h1>
				<p>Your Ultimate URL Shortening Solution</p>
			</div>
			<div className={styles.container}>
				<Form
					setShortUrl={setShortUrl}
					setShowCard={setShowCard}
					error={ error}
					setError={setError}
				/>
				<Card shortUrl={shortUrl} show={showCard} error={ error} />
			</div>
		</div>
	);
}
