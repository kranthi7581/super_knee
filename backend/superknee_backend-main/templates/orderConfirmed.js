const orderConfirmed = (name, order) => {
  const date = new Date().toLocaleDateString('en-GB');
  const orderId = order.razorpayOrderId || order._id;
  
  const itemsHtml = order.items.map(item => `
    <tr>
      <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee;">
        <span style="font-weight: 600; color: #333333; display: block;">${item.name}</span>
        <span style="font-size: 12px; color: #888888;">Qty: ${item.quantity}</span>
      </td>
      <td style="padding: 12px 0; border-bottom: 1px solid #eeeeee; text-align: right; color: #333333; font-weight: 600;">
        ₹${item.price * item.quantity}
      </td>
    </tr>
  `).join('');

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Order Confirmed</title>
    </head>
    <body style="font-family: 'Segoe UI', Roboto, Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f7f6;">
      <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border-top: 6px solid #065f46;">
        
        <!-- Header -->
        <div style="padding: 30px; text-align: center; background-color: #e6f4ea;">
          <h2 style="color: #065f46; margin: 0; text-transform: uppercase; letter-spacing: 2px; font-size: 24px;">Super Health</h2>
          <div style="height: 1px; width: 60px; background-color: #065f46; margin: 15px auto;"></div>
          <h1 style="color: #333333; margin: 10px 0; font-size: 28px;">Payment Verified!</h1>
          <p style="color: #666666; font-size: 14px; margin: 0;">Order #${orderId} has been successfully paid.</p>
        </div>

        <!-- Body -->
        <div style="padding: 30px;">
          <h3 style="color: #333333; margin-top: 0;">Great news, ${name}!</h3>
          <p style="color: #555555; line-height: 1.6; font-size: 15px;">
            Your payment was successful and your order is now <strong>Confirmed</strong>. Our warehouse team is currently packing your Super Health sachets. You'll receive another update as soon as it ships!
          </p>

          <!-- Order Summary Card -->
          <div style="background-color: #fdfdfd; border: 1px solid #eeeeee; border-radius: 6px; padding: 20px; margin: 25px 0;">
            <div style="border-bottom: 2px solid #065f46; padding-bottom: 10px; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
              <span style="font-weight: bold; color: #333333;">BILLING SUMMARY</span>
              <span style="font-size: 12px; color: #065f46; font-weight: bold;">PAID</span>
            </div>
            
            <table style="width: 100%; border-collapse: collapse;">
              ${itemsHtml}
              <tr>
                <td style="padding: 15px 0; font-weight: bold; color: #333333;">Total Paid</td>
                <td style="padding: 15px 0; text-align: right; font-weight: bold; color: #065f46; font-size: 18px;">₹${order.totalAmount}</td>
              </tr>
            </table>

            <div style="margin-top: 15px; font-size: 12px; color: #666666; border-top: 1px solid #eeeeee; padding-top: 10px;">
              <strong>Payment ID:</strong> ${order.razorpayPaymentId || 'N/A'}<br>
              <strong>Date:</strong> ${date}
            </div>
          </div>

          <!-- CTA -->
          <div style="text-align: center; margin-top: 40px;">
            <a href="https://super-health.vercel.app/orders" style="background-color: #065f46; color: #ffffff; padding: 14px 30px; text-decoration: none; border-radius: 30px; font-weight: bold; display: inline-block; box-shadow: 0 4px 10px rgba(6, 95, 70, 0.3);">VIEW MY ORDERS</a>
          </div>

        </div>

        <!-- Footer -->
        <div style="background-color: #1b3b2c; color: #ffffff; padding: 30px; text-align: center;">
          <p style="margin: 0; font-size: 14px; font-weight: bold;">Super Health Sachets</p>
          <p style="margin: 10px 0; font-size: 12px; color: #7f9988;">
            Joint Support | Daily Mobility | Pure Ingredients
          </p>
          <p style="margin-top: 20px; font-size: 11px; color: #4b6a58;">&copy; 2026 Super Health. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export default orderConfirmed;