import { getShortUrl } from "@services/url";
import { NextResponse } from "next/server";

export const GET = async(request: Request) => {
	const response = await getShortUrl(request)
	
	if(response.error){
		return NextResponse.json(response, { status: response.statusCode });
	}
	return NextResponse.redirect(new URL(response.original_url))
	
};
