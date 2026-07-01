import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import {
  newsletterConfirmationEmail,
  newsletterAdminNotificationEmail,
} from '@/lib/email-templates';

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
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

    // Send confirmation to subscriber
    const { error: subscriberError } = await resend.emails.send({
      from,
      to: email,
      subject: 'You\'re on the list! Welcome to the Techletter 🚀',
      html: newsletterConfirmationEmail(email),
    });

    if (subscriberError) {
      console.error('Failed to send confirmation to subscriber:', subscriberError);
    }

    // Send notification to admin
    const { error: adminError } = await resend.emails.send({
      from,
      to: 'kenlubs45@gmail.com',
      subject: 'New Newsletter Subscription!',
      html: newsletterAdminNotificationEmail(email),
    });

    if (adminError) {
      console.error('Failed to send admin notification:', adminError);
    }

    return NextResponse.json(
      { message: 'Successfully subscribed to newsletter!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Unexpected error in newsletter API:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    );
  }
}
