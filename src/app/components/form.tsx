"use client";import styles from "@app/page.module.css";
import React, { FormEvent } from "react";
import { OptionalFormFields } from "@app/interfaces/Form";
import { Error } from "@app/interfaces/Error";

interface FormProps {
	setShortUrl: (url: string) => void;
	setShowCard: (card: boolean) => void;
	error?: Error | null;
	setError?: (error: Error | null) => void;
}
const Form = ({ setShortUrl, setShowCard, error, setError }: FormProps) => {
	const [longUrl, setLongUrl] = React.useState("");
	const [customCode, setCustomCode] = React.useState("");
	const [expDate, setExpDate] = React.useState<string | number>("");

	const optionalFields = () => {
		const fields: OptionalFormFields = {};
		if (customCode) fields.custom_code = customCode;
		if (expDate) {
			switch (expDate) {
				case "1hr":
					fields.expiration_date = Date.now() + 3600000;
					break;
				case "2hr":
					fields.expiration_date = Date.now() + 7200000;
					break;
				case "5hr":
					fields.expiration_date = Date.now() + 210000000;
					break;
				case "12hr":
					fields.expiration_date = Date.now() + 432000000;
					break;
				case "24hr":
					fields.expiration_date = Date.now() + 864000000;
					break;
			}
		}

		return fields;
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setShowCard(true);
		await fetch(`/api/short_url`, {
			method: "POST",
			body: JSON.stringify({
				original_url: longUrl,
				...optionalFields(),
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.error) setError?.(res);
				setShortUrl(res.shortUrl);
			})
			.catch((error) => console.log(error));
	};
	return (
		<form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
			<div className={styles.url_field}>
				<input
					type="text"
					name="url"
					placeholder="&#128279;  Paste your link here"
					value={longUrl}
					onChange={(e) => setLongUrl(e.currentTarget.value)}
				/>
				<button type="submit" disabled={!longUrl}>
					Go!
				</button>
			</div>
			{error?.error === "INVALID_URL" && (
				<p className={styles.error}>Invalid URL!</p>
			)}
			<div className={styles.custom_content}>
				<div className={styles.custom_item}>
					<label htmlFor="custom_code">
						Enter a custom back half <span>(optional)</span>
					</label>
					<input
						type="text"
						placeholder="example: great-link"
						name="custom_code"
						value={customCode}
						onChange={(e) => {
							setCustomCode(e.currentTarget.value);
							error?.error === "NO_DUPLICATE_CODE" && setError?.(null);
						}}
					/>
					{error?.error === "NO_DUPLICATE_CODE" && (
						<p className={styles.error}>This code has been used already!</p>
					)}
				</div>
				<div className={styles.custom_item}>
					<label htmlFor="expiry_time">
						Select an expiry time <span>(optional)</span>
					</label>
					<select
						name="exp_time"
						value={expDate}
						onChange={(e) => setExpDate(e.currentTarget.value)}
					>
						<option value="">None</option>
						<option value="1hr">1 hr</option>
						<option value="2hr">2 hrs</option>
						<option value="5hr">5 hrs</option>
						<option value="12hr">12 hrs</option>
						<option value="24hr">24 hrs</option>
					</select>
				</div>
			</div>
		</form>
	);
};

export default Form;
