import nodemailer from "nodemailer";

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "webprojet31@gmail.com",
      service: "gmail",
      port: Number(process.env.EMAIL_PORT),
      secure: false,
      auth: {
        user: "webprojet31@gmail.com",
        pass: "hdwsoodiyejvcpfd",
      },
    });

    await transporter.sendMail({
      from: "webprojet31@gmail.com",
      to: email,
      subject: subject,
      text: text,
    });
    console.log("email sent successfully");
  } catch (error) {
    console.log("email not sent!");
    console.log(error);
    return error;
  }
};
export default sendEmail;
