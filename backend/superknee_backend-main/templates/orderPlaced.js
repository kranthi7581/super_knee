const orderPlaced = (name, order) => {
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
      <title>Order Placed Successfully</title>
    </head>
    <body style="font-family: 'Segoe UI', Roboto, Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f7f6;">
      <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 15px rgba(0,0,0,0.1); border-top: 6px solid #16a34a;">
        
        <!-- Header -->
        <div style="padding: 30px; text-align: center; background-color: #f9fdfc;">
          <h2 style="color: #16a34a; margin: 0; text-transform: uppercase; letter-spacing: 2px; font-size: 24px;">Super Health</h2>
          <div style="height: 1px; width: 60px; background-color: #16a34a; margin: 15px auto;"></div>
          <h1 style="color: #333333; margin: 10px 0; font-size: 28px;">Order Placed!</h1>
          <p style="color: #666666; font-size: 14px; margin: 0;">Your health journey is about to get a boost.</p>
        </div>

        <!-- Body -->
        <div style="padding: 30px;">
          <h3 style="color: #333333; margin-top: 0;">Hi ${name},</h3>
          <p style="color: #555555; line-height: 1.6; font-size: 15px;">
            Thank you for shopping with <strong>Super Health</strong>. We've received your order and our specialists are already preparing your sachets.
          </p>

          <!-- Order Summary Card -->
          <div style="background-color: #fdfdfd; border: 1px solid #eeeeee; border-radius: 6px; padding: 20px; margin: 25px 0;">
            <div style="border-bottom: 2px solid #16a34a; padding-bottom: 10px; margin-bottom: 15px; display: flex; justify-content: space-between; align-items: center;">
              <span style="font-weight: bold; color: #333333;">ORDER DETAILS</span>
              <span style="font-size: 12px; color: #16a34a; font-weight: bold;">#${orderId}</span>
            </div>
            
            <table style="width: 100%; border-collapse: collapse;">
              ${itemsHtml}
              <tr>
                <td style="padding: 15px 0; font-weight: bold; color: #333333;">Total Amount</td>
                <td style="padding: 15px 0; text-align: right; font-weight: bold; color: #16a34a; font-size: 18px;">₹${order.totalAmount}</td>
              </tr>
            </table>
          </div>

          <!-- Shipping Address -->
          <div style="margin-bottom: 30px;">
            <h4 style="color: #333333; border-bottom: 1px solid #eeeeee; padding-bottom: 8px; margin-bottom: 10px;">Shipping To:</h4>
            <p style="color: #666666; font-size: 14px; margin: 0; line-height: 1.5;">
              <strong>${order.shippingAddress.name}</strong><br>
              ${order.shippingAddress.address}<br>
              ${order.shippingAddress.city} - ${order.shippingAddress.pincode}<br>
              Phone: ${order.shippingAddress.phone}
            </p>
          </div>

          <!-- CTA -->
          <div style="text-align: center; margin-top: 40px;">
            <a href="https://super-health.vercel.app/orders" style="background-color: #16a34a; color: #ffffff; padding: 14px 30px; text-decoration: none; border-radius: 30px; font-weight: bold; display: inline-block; box-shadow: 0 4px 10px rgba(22, 163, 74, 0.3);">TRACK YOUR ORDER</a>
          </div>

        </div>

        <!-- Footer -->
        <div style="background-color: #333333; color: #ffffff; padding: 30px; text-align: center;">
          <p style="margin: 0; font-size: 14px; font-weight: bold;">Super Health Sachets</p>
          <p style="margin: 10px 0; font-size: 12px; color: #aaaaaa;">
            Joint Support | Daily Mobility | Pure Ingredients
          </p>
          <div style="margin-top: 20px; font-size: 12px;">
            <a href="#" style="color: #16a34a; text-decoration: none; margin: 0 10px;">Privacy Policy</a> |
            <a href="#" style="color: #16a34a; text-decoration: none; margin: 0 10px;">Terms of Service</a>
          </div>
          <p style="margin-top: 20px; font-size: 11px; color: #777777;">&copy; 2026 Super Health. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export default orderPlaced;