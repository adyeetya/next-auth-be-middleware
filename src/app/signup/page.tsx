'use client'

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
const SignupPage = () => {
  const router = useRouter()
  const [user, setUser] = useState({
    email: '',
    password: '',
    username: '',
  })
  const [buttonDisabled, setButtonDisabled] = useState(false)
  const [loading, setLoading] = useState(false)

  const onSignup = async () => {
    try {
      setLoading(true)
      const response = await axios.post('/api/users/signup', user)
      const data = response.data
      console.log('Signup success', data)
      setLoading(false)
      router.push('/login')
    } catch (error: any) {
      console.log('Signup failed', error.message)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false)
    } else {
      setButtonDisabled(true)
    }
  }, [user])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>{loading ? 'Loading...' : 'Signup'}</h1>
      <div className="p-8 m-8 flex flex-col justify-center gap-4">
        <label htmlFor="username" className="text-gray-700 text-sm ml-2">
          Username
        </label>
        <input
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          id="username"
          placeholder="Username"
          className="p-2 border border-gray-300 rounded focus:outline-none text-black"
        />
        <label htmlFor="email" className="text-gray-700 text-sm ml-2">
          Email
        </label>
        <input
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          id="email"
          placeholder="Email"
          className="p-2 border border-gray-300 rounded focus:outline-none text-black"
        />

        <label htmlFor="password" className="text-gray-700 text-sm ml-2">
          Password
        </label>
        <input
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          id="password"
          placeholder="Password"
          className="p-2 border border-gray-300 rounded focus:outline-none text-black"
        />

        <button
          onClick={onSignup}
          disabled={buttonDisabled}
          className="border border-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        >
          {buttonDisabled ? 'Fill the Form' : 'Signup'}
        </button>
        <Link href={'/login'}>Already have an account?</Link>
      </div>
    </div>
  )
}

export default SignupPage
