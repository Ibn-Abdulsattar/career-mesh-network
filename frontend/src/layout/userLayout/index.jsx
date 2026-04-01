import Navbar from '@/components/Navbar/page';
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