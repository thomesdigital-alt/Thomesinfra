import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, phone, project, message } = body;

    if (!name || !phone || !project) {
      return NextResponse.json(
        { success: false, message: "Please fill all required fields." },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Website Enquiry <onboarding@resend.dev>",
      to: ["chithra@thomesinfra.com"],
      subject: `New Enquiry - ${project}`,
      html: `
        <h2>New Website Enquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Project:</strong> ${project}</p>
        <p><strong>Message:</strong> ${message || "No message provided"}</p>
      `,
    });

    if (error) {
      console.error("Email Error:", error);

      return NextResponse.json(
        { success: false, message: "Failed to send email." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Email sent successfully!",
      data,
    });

  } catch (error) {
    console.error("Server Error:", error);

    return NextResponse.json(
      { success: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}