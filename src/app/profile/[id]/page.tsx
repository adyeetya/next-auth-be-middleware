import React from 'react'

const profilePage = ({ params }: any) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      Profile Page <br /> Id: {params.id}
    </div>
  )
}

export default profilePage
