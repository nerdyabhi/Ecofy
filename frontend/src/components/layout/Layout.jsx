import React from 'react'
import { useSelector } from 'react-redux'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

const Layout = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth)

  return (
    <div className="min-h-screen bg-dark-bg text-gray-200">
      {isAuthenticated && <Navbar />}
      <div className="flex pt-16 md:pt-0">
        {isAuthenticated && <Sidebar />}
        <main className="flex-1 p-4 md:p-6 md:ml-64 pb-20 md:pb-6">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
