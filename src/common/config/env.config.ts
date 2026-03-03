export const envConfig = () => ({
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: '1d',
  },

  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
  mail: {
    apiKey: process.env.BREVO_API_KEY,
    senderEmail: process.env.MAIL_SENDER_EMAIL,
    senderName: process.env.MAIL_SENDER_NAME,
  },
});