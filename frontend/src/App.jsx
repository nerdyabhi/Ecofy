import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import useStore from './stores/useStore';

// Layout Components
import Layout from './components/layout/Layout';
import MobileLayout from './components/layout/MobileLayout';

// Pages
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import WasteHub from './pages/WasteHub';
import CarbonTracker from './pages/CarbonTracker';
import CommunityIssues from './pages/CommunityIssues';
import SharingEconomy from './pages/SharingEconomy';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

// Hook to detect mobile
const useIsMobile = () => {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);
  
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return isMobile;
};

function App() {
  const { isAuthenticated, initializeSampleData } = useStore();
  const isMobile = useIsMobile();
  
  React.useEffect(() => {
    // Initialize sample data on app load
    initializeSampleData();
  }, [initializeSampleData]);

  const LayoutComponent = isMobile ? MobileLayout : Layout;

  return (
    <Router>
      <div className="min-h-screen bg-neutral-50">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route path="/app" element={<LayoutComponent />}>
            <Route index element={<Dashboard />} />
            <Route path="waste" element={<WasteHub />} />
            <Route path="carbon" element={<CarbonTracker />} />
            <Route path="community" element={<CommunityIssues />} />
            <Route path="sharing" element={<SharingEconomy />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
        
        {/* Toast notifications */}
        <Toaster 
          position="top-right" 
          richColors 
          closeButton
          toastOptions={{
            style: {
              background: 'hsl(var(--background))',
              color: 'hsl(var(--foreground))',
              border: '1px solid hsl(var(--border))',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
