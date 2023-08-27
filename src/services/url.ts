import Url from "@models/url";
import * as validUrl from "valid-url";

import { connectToDB } from "@utils/database";
import { generateUniqueId } from "@utils/generateUniqueCode";
import { FormFields } from "@app/interfaces/Form";

const BASE_URL = process.env.BASE_URL;
export const createShortUrl = async (request: Request) => {
	try {
		await connectToDB();
		const { original_url, custom_code, expiration_date }: FormFields = await request.json();
		let url_code = custom_code;

		if (validUrl.isUri(original_url)) {
			let url_code_exists = await Url.findOne({ url_code });
			if (url_code_exists && custom_code) {
				return {
					error: "NO_DUPLICATE_CODE",
					statusCode: 400,
					message: "Bad Request",
				};
			} else {
				while (!custom_code) {
					url_code = generateUniqueId();
					url_code_exists = await Url.findOne({ url_code });
					if (url_code_exists) {
						continue;
					} else {
						break;
					}
				}
				if (expiration_date) {
					const expiration_time = new Date(Number(expiration_date));
					const url =  new Url({
						url_code,
						original_url,
						expiration_time,
					});
					await url.save()
				} else {
					const url =  new Url({
						url_code,
						original_url,
					});
					await url.save()
				}

				return {
					shortUrl: `${BASE_URL}/${url_code}`,
					statusCode: 201,
				};
			}
		} else {
			return {
				error: "INVALID_URL",
				statusCode: 400,
				message: "Bad Request",
			};
		}
	} catch (error) {
		return {
			error: "INVALID_REQUEST",
			statusCode: 400,
			message: "Bad Request",
		};
	}
};

export const getShortUrl = async (request: Request) => {
	await connectToDB();
	const url_parts = request.url.split("/");
	const url_code = url_parts[3];

	const url = await Url.findOne({ url_code });

	if (url) {
		if (Date.parse(url.expiration_time) < Date.now()) {
			return {
				error: "EXPIRED_SHORT_LINK",
				statusCode: 400,
				message: "Bad Request",
			};
		}
		return {
			original_url: url.original_url,
			statusCode: 200,
		};
	} else {
		return {
			error: "URL_NOT_FOUND",
			statusCode: 404,
			message: "Not Found",
		};
	}
};
