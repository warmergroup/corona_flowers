import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;

class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: parseInt(SMTP_PORT, 10),
      secure: false,
      auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
    });
  }

  async sendMail(email, subject, html) {
    await this.transporter.sendMail({
      from: SMTP_USER,
      to: email,
      subject,
      html,
    });
  }

  async sendActivationMail(email, activationLink) {
    const subject = `Activation account link ${activationLink}`;
    const html = `<div><a href="${activationLink}">Click to activate account</a></div>`;
    await this.sendMail(email, subject, html);
  }

  async sendForgotPasswordMail(email, activationLink) {
    const subject = `Parolni tiklash so'rovi`;
    const html = `
      <div>
        <h1>Parolni tiklash uchun quyidagi havola ustiga bosing!</h1>
        <a href="${activationLink}">Ushbu havolani bosing</a>
        <b>Ushbu havola 15 daqiqa davomida ishlaydi</b>
      </div>`;
    await this.sendMail(email, subject, html);
  }
}

export default new MailService();
