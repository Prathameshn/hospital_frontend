import { NextResponse } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (
    username !== ADMIN_USERNAME ||
    password !== ADMIN_PASSWORD ||
    username === "" ||
    password === "" ||
    ADMIN_USERNAME === "" ||
    ADMIN_PASSWORD === ""
  ) {
    return NextResponse.json({ success: false }, { status: 401 });
  }

  const response = NextResponse.json({
    success: true,
  });

  response.cookies.set("admin-auth", "true", {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return response;
}
