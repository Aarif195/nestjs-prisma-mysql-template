export const welcomeEmailTemplate = (firstName: string, senderName: string, otpCode: string) => `
  <p style="font-size: 16px;">Hi ${firstName},</p>
  <p>Thank you for registering. Your verification code is: <strong>${otpCode}</strong></p>
  <p>This code expires in 10 minutes.</p>
  <p>Best regards,</p>
  <p>${senderName}</p>
`;