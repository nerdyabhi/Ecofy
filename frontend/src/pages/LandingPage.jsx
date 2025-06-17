import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Leaf, 
  Recycle, 
  BarChart3, 
  Users, 
  Share2, 
  ArrowRight,
  CheckCircle,
  Star,
  TrendingUp,
  MapPin,
  Award,
  Menu,
  X
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { BackgroundBeamsWithCollision } from '../components/ui/background-beams-with-collision';
import { BackgroundGrid } from '../components/ui/backgroundGrid';
import ThemeToggle from '../components/ThemeToggle';

const LandingPage = () => {
  const [currentStats, setCurrentStats] = React.useState({
    users: 12543,
    carbonSaved: 234.7,
    issuesResolved: 1876,
    itemsShared: 4521
  });

  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Animate numbers on mount
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStats(prev => ({
        users: prev.users + Math.floor(Math.random() * 3),
        carbonSaved: prev.carbonSaved + (Math.random() * 0.1),
        issuesResolved: prev.issuesResolved + Math.floor(Math.random() * 2),
        itemsShared: prev.itemsShared + Math.floor(Math.random() * 2)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <Recycle className="w-8 h-8" />,
      title: "Smart Waste Management",
      description: "AI-powered waste categorization and local recycler connections",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Carbon Footprint Tracker",
      description: "Track, analyze, and reduce your environmental impact daily",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Issues",
      description: "Report local problems and drive community-led solutions",
      color: "from-purple-500 to-violet-600"
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      title: "Sharing Economy",
      description: "Share resources with neighbors and build sustainable communities",
      color: "from-amber-500 to-orange-600"
    }
  ];

  const steps = [
    { number: "01", title: "Sign Up", description: "Create your account and set your location" },
    { number: "02", title: "Explore", description: "Discover features and connect with your community" },
    { number: "03", title: "Take Action", description: "Start making a positive environmental impact" },
    { number: "04", title: "Track Progress", description: "Monitor your contribution and earn eco-points" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Environmental Activist",
      content: "Ecofy transformed how our community addresses sustainability. We've reduced waste by 40%!",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Local Resident",
      content: "The community reporting feature helped fix our street's drainage issues in just 2 weeks.",
      rating: 5
    },
    {
      name: "Emma Davis",
      role: "Sustainability Coordinator",
      content: "This platform makes it so easy to track carbon footprint and connect with like-minded people.",
      rating: 5
    }
  ];  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Leaf className="w-8 h-8 text-green-500 mr-3" />
              <span className="text-xl font-bold text-gray-900 dark:text-white">Ecofy</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">How it Works</a>
              <a href="#testimonials" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">Testimonials</a>
              <Link to="/login" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">Sign In</Link>
              <Button asChild size="sm" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white">
                <Link to="/register">Get Started</Link>
              </Button>
            </div>
              {/* Mobile Navigation */}
            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-gray-200/50 dark:border-gray-700/50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md"
            >
              <div className="px-4 py-4 space-y-4">
                <a 
                  href="#features" 
                  className="block text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Features
                </a>
                <a 
                  href="#how-it-works" 
                  className="block text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  How it Works
                </a>
                <a 
                  href="#testimonials" 
                  className="block text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Testimonials
                </a>
                <Link 
                  to="/login" 
                  className="block text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Button asChild className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white">
                  <Link to="/register" onClick={() => setMobileMenuOpen(false)}>Get Started</Link>
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </nav>
      
      {/* Theme Toggle - Fixed Position (Desktop Only) */}
      <div className="hidden md:block fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      
      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-green-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-green-900/20 flex items-center justify-center overflow-hidden">
        <BackgroundGrid />
        
        {/* Floating Elements - Better mobile dark mode */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            className="absolute top-20 left-4 sm:left-10 w-16 h-16 sm:w-20 sm:h-20 bg-green-300/10 dark:bg-green-500/15 rounded-full blur-xl"
            animate={{ 
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute top-32 sm:top-40 right-4 sm:right-20 w-20 h-20 sm:w-32 sm:h-32 bg-emerald-300/10 dark:bg-emerald-500/15 rounded-full blur-xl"
            animate={{ 
              y: [0, 20, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          />
          <motion.div
            className="absolute bottom-32 sm:bottom-40 left-4 sm:left-20 w-20 h-20 sm:w-24 sm:h-24 bg-green-400/10 dark:bg-green-600/15 rounded-full blur-xl"
            animate={{ 
              y: [0, -15, 0],
              x: [0, 10, 0],
            }}
            transition={{ 
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          />
        </div>

        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-screen py-20 lg:py-0">
              
              {/* Left Column - Content */}
              <div className="lg:col-span-7 text-center lg:text-left space-y-4 sm:space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-4 sm:space-y-6"
                >{/* Badge */}
                  <motion.div 
                    className="inline-flex items-center bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm text-green-700 dark:text-green-300 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium shadow-sm border border-green-200/50 dark:border-green-600/50"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <Leaf className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1.5 sm:mr-2 text-green-600 dark:text-green-400" />
                    Building Sustainable Communities
                  </motion.div>
                    {/* Main Heading - Enhanced mobile experience */}
                  <motion.h1 
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 dark:text-white px-2 sm:px-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  >
                    Transform Your Community Into a{" "}
                    <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                      Sustainable Future
                    </span>
                  </motion.h1>
                  
                  {/* Description - Better mobile contrast */}
                  <motion.p 
                    className="text-sm sm:text-base lg:text-lg text-gray-600 dark:text-gray-300 max-w-lg mx-auto lg:mx-0 leading-relaxed px-2 sm:px-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  >
                    Join thousands making real environmental impact through smart waste management, 
                    carbon tracking, and community collaboration.
                  </motion.p>                  {/* CTA Buttons - Better mobile dark mode */}
                  <motion.div 
                    className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start px-2 sm:px-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                  >
                    <Button asChild size="lg" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 px-6 py-3 text-sm sm:text-base font-medium shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 w-full sm:w-auto">
                      <Link to="/register">
                        Start Your Journey <ArrowRight className="ml-2 w-4 h-4" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-6 py-3 text-sm sm:text-base font-medium w-full sm:w-auto">
                      <Link to="/login">
                        Sign In
                      </Link>
                    </Button>
                  </motion.div>                  {/* Trust Indicators - Mobile dark mode friendly */}
                  <motion.div 
                    className="flex flex-wrap justify-center lg:justify-start items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400 px-2 sm:px-0"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                  >
                    <div className="flex items-center">
                      <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5 text-green-500 dark:text-green-400" />
                      Free to use
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5 text-green-500 dark:text-green-400" />
                      No credit card
                    </div>
                    <div className="flex items-center">
                      <CheckCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1 sm:mr-1.5 text-green-500 dark:text-green-400" />
                      2 min setup
                    </div>
                  </motion.div>

                  {/* Mobile Circular Element - Directly below hero text */}
                  <motion.div 
                    className="lg:hidden flex justify-center mt-8 sm:mt-12"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1, duration: 1 }}
                  >
                    <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto">
                      {/* Background Glow */}
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-2xl opacity-20 dark:opacity-30 animate-pulse"></div>
                      
                      {/* Main Circle */}
                      <div className="relative w-full h-full bg-gradient-to-br from-white/90 to-green-50/90 dark:from-gray-800/90 dark:to-green-900/30 rounded-full border border-green-200/50 dark:border-green-700/30 backdrop-blur-sm shadow-xl flex items-center justify-center">
                        
                        {/* Feature Icons - Mobile optimized */}
                        <motion.div
                          className="absolute top-3 left-1/2 transform -translate-x-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-md"
                          animate={{ 
                            y: [0, -5, 0],
                            rotate: [0, 5, 0]
                          }}
                          transition={{ 
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          <Recycle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </motion.div>

                        <motion.div
                          className="absolute top-1/2 right-3 transform -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-md flex items-center justify-center shadow-md"
                          animate={{ 
                            x: [0, 5, 0],
                            rotate: [0, -5, 0]
                          }}
                          transition={{ 
                            duration: 5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1
                          }}
                        >
                          <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </motion.div>

                        <motion.div
                          className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-500 to-violet-600 rounded-lg flex items-center justify-center shadow-md"
                          animate={{ 
                            y: [0, 5, 0],
                            rotate: [0, -5, 0]
                          }}
                          transition={{ 
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 2
                          }}
                        >
                          <Users className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </motion.div>

                        <motion.div
                          className="absolute top-1/2 left-3 transform -translate-y-1/2 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-amber-500 to-orange-600 rounded-md flex items-center justify-center shadow-md"
                          animate={{ 
                            x: [0, -5, 0],
                            rotate: [0, 5, 0]
                          }}
                          transition={{ 
                            duration: 4.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5
                          }}
                        >
                          <Share2 className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </motion.div>

                        {/* Center Content */}
                        <div className="text-center">
                          <motion.div
                            className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-2 shadow-lg mx-auto"
                            animate={{ 
                              scale: [1, 1.1, 1],
                              rotate: [0, 360]
                            }}
                            transition={{ 
                              duration: 10,
                              repeat: Infinity,
                              ease: "linear"
                            }}
                          >
                            <Leaf className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                          </motion.div>
                          <p className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                            Eco Platform
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>              {/* Right Column - Visual Elements - Hidden on Mobile, Visible on Desktop */}
              <div className="hidden lg:block lg:col-span-5 relative mt-8 lg:mt-0">
                <motion.div
                  className="relative"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4, duration: 1 }}
                >
                  {/* Main Circle - Desktop Only */}
                  <div className="relative w-96 h-96 mx-auto">
                    {/* Background Glow */}
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-3xl opacity-20 dark:opacity-30 animate-pulse"></div>
                      {/* Main Circle - Better mobile dark mode */}
                    <div className="relative w-full h-full bg-gradient-to-br from-white/90 to-green-50/90 dark:from-gray-800/90 dark:to-green-900/30 rounded-full border border-green-200/50 dark:border-green-700/30 backdrop-blur-sm shadow-2xl flex items-center justify-center">
                        {/* Feature Icons - Desktop Only */}
                      <motion.div
                        className="absolute top-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg"
                        animate={{ 
                          y: [0, -10, 0],
                          rotate: [0, 5, 0]
                        }}
                        transition={{ 
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      >
                        <Recycle className="w-8 h-8 text-white" />
                      </motion.div>

                      <motion.div
                        className="absolute top-1/2 right-8 transform -translate-y-1/2 w-14 h-14 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg"
                        animate={{ 
                          x: [0, 10, 0],
                          rotate: [0, -5, 0]
                        }}
                        transition={{ 
                          duration: 5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1
                        }}
                      >
                        <BarChart3 className="w-7 h-7 text-white" />
                      </motion.div>

                      <motion.div
                        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg"
                        animate={{ 
                          y: [0, 10, 0],
                          rotate: [0, -5, 0]
                        }}
                        transition={{ 
                          duration: 6,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 2
                        }}
                      >
                        <Users className="w-8 h-8 text-white" />
                      </motion.div>

                      <motion.div
                        className="absolute top-1/2 left-8 transform -translate-y-1/2 w-14 h-14 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg"
                        animate={{ 
                          x: [0, -10, 0],
                          rotate: [0, 5, 0]
                        }}
                        transition={{ 
                          duration: 4.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 0.5
                        }}
                      >
                        <Share2 className="w-7 h-7 text-white" />
                      </motion.div>

                      {/* Center Content */}
                      <div className="text-center">
                        <motion.div
                          className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-3xl flex items-center justify-center mb-4 shadow-xl mx-auto"
                          animate={{ 
                            scale: [1, 1.1, 1],
                            rotate: [0, 360]
                          }}
                          transition={{ 
                            scale: {
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut"
                            },
                            rotate: {
                              duration: 20,
                              repeat: Infinity,
                              ease: "linear"
                            }
                          }}
                        >
                          <Leaf className="w-10 h-10 text-white" />
                        </motion.div>
                        <p className="text-lg font-semibold text-green-700 dark:text-green-300">
                          Ecofy Platform
                        </p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">
                          4 Tools, 1 Mission
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Floating Stats */}
                  <motion.div
                    className="absolute -top-4 -right-4 bg-white dark:bg-neutral-800 rounded-xl p-3 shadow-lg border border-neutral-200 dark:border-neutral-700"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.2, duration: 0.8 }}
                  >
                    <div className="text-sm text-neutral-500 dark:text-neutral-400">CO₂ Saved</div>
                    <div className="text-lg font-bold text-green-600 dark:text-green-400">234.7T</div>
                  </motion.div>

                  <motion.div
                    className="absolute -bottom-4 -left-4 bg-white dark:bg-neutral-800 rounded-xl p-3 shadow-lg border border-neutral-200 dark:border-neutral-700"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.4, duration: 0.8 }}
                  >
                    <div className="text-sm text-neutral-500 dark:text-neutral-400">Active Users</div>
                    <div className="text-lg font-bold text-blue-600 dark:text-blue-400">12.5k+</div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl sm:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                {currentStats.users.toLocaleString()}+
              </div>
              <div className="text-neutral-600 dark:text-neutral-300">Active Users</div>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-3xl sm:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                {currentStats.carbonSaved.toFixed(1)}T
              </div>
              <div className="text-neutral-600 dark:text-neutral-300">CO₂ Saved</div>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-3xl sm:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                {currentStats.issuesResolved.toLocaleString()}
              </div>
              <div className="text-neutral-600 dark:text-neutral-300">Issues Resolved</div>
            </motion.div>
              <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-3xl sm:text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                {currentStats.itemsShared.toLocaleString()}
              </div>
              <div className="text-neutral-600 dark:text-neutral-300">Items Shared</div>
            </motion.div>
          </div>
        </div>
      </section>      {/* Problem Section */}
      <section className="py-20 bg-neutral-900 dark:bg-neutral-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-5xl font-bold mb-6">
              The Challenge We Face
            </h2>
            <p className="text-xl text-neutral-300 max-w-3xl mx-auto">
              Environmental issues are growing, but communities lack the tools to coordinate 
              effective responses and track meaningful progress.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Rising Waste</h3>
              <p className="text-neutral-400">Global waste generation increases by 3.4% annually with poor recycling coordination.</p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Carbon Footprint</h3>
              <p className="text-neutral-400">Individual carbon tracking is complex, making it hard to measure real impact.</p>
            </motion.div>
            
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Local Issues</h3>
              <p className="text-neutral-400">Community problems go unreported and unresolved due to lack of coordination.</p>
            </motion.div>
          </div>
        </div>
      </section>      {/* Solution/Features Section */}
      <section id="features" className="py-20 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
              One Platform, Four Solutions
            </h2>            <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto mb-8">
              Ecofy integrates essential sustainability tools into a unified platform 
              that makes environmental action accessible, trackable, and rewarding.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >                <Card className="p-6 h-full hover:shadow-lg transition-shadow border-0 bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-700">
                  <CardContent className="p-0">
                    <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center text-white mb-4`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-neutral-600 dark:text-neutral-300 text-lg">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/30 dark:to-emerald-950/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
              How It Works
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
              Get started with Ecofy in four simple steps and begin making a
              measurable impact on your community's sustainability.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {step.number}
                </div>                <h3 className="text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
                  {step.title}
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >            <h2 className="text-3xl sm:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
              Real Impact, Real Stories
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
              See how communities around the world are using Ecofy to create 
              lasting environmental change.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full border-0 shadow-lg bg-white dark:bg-neutral-800">
                  <CardContent className="p-0">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                      ))}
                    </div>                    <p className="text-neutral-600 dark:text-neutral-300 mb-6 italic">
                      "{testimonial.content}"
                    </p>
                    <div>
                      <div className="font-semibold text-neutral-900 dark:text-neutral-100">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-neutral-500 dark:text-neutral-400">
                        {testimonial.role}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-5xl font-bold mb-6">
              Ready to Make a Difference?
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
              Join thousands of environmentally conscious citizens who are already 
              transforming their communities with Ecofy.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-green-600 hover:bg-neutral-100 px-8 py-4 text-lg font-semibold">
                <Link to="/register">
                  Start Free Today <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg">
                <Link to="/app">
                  Explore Demo
                </Link>
              </Button>
            </div>
            
            <div className="mt-8 flex items-center justify-center space-x-6 text-sm opacity-75">
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Free to use
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                No credit card required
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                Join in 2 minutes
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Leaf className="w-8 h-8 text-green-500 mr-2" />
                <span className="text-2xl font-bold">Ecofy</span>
              </div>
              <p className="text-neutral-400">
                Building sustainable communities through smart technology and 
                collective action.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-neutral-400">
                <li><Link to="/app/waste" className="hover:text-white transition-colors">Waste Management</Link></li>
                <li><Link to="/app/carbon" className="hover:text-white transition-colors">Carbon Tracking</Link></li>
                <li><Link to="/app/community" className="hover:text-white transition-colors">Community Issues</Link></li>
                <li><Link to="/app/sharing" className="hover:text-white transition-colors">Resource Sharing</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-neutral-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Get Started</h3>
              <ul className="space-y-2 text-neutral-400">
                <li><Link to="/register" className="hover:text-white transition-colors">Sign Up</Link></li>
                <li><Link to="/login" className="hover:text-white transition-colors">Login</Link></li>
                <li><Link to="/app" className="hover:text-white transition-colors">Demo</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-neutral-800 mt-12 pt-8 text-center text-neutral-400">
            <p>&copy; 2025 Ecofy. All rights reserved. Made with 💚 for a sustainable future.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
