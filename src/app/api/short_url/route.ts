import { createShortUrl } from "@services/url";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
	const response = await createShortUrl(request);
	return NextResponse.json(response, { status: response.statusCode });
};
