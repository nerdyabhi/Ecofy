import React from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { 
  Home, 
  Recycle, 
  BarChart3, 
  Users, 
  Share2, 
  User,
  Bell,
  Search,
  Menu,
  X,
  Leaf
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import useStore from '../../stores/useStore';

const Layout = () => {
  const location = useLocation();
  const { isAuthenticated, user, unreadCount } = useStore();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const navigation = [
    { name: 'Dashboard', href: '/app', icon: Home },
    { name: 'Waste Hub', href: '/app/waste', icon: Recycle },
    { name: 'Carbon Tracker', href: '/app/carbon', icon: BarChart3 },
    { name: 'Community', href: '/app/community', icon: Users },
    { name: 'Sharing', href: '/app/sharing', icon: Share2 },
  ];

  return (
    <div className="flex h-screen bg-neutral-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-neutral-200">
          <div className="flex items-center">
            <Leaf className="w-8 h-8 text-green-500 mr-2" />
            <span className="text-xl font-bold text-neutral-900">Ecofy</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        <nav className="mt-6 px-3">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-3 py-3 mt-1 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-green-50 text-green-700 border-r-2 border-green-500'
                    : 'text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900'
                }`}
                onClick={() => setIsSidebarOpen(false)}
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        {/* User Profile Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-neutral-200">
          <Link
            to="/app/profile"
            className="flex items-center p-3 rounded-lg hover:bg-neutral-50 transition-colors"
          >
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
              {user?.name?.charAt(0) || 'U'}
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <div className="text-sm font-medium text-neutral-900 truncate">
                {user?.name || 'User'}
              </div>
              <div className="text-xs text-neutral-500 truncate">
                {user?.email || 'user@example.com'}
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Top bar */}
        <header className="bg-white shadow-sm border-b border-neutral-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden mr-2"
                onClick={() => setIsSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              
              <div className="flex items-center space-x-2">
                <Search className="w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="hidden sm:block w-64 px-3 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
              
              <Link to="/app/profile">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                  {user?.name?.charAt(0) || 'U'}
                </div>
              </Link>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-neutral-50">
          <Outlet />
        </main>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-25 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
