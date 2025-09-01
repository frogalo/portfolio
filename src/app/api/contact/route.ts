import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function sanitizeInput(input: string): string {
    return input.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
}

export async function POST(request: NextRequest) {
    try {
        const body: ContactFormData = await request.json();
        const { name, email, subject, message } = body;

        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        if (!isValidEmail(email)) {
            return NextResponse.json(
                { error: "Invalid email format" },
                { status: 400 }
            );
        }

        const sanitizedData = {
            name: sanitizeInput(name.trim()),
            email: email.trim().toLowerCase(),
            subject: sanitizeInput(subject.trim()),
            message: sanitizeInput(message.trim()),
        };

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: parseInt(process.env.SMTP_PORT || "587"),
            secure: process.env.SMTP_SECURE === "true",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        const notificationMailOptions = {
            from: process.env.SMTP_FROM_EMAIL,
            to: process.env.CONTACT_EMAIL,
            subject: `New Contact Form Submission: ${sanitizedData.subject}`,
            html: `
        <body style="font-family: 'Arial', sans-serif; color: #333; line-height: 1.6; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: 20px auto; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.05); background-color: #f9f9f9;">
            <h2 style="color: #0056b3; border-bottom: 2px solid #0056b3; padding-bottom: 10px; margin-bottom: 20px;">New Contact Form Submission</h2>
            <div style="margin-bottom: 15px;">
              <strong style="color: #555;">Name:</strong>
              <span style="margin-left: 5px;">${sanitizedData.name}</span>
            </div>
            <div style="margin-bottom: 15px;">
              <strong style="color: #555;">Email:</strong>
              <span style="margin-left: 5px;">${sanitizedData.email}</span>
            </div>
            <div style="margin-bottom: 15px;">
              <strong style="color: #555;">Subject:</strong>
              <span style="margin-left: 5px;">${sanitizedData.subject}</span>
            </div>
            <div>
              <strong style="color: #555;">Message:</strong>
              <div style="padding: 10px; margin-top: 5px; border: 1px solid #ddd; border-radius: 4px; background-color: #fff;">
                ${sanitizedData.message.replace(/\n/g, "<br>")}
              </div>
            </div>
          </div>
          <footer style="text-align: center; margin-top: 20px; color: #777; font-size: 0.8em;">
            This message was sent from your portfolio contact form.
          </footer>
        </body>
      `,
        };

        const autoReplyMailOptions = {
            from: process.env.SMTP_FROM_EMAIL,
            to: sanitizedData.email,
            subject: "Thank you for your message!",
            html: `
        <body style="font-family: 'Arial', sans-serif; color: #333; line-height: 1.6; margin: 0; padding: 0;">
          <div style="max-width: 600px; margin: 20px auto; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.05); background-color: #f9f9f9;">
            <h2 style="color: #0056b3; border-bottom: 2px solid #0056b3; padding-bottom: 10px; margin-bottom: 20px;">Thank you for reaching out!</h2>
            <p>Hi ${sanitizedData.name},</p>
            <p>Thank you for your message. I have received your inquiry and will get back to you as soon as possible.</p>
            <div style="padding: 10px; margin-top: 20px; border: 1px solid #ddd; border-radius: 4px; background-color: #fff;">
              <strong style="color: #555;">Your Message:</strong><br>
              <strong style="color: #555;">Subject:</strong> ${sanitizedData.subject}<br><br>
              ${sanitizedData.message.replace(/\n/g, "<br>")}
            </div>
            <p style="margin-top: 20px;">Best regards,<br>Jakub Urbański</p>
          </div>
          <footer style="text-align: center; margin-top: 20px; color: #777; font-size: 0.8em;">
            This is an automated response. Please do not reply directly to this email.
          </footer>
        </body>
      `,
        };

        await Promise.all([
            transporter.sendMail(notificationMailOptions),
            transporter.sendMail(autoReplyMailOptions),
        ]);

        return NextResponse.json(
            { message: "Message sent successfully!" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { error: "Failed to send message. Please try again later." },
            { status: 500 }
        );
    }
}