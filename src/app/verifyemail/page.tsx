'use client'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const VerifyEmailPage = () => {
  //   const router = useRouter()
  const [token, setToken] = useState('')
  const [error, setError] = useState(false)
  const [verified, setVerified] = useState(false)

  const verifyUserEmail = async () => {
    try {
      await axios.post('/api/users/verifyemail', { token })
      setVerified(true)
    } catch (error: any) {
      setError(true)
      console.log(error.response.data)
    }
  }
  useEffect(() => {
    setError(false)
    const Token = window.location.search
    const urlToken = Token.split('=')[1]
    // const { query } = router
    // const urlToken = query.token as string
    setToken(urlToken || '')
  }, [])

  useEffect(() => {
    setError(false)
    if (token.length > 0) {
      verifyUserEmail()
    }
  }, [token])
  return (
    <div className="flex items-center justify-center flex-col min-h-screen py-2">
      <h1 className="text-3xl font-bold">Verify Email</h1>
      <h2>{token ? `${token}` : 'No Token'}</h2>
      {verified && (
        <div>
          <h2>Verified</h2>
          <Link href="/login">Login</Link>
        </div>
      )}
      {error && (
        <div>
          <h2>Error</h2>
        </div>
      )}
    </div>
  )
}

export default VerifyEmailPage
