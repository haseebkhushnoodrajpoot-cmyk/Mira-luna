// functions/send-email.js
// Cloudflare Worker – Sends order confirmation emails via Resend

export async function onRequest(context) {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { status: 405, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    const body = await request.json();
    const { to, name, orderId, items, total, address, phone, paymentMethod } = body;

    const itemsHtml = items
      .map(
        (item) => `
          <div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid #222;">
            <span>${item.name} × ${item.quantity}</span>
            <span>Rs. ${Math.round(item.price * 280).toLocaleString()}</span>
          </div>
        `
      )
      .join('');

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; background: #000; color: #fff; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #111; padding: 30px; border-radius: 10px; border: 1px solid #D4B483; }
            .header { text-align: center; border-bottom: 1px solid #333; padding-bottom: 20px; }
            .header h1 { color: #D4B483; font-size: 28px; font-family: 'Georgia', serif; }
            .order-details { margin: 20px 0; }
            .total { font-size: 20px; color: #D4B483; text-align: right; padding-top: 15px; border-top: 2px solid #D4B483; margin-top: 15px; }
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #333; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>✨ MIRA &amp; LUNA</h1>
              <p style="color: #999;">Celestial Inspired Jewellery</p>
            </div>

            <h2 style="color: #D4B483;">Thank you for your order! ✨</h2>
            <p>Hello ${name},</p>
            <p>We're excited to confirm your order. Here are the details:</p>

            <div class="order-details">
              <p><strong>Order #:</strong> ${orderId}</p>
              <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
              <p><strong>Payment Method:</strong> ${paymentMethod || 'Cash on Delivery'}</p>
            </div>

            <h3 style="color: #D4B483;">Order Items</h3>
            ${itemsHtml}

            <div class="total">
              <strong>Total: Rs. ${total.toLocaleString()}</strong>
            </div>

            <div style="margin: 20px 0; background: #1a1a1a; padding: 15px; border-radius: 5px;">
              <p><strong>Delivery Address:</strong></p>
              <p>${address}</p>
              <p><strong>Phone:</strong> ${phone}</p>
            </div>

            <p style="color: #999; margin-top: 20px;">We'll send you a WhatsApp confirmation shortly.</p>

            <div class="footer">
              <p>Mira & Luna — Where starlight meets moonlight.</p>
              <p>Contact: miralunajewels@gmail.com | WhatsApp: 0312-4884822</p>
              <p style="color: #444; font-size: 11px;">You received this email because you placed an order on Mira & Luna.</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Mira & Luna <orders@miraluna.com>',
        to: [to, 'miralunajewels@gmail.com'],
        subject: `Order Confirmation #${orderId}`,
        html: html,
      }),
    });

    const data = await resendResponse.json();

    if (!resendResponse.ok) {
      throw new Error(data.message || 'Email sending failed');
    }

    return new Response(
      JSON.stringify({ success: true, data }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Email error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}