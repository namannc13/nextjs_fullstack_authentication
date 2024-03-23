import User from "@/models/user.model";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "3f134189fe1e5b",
        pass: "caf880ab4b94cb",
      },
    });

    const htmlPortion =
      emailType === "VERIFY"
        ? `<p>Click <a href="${process.env.NEXT_PUBLIC_DOMAIN}/verifyemail?token=${hashedToken}">Here</a> to Verify your email
    </p>`
        : `<p>Click <a href="${process.env.NEXT_PUBLIC_DOMAIN}/resetpassword?token=${hashedToken}">Here</a> to Reset your password
    </p>`;

    const mailOptions = {
      from: "chawhannaman5@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: htmlPortion,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
