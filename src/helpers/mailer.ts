import User from '@/models/userModel'
import nodemailer from 'nodemailer'
import { Address } from 'nodemailer/lib/mailer'
import bcryptjs from 'bcryptjs'
interface sendEmailInterface {
  email: string | Address | (string | Address)[]
  emailType: string
  userId: string
}
export const sendEmail = async ({
  email,
  emailType,
  userId,
}: sendEmailInterface) => {
  try {
    //the token is randomly generated bu bcrypt we could also use lib like uuid

    // for security purposes we should not hash the user id instead generate a random token with libs like crypto and hash it
    const hashedToken = await bcryptjs.hash(userId, 10)
    if (emailType == 'VERIFY') {
      // if the type is of verify we update the verify token and the exp in the database we will also send this token in the email to the user for verification
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      })
    } else if (emailType == 'RESET') {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      })
    }

    var transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASSWORD,
      },
    })

    const mailOptions = {
      from: 'adityasingh@adi.xyz',
      to: email,
      subject:
        emailType == 'VERIFY'
          ? 'Please verify your email'
          : 'Please reset your password',

      html: `<p>
      Click <a href="${
        process.env.DOMAIN
      }/verifyemail?token=${hashedToken}"> here <a/> to ${
        emailType == 'VERIFY' ? 'verify your email' : 'reset your password'
      } or copy and paste the link below in your browser. <br>
      ${process.env.DOMAIN}/verifyemail?token=${hashedToken} </p>`,
    }

    const mailResponse = await transport.sendMail(mailOptions)
    return mailResponse
  } catch (error: any) {
    throw new Error(error)
  }
}
