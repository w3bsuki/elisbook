import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { supabase, Order, OrderItem } from '@/lib/supabase';

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
      customer, 
      shipping, 
      items,
      paymentMethod,
      notes,
      subtotal,
      shippingCost,
      tax,
      totalAmount
    } = body;

    // Validate required fields
    if (!customer || !shipping || !items || !items.length) {
      return NextResponse.json(
        { error: 'Missing required order information' },
        { status: 400 }
      );
    }

    // Simple validation for customer info
    if (!customer.firstName || !customer.lastName || !customer.email) {
      return NextResponse.json(
        { error: 'Missing required customer information' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(customer.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Generate a random order ID (in a real system, this would be from a database)
    const orderId = Math.floor(100000 + Math.random() * 900000).toString();
    const orderDate = new Date().toISOString();

    // Create the order object for Supabase
    const orderData: Order = {
      order_number: orderId,
      order_date: orderDate,
      customer_first_name: customer.firstName,
      customer_last_name: customer.lastName,
      customer_email: customer.email,
      customer_phone: customer.phone,
      shipping_address: shipping.address,
      shipping_city: shipping.city,
      shipping_postal_code: shipping.postalCode,
      shipping_country: shipping.country,
      payment_method: paymentMethod,
      notes: notes,
      subtotal: subtotal,
      shipping_cost: shippingCost,
      tax: tax,
      total_amount: totalAmount,
      status: 'pending'
    };

    // Save order to database
    const { data: orderResult, error: orderError } = await supabase
      .from('orders')
      .insert(orderData)
      .select();

    if (orderError) {
      console.error('Error saving order to Supabase:', orderError);
      return NextResponse.json(
        { error: 'Failed to store order in database', details: orderError.message },
        { status: 500 }
      );
    }

    const dbOrderId = orderResult && orderResult.length > 0 ? orderResult[0].id : null;

    // Save order items
    if (dbOrderId) {
      const orderItems: OrderItem[] = items.map(item => ({
        order_id: dbOrderId,
        item_id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        type: item.type
      }));

      const { error: itemsError } = await supabase
        .from('order_items')
        .insert(orderItems);

      if (itemsError) {
        console.error('Error saving order items to Supabase:', itemsError);
        // Continue even if item saving fails, at least we have the main order
      }
    }

    // For development/demo purposes, log the order
    console.log('New order received:', { 
      orderId, 
      orderDate, 
      customer, 
      shipping, 
      items, 
      paymentMethod, 
      notes, 
      subtotal, 
      shippingCost, 
      tax, 
      totalAmount,
      dbOrderId
    });

    // Send email notifications
    try {
      if (process.env.NODE_ENV !== 'development') {
        // In production, send actual emails
        
        // Send confirmation email to customer
        const customerMailOptions = {
          from: `"ELISBooks Shop" <${process.env.EMAIL_USER || 'orders@elisbooks.com'}>`,
          to: customer.email,
          subject: `Order Confirmation #${orderId}`,
          html: generateOrderConfirmationEmail({
            id: orderId,
            date: orderDate,
            customer,
            shipping,
            items,
            paymentMethod,
            notes,
            subtotal,
            shippingCost,
            tax,
            totalAmount
          }),
        };

        // Send notification email to store admin
        const adminMailOptions = {
          from: `"ELISBooks Shop" <${process.env.EMAIL_USER || 'orders@elisbooks.com'}>`,
          to: process.env.ADMIN_EMAIL || 'admin@elisbooks.com',
          subject: `New Order #${orderId}`,
          html: generateAdminOrderNotificationEmail({
            id: orderId,
            date: orderDate,
            customer,
            shipping,
            items,
            paymentMethod,
            notes,
            subtotal,
            shippingCost,
            tax,
            totalAmount
          }),
        };

        // Send emails
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
        message: 'Order processed and stored successfully',
        orderId: orderId,
        orderDate: orderDate
      });
    } catch (emailError) {
      console.error('Failed to send order emails:', emailError);
      // We still return success since the order was saved to database
      return NextResponse.json({
        success: true,
        message: 'Order stored successfully but email notification failed',
        orderId: orderId,
        orderDate: orderDate
      });
    }
  } catch (error) {
    console.error('Error processing order:', error);
    return NextResponse.json(
      { error: 'Failed to process order', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Generate HTML for customer order confirmation email
function generateOrderConfirmationEmail(order: any) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>Thank you for your order!</h2>
      <p>Dear ${order.customer.firstName} ${order.customer.lastName},</p>
      <p>We're pleased to confirm your order #${order.id}.</p>
      
      <div style="background-color: #f8f8f8; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Order Summary</h3>
        <p><strong>Order ID:</strong> ${order.id}</p>
        <p><strong>Date:</strong> ${new Date(order.date).toLocaleString()}</p>
        <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
        
        <h4>Items:</h4>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 1px solid #ddd;">
              <th style="text-align: left; padding: 8px;">Item</th>
              <th style="text-align: right; padding: 8px;">Qty</th>
              <th style="text-align: right; padding: 8px;">Price</th>
              <th style="text-align: right; padding: 8px;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${order.items.map((item: any) => `
              <tr style="border-bottom: 1px solid #eee;">
                <td style="text-align: left; padding: 8px;">${item.title}</td>
                <td style="text-align: right; padding: 8px;">${item.quantity}</td>
                <td style="text-align: right; padding: 8px;">${item.price.toFixed(2)} BGN</td>
                <td style="text-align: right; padding: 8px;">${(item.price * item.quantity).toFixed(2)} BGN</td>
              </tr>
            `).join('')}
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3" style="text-align: right; padding: 8px;"><strong>Subtotal:</strong></td>
              <td style="text-align: right; padding: 8px;">${order.subtotal.toFixed(2)} BGN</td>
            </tr>
            <tr>
              <td colspan="3" style="text-align: right; padding: 8px;"><strong>Shipping:</strong></td>
              <td style="text-align: right; padding: 8px;">${order.shippingCost === 0 ? 'Free' : `${order.shippingCost.toFixed(2)} BGN`}</td>
            </tr>
            <tr>
              <td colspan="3" style="text-align: right; padding: 8px;"><strong>Tax:</strong></td>
              <td style="text-align: right; padding: 8px;">${order.tax.toFixed(2)} BGN</td>
            </tr>
            <tr>
              <td colspan="3" style="text-align: right; padding: 8px; font-weight: bold;"><strong>Total:</strong></td>
              <td style="text-align: right; padding: 8px; font-weight: bold;">${order.totalAmount.toFixed(2)} BGN</td>
            </tr>
          </tfoot>
        </table>
      </div>
      
      <div style="margin: 20px 0;">
        <h3>Shipping Information</h3>
        <p>${order.customer.firstName} ${order.customer.lastName}</p>
        <p>${order.shipping.address}</p>
        <p>${order.shipping.city}, ${order.shipping.postalCode}</p>
        <p>${order.shipping.country}</p>
      </div>
      
      ${order.notes ? `
        <div style="margin: 20px 0;">
          <h3>Order Notes</h3>
          <p>${order.notes}</p>
        </div>
      ` : ''}
      
      <p>If you have any questions about your order, please contact our customer service.</p>
      <p>Thank you for shopping with ELISBooks!</p>
    </div>
  `;
}

// Generate HTML for admin order notification email
function generateAdminOrderNotificationEmail(order: any) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2>New Order Received</h2>
      <p>A new order has been placed on the website.</p>
      
      <div style="background-color: #f8f8f8; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Order Details</h3>
        <p><strong>Order ID:</strong> ${order.id}</p>
        <p><strong>Date:</strong> ${new Date(order.date).toLocaleString()}</p>
        <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
        <p><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)} BGN</p>
        
        <h4>Customer Information:</h4>
        <p>Name: ${order.customer.firstName} ${order.customer.lastName}</p>
        <p>Email: ${order.customer.email}</p>
        <p>Phone: ${order.customer.phone}</p>
        
        <h4>Shipping Address:</h4>
        <p>${order.shipping.address}</p>
        <p>${order.shipping.city}, ${order.shipping.postalCode}</p>
        <p>${order.shipping.country}</p>
        
        <h4>Items:</h4>
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr style="border-bottom: 1px solid #ddd;">
              <th style="text-align: left; padding: 8px;">Item</th>
              <th style="text-align: left; padding: 8px;">Type</th>
              <th style="text-align: right; padding: 8px;">Qty</th>
              <th style="text-align: right; padding: 8px;">Price</th>
              <th style="text-align: right; padding: 8px;">Total</th>
            </tr>
          </thead>
          <tbody>
            ${order.items.map((item: any) => `
              <tr style="border-bottom: 1px solid #eee;">
                <td style="text-align: left; padding: 8px;">${item.title}</td>
                <td style="text-align: left; padding: 8px;">${item.type}</td>
                <td style="text-align: right; padding: 8px;">${item.quantity}</td>
                <td style="text-align: right; padding: 8px;">${item.price.toFixed(2)} BGN</td>
                <td style="text-align: right; padding: 8px;">${(item.price * item.quantity).toFixed(2)} BGN</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
      
      ${order.notes ? `
        <div style="margin: 20px 0;">
          <h3>Customer Notes</h3>
          <p>${order.notes}</p>
        </div>
      ` : ''}
      
      <p>Please process this order as soon as possible.</p>
    </div>
  `;
} 