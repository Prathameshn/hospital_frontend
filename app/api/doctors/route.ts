import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    return NextResponse.json(
      {
        success: true,
        data: body,
      },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json({ message: String(error) }, { status: 400 });
  }
}
