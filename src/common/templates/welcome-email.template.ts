export const welcomeEmailTemplate = (firstName: string, senderName: string) => `
  <p style="font-size: 16px;">Hi ${firstName},</p>
  <p>Thank you for registering with us. You can now login to your account.</p>
  <p>Best regards,</p>
  <p>${senderName}</p>
`;