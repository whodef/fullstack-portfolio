import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

function sanitizeString(str: string): string {
  return str
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .trim();
}

export async function POST(request: NextRequest) {
  try {
    const { email, theme, message } = await request.json();

    if (!email || !theme || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    if (typeof email !== 'string' || typeof theme !== 'string' || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid data format' },
        { status: 400 }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    if (email.length > 254) {
      return NextResponse.json(
        { error: 'Email address is too long' },
        { status: 400 }
      );
    }

    if (theme.length > 200) {
      return NextResponse.json(
        { error: 'Subject is too long (max 200 characters)' },
        { status: 400 }
      );
    }

    if (message.length > 5000) {
      return NextResponse.json(
        { error: 'Message is too long (max 5000 characters)' },
        { status: 400 }
      );
    }

    if (theme.length < 3) {
      return NextResponse.json(
        { error: 'Subject is too short (min 3 characters)' },
        { status: 400 }
      );
    }

    if (message.length < 10) {
      return NextResponse.json(
        { error: 'Message is too short (min 10 characters)' },
        { status: 400 }
      );
    }

    const cleanEmail = sanitizeString(email);
    const cleanTheme = sanitizeString(theme);
    const cleanMessage = sanitizeString(message);
    const spamKeywords = ['viagra', 'casino', 'lottery', 'winner', 'congratulations'];
    const fullText = `${cleanTheme} ${cleanMessage}`.toLowerCase();
    if (spamKeywords.some(keyword => fullText.includes(keyword))) {
      return NextResponse.json(
        { error: 'Message contains prohibited content' },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: process.env.GMAIL_USER,
      replyTo: cleanEmail,
      subject: `New message from site: ${cleanTheme}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #4f46e5; padding-bottom: 10px;">
            New message from your website
          </h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>From:</strong> ${cleanEmail}</p>
            <p><strong>Subject:</strong> ${cleanTheme}</p>
          </div>
          
          <div style="background: #fff; border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px;">
            <h3 style="color: #475569; margin-top: 0;">Message:</h3>
            <p style="line-height: 1.6; color: #334155; white-space: pre-wrap;">${cleanMessage}</p>
          </div>
          
          <div style="margin-top: 20px; padding: 15px; background: #f1f5f9; border-radius: 8px; font-size: 12px; color: #64748b;">
            <p>This email was sent automatically from your website's contact form.</p>
            <p>Send time: ${new Date().toLocaleString('en-US', { 
              timeZone: 'UTC',
              year: 'numeric',
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })} UTC</p>
            <p>Reply directly to this email to respond to ${cleanEmail}</p>
          </div>
        </div>
      `,
      text: `
New message from website

From: ${cleanEmail}
Subject: ${cleanTheme}

Message:
${cleanMessage}

Send time: ${new Date().toLocaleString('en-US', { timeZone: 'UTC' })} UTC
Reply directly to this email to respond to the sender.
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'There was an error sending the message. Please try again later.' },
      { status: 500 }
    );
  }
}
