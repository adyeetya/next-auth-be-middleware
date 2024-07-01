import { connect } from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { log } from 'console'
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { getDataFromToken } from '@/helpers/getDataFromToken'

connect()

export async function POST(request: NextRequest) {
  // extract data from token
  try {
    const userId = await getDataFromToken(request)
    const user = await User.findById(userId).select('-password')
    console.log(user)

    return NextResponse.json({
      message: 'User found',
      data: user,
    })
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
