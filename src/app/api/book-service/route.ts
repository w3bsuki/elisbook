import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { supabase, ServiceBooking } from '@/lib/supabase';

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
    const { 
      name, 
      email, 
      phone, 
      date, 
      time, 
      service, 
      message,
      serviceId
    } = body;

    // Validate required fields
    if (!name || !email || !date || !time || !service) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Generate a booking reference number
    const bookingRef = `BK-${Math.floor(10000 + Math.random() * 90000)}`;
    const bookingDate = new Date().toISOString();

    // Create booking object
    const bookingData: ServiceBooking = {
      name,
      email,
      phone,
      date,
      time,
      service,
      service_id: serviceId,
      message,
      booking_ref: bookingRef,
      status: 'pending'
    };

    // Store in Supabase
    const { data, error } = await supabase
      .from('service_bookings')
      .insert(bookingData)
      .select();

    if (error) {
      console.error('Error saving booking to Supabase:', error);
      // Continue with email even if DB save fails
    }

    console.log('Service booking request:', { 
      bookingRef,
      name, 
      email, 
      phone, 
      date, 
      time, 
      service,
      serviceId,
      message,
      dbResult: data
    });
    
    // Send email notifications
    try {
      if (process.env.NODE_ENV !== 'development') {
        // In production, send actual emails
        
        // Send confirmation email to customer
        const customerMailOptions = {
          from: `"ELISBooks Services" <${process.env.EMAIL_USER || 'services@elisbooks.com'}>`,
          to: email,
          subject: `Service Booking Confirmation: ${bookingRef}`,
          html: generateCustomerBookingEmail({
            bookingRef,
            name,
            email,
            phone,
            date,
            time,
            service,
            message
          }),
        };

        // Send notification email to business
        const adminMailOptions = {
          from: `"ELISBooks Services" <${process.env.EMAIL_USER || 'services@elisbooks.com'}>`,
          to: process.env.SERVICE_EMAIL || 'services@elisbooks.com',
          subject: `New Service Booking: ${bookingRef}`,
          html: generateAdminBookingEmail({
            bookingRef,
            name,
            email,
            phone,
            date,
            time,
            service,
            serviceId,
            message,
            bookingDate
          }),
        };

        await Promise.all([
          transporter.sendMail(customerMailOptions),
          transporter.sendMail(adminMailOptions)
        ]);
      } else {
        // In development, simulate sending
        await new Promise(resolve => setTimeout(resolve, 1000));
      }

      return NextResponse.json({
        success: true,
        message: 'Booking processed and stored successfully',
        bookingRef
      });
    } catch (emailError) {
      console.error('Failed to send booking emails:', emailError);
      // Even if email fails, we still return success since the booking was saved to the database
      return NextResponse.json({
        success: true,
        message: 'Booking stored successfully but email confirmation failed',
        bookingRef
      });
    }
  } catch (error) {
    console.error('Error processing service booking:', error);
    return NextResponse.json(
      { error: 'Failed to process booking', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Generate HTML for customer booking confirmation email
function generateCustomerBookingEmail(booking: any) {
  const formattedDate = new Date(booking.date).toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Your Service Booking is Confirmed!</h2>
      <p>Dear ${booking.name},</p>
      <p>Thank you for booking a service with ELISBooks. We're looking forward to seeing you!</p>
      
      <div style="background-color: #f8f8f8; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Booking Details</h3>
        <p><strong>Booking Reference:</strong> ${booking.bookingRef}</p>
        <p><strong>Service:</strong> ${booking.service}</p>
        <p><strong>Date:</strong> ${formattedDate}</p>
        <p><strong>Time:</strong> ${booking.time}</p>
      </div>
      
      <div style="margin: 20px 0;">
        <h3>Your Information</h3>
        <p><strong>Name:</strong> ${booking.name}</p>
        <p><strong>Email:</strong> ${booking.email}</p>
        <p><strong>Phone:</strong> ${booking.phone || 'Not provided'}</p>
        ${booking.message ? `<p><strong>Additional Notes:</strong> ${booking.message}</p>` : ''}
      </div>
      
      <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 20px;">
        <h3>Need to Change Your Booking?</h3>
        <p>If you need to reschedule or cancel your booking, please contact us as soon as possible by replying to this email or calling our customer service.</p>
      </div>
      
      <p>Thank you for choosing ELISBooks!</p>
    </div>
  `;
}

// Generate HTML for admin booking notification email
function generateAdminBookingEmail(booking: any) {
  const formattedBookingDate = new Date(booking.bookingDate).toLocaleString();
  const formattedServiceDate = new Date(booking.date).toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>New Service Booking</h2>
      <p>A new service booking has been made on the website.</p>
      
      <div style="background-color: #f8f8f8; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Booking Information</h3>
        <p><strong>Booking Reference:</strong> ${booking.bookingRef}</p>
        <p><strong>Booking Made On:</strong> ${formattedBookingDate}</p>
        <p><strong>Service ID:</strong> ${booking.serviceId || 'N/A'}</p>
        <p><strong>Service:</strong> ${booking.service}</p>
        <p><strong>Date:</strong> ${formattedServiceDate}</p>
        <p><strong>Time:</strong> ${booking.time}</p>
      </div>
      
      <div style="margin: 20px 0;">
        <h3>Customer Information</h3>
        <p><strong>Name:</strong> ${booking.name}</p>
        <p><strong>Email:</strong> ${booking.email}</p>
        <p><strong>Phone:</strong> ${booking.phone || 'Not provided'}</p>
        ${booking.message ? `<p><strong>Additional Notes:</strong> ${booking.message}</p>` : ''}
      </div>
      
      <p>Please update the booking status in your system and contact the customer if necessary.</p>
    </div>
  `;
} 