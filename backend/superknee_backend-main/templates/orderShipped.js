const orderShipped = (name, order, trackingNumber) => {
  const date = new Date().toLocaleDateString('en-GB');
  const orderId = order.razorpayOrderId || order._id;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
    </head>
    <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f7f6;">
      <div style="max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.1); border-top: 6px solid #2563eb;">
        <div style="padding: 30px; text-align: center; background-color: #eff6ff;">
          <h2 style="color: #1e40af; margin: 0;">Super Health</h2>
          <h1 style="color: #333333; margin: 10px 0;">On Its Way!</h1>
        </div>
        <div style="padding: 30px;">
          <h3>Hi ${name},</h3>
          <p>Exciting news! Your order <strong>#${orderId}</strong> has been shipped and is heading your way.</p>
          
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 20px; margin: 20px 0; text-align: center;">
            <p style="margin: 0; color: #64748b; font-size: 14px;">Tracking Number:</p>
            <h2 style="margin: 10px 0; color: #1e40af;">${trackingNumber}</h2>
            <a href="https://www.delhivery.com/track/package/${trackingNumber}" style="background-color: #2563eb; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">Track Package</a>
          </div>
          
          <p>Expect your Super Health sachets within 3-5 business days. Get ready to feel the difference!</p>
        </div>
        <div style="background-color: #1e293b; color: #ffffff; padding: 20px; text-align: center; font-size: 12px;">
          <p>&copy; 2026 Super Health. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
};

export default orderShipped;