import DashboardLayout from '@/layout/dashboardLayout'
import UserLayout from '@/layout/userLayout'
import React from 'react'

function MyConnection() {
  return (
        <UserLayout>
      <DashboardLayout>
        <h1>Connections</h1>
      </DashboardLayout>
    </UserLayout>
  )
}

export default MyConnection