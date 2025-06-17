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
  Leaf
} from 'lucide-react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import useStore from '../../stores/useStore';

const MobileLayout = () => {
  const location = useLocation();
  const { isAuthenticated, user, unreadCount } = useStore();

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const navigation = [
    { name: 'Home', href: '/app', icon: Home },
    { name: 'Waste', href: '/app/waste', icon: Recycle },
    { name: 'Carbon', href: '/app/carbon', icon: BarChart3 },
    { name: 'Community', href: '/app/community', icon: Users },
    { name: 'Share', href: '/app/sharing', icon: Share2 },
  ];
  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top bar */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Leaf className="w-6 h-6 text-green-500 mr-2" />
            <span className="text-lg font-bold text-neutral-900">Ecofy</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="sm">
              <Search className="w-5 h-5" />
            </Button>
            
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 overflow-x-hidden overflow-y-auto pb-16">
        <Outlet />
      </main>      {/* Bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-2 py-2">
        <div className="flex items-center justify-around">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'text-green-600 bg-green-50 dark:bg-green-900/20'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <item.icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MobileLayout;
