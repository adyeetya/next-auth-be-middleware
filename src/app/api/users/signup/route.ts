import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { log } from 'console'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/helpers/mailer'

connect()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { username, email, password } = reqBody
    // validation
    log(reqBody)
    const user = await User.findOne({ email })
    if (user) {
      return NextResponse.json(
        {
          message: 'user already exists',
        },
        { status: 400 }
      )
    }

    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(password, salt)

    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    })

    const savedUser = await newUser.save()
    log(savedUser)

    // send verification email

    const mailRes = await sendEmail({
      email,
      emailType: 'VERIFY',
      userId: savedUser._id.toString(),
    })

    // log(mailRes)

    return NextResponse.json({
      message: 'user registered successfully',
      success: true,
      savedUser,
    })
  } catch (error: any) {
    log(error)
    return NextResponse.json(
      {
        message: 'something went wrong in try block of this post function',
        error: error.message,
      },
      { status: 500 }
    )
  }
}
