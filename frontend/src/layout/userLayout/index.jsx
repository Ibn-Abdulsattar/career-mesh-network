import Navbar from '@/components/Navbar';
import React from 'react'

function UserLayout({children}) {
  return (
    <div style={{height: "100vh"}}>
      <Navbar/>
        {children}
    </div>
  )
}

export default UserLayout;