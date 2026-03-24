const orderCancelled = (name, order) => {
  const orderId = order.razorpayOrderId || order._id;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
    </head>
    <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f7f6;">
      <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); border-top: 6px solid #ef4444;">
        <div style="padding: 30px; text-align: center; background-color: #fef2f2;">
          <h2 style="color: #991b1b; margin: 0;">Super Health</h2>
          <h1 style="color: #333333; margin: 10px 0;">Order Cancelled</h1>
        </div>
        <div style="padding: 30px;">
          <h3>Hi ${name},</h3>
          <p>This is to confirm that your order <strong>#${orderId}</strong> has been cancelled.</p>
          <p>If you have already paid, a refund will be processed to your original payment method within 5-7 business days.</p>
          <p>If you didn't request this cancellation, please contact our support team immediately.</p>
        </div>
        <div style="background-color: #450a0a; color: #ffffff; padding: 20px; text-align: center; font-size: 12px;">
          <p>&copy; 2026 Super Health. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export default orderCancelled;