const resetPasswordEmail = (name, link) => {
  const date = new Date().toLocaleDateString('en-GB');
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border-top: 8px solid #006d63; background-color: #ffffff; padding: 0;">
      <div style="padding: 30px 20px;">
        <h1 style="color: #004d40; font-size: 36px; margin-bottom: 5px; font-weight: 800; letter-spacing: -1px;">
          PASSWORD <span style="color: #006d63;">Reset</span>
        </h1>
        <p style="color: #666; font-size: 14px; margin-bottom: 30px;">Date: ${date}</p>
        
        <h3 style="font-size: 18px; font-weight: bold; margin-bottom: 15px; color: #000;">Hi ${name},</h3>
        
        <p style="color: #444; line-height: 1.6; font-size: 15px; margin-bottom: 20px;">
          We received a request to reset the password for your Super Health account. If you didn't make this request, you can safely ignore this email.
        </p>
        
        <div style="margin: 40px 0; padding: 30px; border: 1px dashed #006d63; text-align: center; border-radius: 4px; background-color: #f9fdfc;">
          <p style="color: #006d63; font-weight: bold; font-size: 16px; margin-bottom: 20px;">Secure your account now.</p>
          <a href="${link}" style="background-color: #006d63; color: #ffffff; padding: 14px 35px; text-decoration: none; border-radius: 4px; font-weight: bold; display: inline-block; text-transform: uppercase; font-size: 14px;">
            RESET PASSWORD
          </a>
        </div>
        
        <p style="color: #666; font-size: 14px; line-height: 1.6; margin-top: 30px;">
          This link will expire in 1 hour. If you have any questions or need assistance, please don't hesitate to reach out to our support team.
        </p>
      </div>
      
      <div style="background-color: #006d63; color: #ffffff; padding: 25px; text-align: center; font-size: 14px; font-weight: bold;">
        <span style="margin-right: 15px;">www.super-health.in</span> <span>support@super-health.in</span>
      </div>
    </div>
  `;
};

export default resetPasswordEmail;