import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import {
  contactThankYouEmail,
  adminNotificationEmail,
} from '@/lib/email-templates';

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'Email service not configured' },
        { status: 500 }
      );
    }

    const from = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

    // Send thank you to the submitter
    const { error: thankYouError } = await resend.emails.send({
      from,
      to: email,
      subject: 'Thanks for reaching out, ' + name + '! 🙌',
      html: contactThankYouEmail(name, email),
    });

    if (thankYouError) {
      console.error('Failed to send thank you email:', thankYouError);
    }

    // Send notification to admin
    const { data, error } = await resend.emails.send({
      from,
      to: 'kenlubs45@gmail.com',
      subject: `New Contact Form Message from ${name}`,
      html: adminNotificationEmail(name, email, message),
    });

    if (error) {
      console.error('Resend error details:', error);
      return NextResponse.json(
        { error: `Email service error: ${error.message || 'Unknown error'}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Unexpected error in contact API:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
