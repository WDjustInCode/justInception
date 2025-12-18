import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    // Files are present as Blob(s), but this sample does not persist them.
    const files = formData.getAll("files");

    // Log submission for debugging
    console.log("[contact] submission", {
      name,
      email,
      message,
      filesCount: files?.length ?? 0,
    });

    // Send email notification via Resend
    try {
      console.log("[contact] Attempting to send email to justin@justinception.studio");
      console.log("[contact] API key present:", !!process.env.RESEND_API_KEY);
      
      // Check if API key is configured
      if (!process.env.RESEND_API_KEY) {
        console.warn("RESEND_API_KEY is not set. Email will not be sent.");
        return NextResponse.json({ ok: true }, { status: 200 });
      }

      const resend = new Resend(process.env.RESEND_API_KEY);
      
      const result = await resend.emails.send({
        from: "Justinception Contact Form <contact@transmit.justinception.studio>",
        to: "justin@justinception.studio",
        replyTo: email,
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message || "(No message provided)"}</p>
          <p><strong>Attached Files:</strong> ${files?.length ?? 0}</p>
          ${files?.length ? "<p><em>Note: File attachments are not yet supported. Consider storing them in S3/R2.</em></p>" : ""}
        `,
      });
      
      console.log("[contact] Email sent successfully:", result);
    } catch (emailError) {
      console.error("[contact] Failed to send email:", emailError);
      console.error("[contact] Error details:", JSON.stringify(emailError, null, 2));
      // Continue to return success to user even if email fails
      // You may want to change this behavior based on your requirements
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Unexpected error. Please try again." },
      { status: 500 }
    );
  }
}
