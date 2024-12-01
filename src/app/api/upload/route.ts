// @ts-nocheck
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import * as process from "node:process";

export async function POST(request: NextRequest) {
  const body = (await request.json()) as {
    paramsToSign: Record<string, string>;
  };
  const { paramsToSign } = body;

  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET as string,
  );
  console.log(signature);
  return NextResponse.json({ signature });
}
