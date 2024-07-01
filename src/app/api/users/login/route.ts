import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { log } from 'console'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

connect()

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json()
    const { email, password } = reqBody
    console.log(reqBody)

    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json(
        {
          message: 'user not found',
        },
        { status: 400 }
      )
    }
    console.log(user)

    const validPassword = await bcryptjs.compare(password, user.password)

    if (!validPassword) {
      return NextResponse.json(
        {
          message: 'wrong password',
        },
        { status: 400 }
      )
    }
    //    this is the payload for the jwt token we can add other info also but id is enough also to get the user later
    const tokenData = {
      id: user._id,
      email: user.email,
    }

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn:'1d'})

    const response = NextResponse.json({
        message:"Logged In successfully",
        success:true,
    })

    response.cookies.set("token", token, {
        httpOnly:true
    })
    return response

  } catch (error: any) {
    return NextResponse.json(
      {
        message: 'something went wrong in try block of this post function',
        error: error.message,
      },
      { status: 500 }
    )
  }
}
