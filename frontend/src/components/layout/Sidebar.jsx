import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { 
  Home,
  Recycle,
  TreePine,
  Users,
  Share2,
  BarChart3,
  Award
} from 'lucide-react'

const Sidebar = () => {
  const location = useLocation()
  const { user } = useSelector((state) => state.auth)

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Waste Management', href: '/waste', icon: Recycle },
    { name: 'Carbon Tracking', href: '/carbon', icon: TreePine },
    { name: 'Community', href: '/community', icon: Users },
    { name: 'Sharing', href: '/sharing', icon: Share2 },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex-1 flex flex-col min-h-0 bg-dark-card border-r border-dark-300">
          <div className="flex-1 flex flex-col pt-20 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 px-4 py-4 bg-dark-200 mx-4 rounded-lg bg-opacity-50 backdrop-blur-sm">
              <div className="flex items-center">
                <Award className="h-8 w-8 text-primary-500" />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-300">Eco Points</p>
                  <p className="text-xl font-bold text-primary-400">{user?.ecoPoints || 0}</p>
                </div>
              </div>
            </div>

            <nav className="mt-5 flex-1 px-4 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      isActive(item.href)
                        ? 'bg-primary-500 bg-opacity-20 text-primary-400'
                        : 'text-gray-400 hover:bg-dark-300 hover:text-gray-300'
                    }`}
                  >
                    <Icon
                      className={`mr-3 h-5 w-5 ${
                        isActive(item.href)
                          ? 'text-primary-400'
                          : 'text-gray-500 group-hover:text-gray-400'
                      }`}
                    />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Mobile bottom navigation */}
      <div className="md:hidden fixed bottom-0 w-full bg-dark-200 border-t border-dark-300 z-40">
        <div className="grid grid-cols-5 gap-1">
          {navigation.slice(0, 5).map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex flex-col items-center py-2 px-1 ${
                  isActive(item.href)
                    ? 'text-primary-400'
                    : 'text-gray-500 hover:text-gray-300'
                }`}
              >
                <Icon className="h-6 w-6" />
                <span className="text-xs mt-1">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Sidebar