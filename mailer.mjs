import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.ZEPTO_HOST || "smtp.zeptomail.eu",
  port: Number(process.env.ZEPTO_PORT || 587),
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.ZEPTO_USER,
    pass: process.env.ZEPTO_PASS
  },
  logger: true,
  debug: true
});

export async function sendTestMail() {
  try {
    const info = await transporter.sendMail({
      from: process.env.ZEPTO_FROM || '"Nox PWA" <no-reply@noxapp.nl>',
      to: process.env.TEST_MAIL_TO || "josebennink@protonmail.com",
      subject: "Testmail van Nox PWA",
      text: "Hallo, dit is een test via ZeptoMail."
    });
    console.log("✅ Mail verstuurd:", info.messageId);
  } catch (err) {
    console.error("❌ Mail fout:", err);
  }
}
