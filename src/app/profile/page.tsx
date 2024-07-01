'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
const profilePage = () => {
  const router = useRouter()
  const [data, setData] = useState('nothing')

  const getUserDetails = async () => {
    const res = await axios.post('/api/users/me')
    console.log(res.data.data)
    setData(res.data.data._id)
  }

  useEffect(() => {
    getUserDetails() 
  }, [])

  const logout = async () => {
    try {
      await axios.get('/api/users/logout')
      toast.success('Logged Out')
      router.push('/login')
    } catch (error: any) {
      console.log('error: ', error.message)
      toast.error(error.message)
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>Profile Page</h1>
      <hr />
      <h2>
        {data === 'nothing' ? (
          'No Data'
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        onClick={logout}
        className="border border-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Logout
      </button>
    </div>
  )
}

export default profilePage
