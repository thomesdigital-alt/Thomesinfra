import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Inquiry from "@/lib/models/Inquiry";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await req.json();
    const { status } = body;

    const inquiry = await Inquiry.findByIdAndUpdate(
      params.id,
      { status },
      { new: true }
    );

    if (!inquiry) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Inquiry updated", inquiry });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to update inquiry", details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const inquiry = await Inquiry.findByIdAndDelete(params.id);

    if (!inquiry) {
      return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Inquiry deleted" });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Failed to delete inquiry", details: error.message },
      { status: 500 }
    );
  }
}