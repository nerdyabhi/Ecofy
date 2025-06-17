import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Menu, X, Bell, User, LogOut } from 'lucide-react'
import { logout } from '../../store/slices/authSlice'

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <nav className="bg-dark-200 border-b border-dark-300 fixed w-full z-30 top-0 backdrop-blur-sm bg-opacity-90">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-primary-400 text-xl font-bold">
                Ecofy
              </Link>
            </div>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 rounded-lg hover:bg-dark-300 text-gray-400 hover:text-white transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <div className="border-r border-dark-300 h-6 mx-2"></div>
            <Link
              to="/profile"
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-dark-300 transition-colors"
            >
              {user?.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="h-8 w-8 rounded-full ring-1 ring-primary-500"
                />
              ) : (
                <div className="h-8 w-8 rounded-full bg-dark-300 flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
              )}
              <span className="text-sm text-gray-300">{user?.name}</span>
            </Link>
            <button
              onClick={handleLogout}
              className="p-2 rounded-lg hover:bg-dark-300 text-gray-400 hover:text-white transition-colors"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg hover:bg-dark-300 text-gray-400 hover:text-white"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-dark-200 border-b border-dark-300">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-4 py-2 text-base font-medium text-gray-300 hover:bg-dark-300 hover:text-white"
            >
              Dashboard
            </Link>
            <Link
              to="/waste"
              className="block px-4 py-2 text-base font-medium text-gray-300 hover:bg-dark-300 hover:text-white"
            >
              Waste Management
            </Link>
            <Link
              to="/carbon"
              className="block px-4 py-2 text-base font-medium text-gray-300 hover:bg-dark-300 hover:text-white"
            >
              Carbon Tracking
            </Link>
            <Link
              to="/community"
              className="block px-4 py-2 text-base font-medium text-gray-300 hover:bg-dark-300 hover:text-white"
            >
              Community
            </Link>
            <Link
              to="/sharing"
              className="block px-4 py-2 text-base font-medium text-gray-300 hover:bg-dark-300 hover:text-white"
            >
              Sharing
            </Link>
            <Link
              to="/analytics"
              className="block px-4 py-2 text-base font-medium text-gray-300 hover:bg-dark-300 hover:text-white"
            >
              Analytics
            </Link>
          </div>
          <div className="border-t border-dark-300 pt-4 pb-3">
            <div className="flex items-center px-4">
              {user?.profileImage ? (
                <img
                  src={user.profileImage}
                  alt="Profile"
                  className="h-10 w-10 rounded-full border-2 border-primary-500"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-dark-300 flex items-center justify-center">
                  <User className="h-6 w-6 text-gray-400" />
                </div>
              )}
              <div className="ml-3">
                <div className="text-base font-medium text-gray-200">
                  {user?.name}
                </div>
                <div className="text-sm font-medium text-gray-400">
                  {user?.email}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="ml-auto p-2 rounded-full bg-dark-300 text-gray-400 hover:text-white"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar