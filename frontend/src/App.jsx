import React, { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from './components/layout/Navbar'
import Sidebar from './components/layout/Sidebar'
import Dashboard from './pages/Dashboard'
import WasteManagement from './pages/WasteManagement'
import CarbonTracking from './pages/CarbonTracking'
import Community from './pages/Community'
import Sharing from './pages/Sharing'
import Analytics from './pages/Analytics'
import Profile from './pages/Profile'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Home from './pages/Home'
import ProtectedRoute from './components/auth/ProtectedRoute'

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth)

  // Apply dark mode
  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  // Landing page layout (for non-authenticated users)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    )
  }

  // App layout (for authenticated users)
  return (
    <div className="min-h-screen bg-dark-bg text-gray-200">
      <Navbar />
      <div className="flex pt-16 md:pt-0"> {/* Add padding for mobile navbar */}
        <Sidebar />
        <main className="flex-1 p-4 md:p-6 md:ml-64 pb-20 md:pb-6 mt-14"> {/* Add bottom padding for mobile nav */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/waste" element={<WasteManagement />} />
            <Route path="/carbon" element={<CarbonTracking />} />
            <Route path="/community" element={<Community />} />
            <Route path="/sharing" element={<Sharing />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}

export default App
