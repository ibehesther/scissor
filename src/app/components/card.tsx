/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import styles from "@app/page.module.css";
import React from "react";
import { Error } from "@app/interfaces/Error";

interface CardProps {
	shortUrl: string;
	show: boolean;
	error?: Error | null;
}
const Card = ({ shortUrl, show, error }: CardProps) => {
	const [contentCopy, setContentCopy] = React.useState(false);
	const refreshCopy = () => {
		if (contentCopy) setContentCopy(false);
	};
	const copyToClipboard = async () => {
		try {
			await navigator.clipboard.writeText(shortUrl);
			setContentCopy(true);
		} catch (error) {
			alert("Failed to copy");
		}
	};

	React.useEffect(() => {
		setTimeout(refreshCopy, 5000);
	}, [contentCopy]);
	return (
		<div>
			{!error && show && !shortUrl && (
				<p className={styles.loading}>SNIP. SNIP.. SNIP...</p>
			)}
			{!error && show && shortUrl && (
				<div className={styles.card}>
					<p>{shortUrl}</p>
					{contentCopy ? (
						<span>Copied!</span>
					) : (
						<button onClick={copyToClipboard}>COPY</button>
					)}
				</div>
			)}
		</div>
	);
};

export default Card;
