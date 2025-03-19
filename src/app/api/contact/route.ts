import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { supabase, ContactFormEntry } from '@/lib/supabase';

// Nodemailer configuration (replace with actual SMTP settings in production)
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER || 'smtp.example.com',
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER || 'user@example.com',
    pass: process.env.EMAIL_PASSWORD || 'password',
  },
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Create a new contact form entry object
    const contactFormEntry: ContactFormEntry = {
      name,
      email,
      subject: subject || 'No subject',
      message,
      status: 'new'
    };

    // Store in Supabase
    const { data, error } = await supabase
      .from('contact_forms')
      .insert(contactFormEntry)
      .select();

    if (error) {
      console.error('Error saving to Supabase:', error);
      // Continue with email even if DB save fails
    }

    // For development/demo purposes, we'll still log the submission
    console.log('Contact form submission:', { name, email, subject, message, dbResult: data });
    
    // Send email notification
    try {
      if (process.env.NODE_ENV !== 'development') {
        // In production, actually send the email
        const mailOptions = {
          from: `"ELISBooks Website" <${process.env.EMAIL_USER || 'contact@elisbooks.com'}>`,
          to: process.env.CONTACT_EMAIL || 'contact@elisbooks.com',
          subject: `Contact Form: ${subject || 'New Message from Website'}`,
          text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
            <h3>Message:</h3>
            <p>${message.replace(/\n/g, '<br>')}</p>
          `,
        };

        await transporter.sendMail(mailOptions);
      } else {
        // In development, simulate sending
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      return NextResponse.json({
        success: true,
        message: 'Message received and stored successfully',
      });
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // We still return success since we stored in the database
      return NextResponse.json({
        success: true,
        message: 'Message stored but email notification failed',
      });
    }
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to process request', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 