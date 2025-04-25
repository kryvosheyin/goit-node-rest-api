import nodemailer from "nodemailer";

const { UKR_NET_EMAIL, UKR_NET_PASSWORD } = process.env;

const nodeMailerConfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: UKR_NET_EMAIL,
    pass: UKR_NET_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodeMailerConfig);

const sendEmail = (data) => {
  const email = { ...data, from: `Alex Kryvosheyin ${UKR_NET_EMAIL}` };
  return transport.sendMail(email);
};

export default sendEmail;
