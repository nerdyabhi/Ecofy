import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  TreePine,
  Recycle,
  Users,
  Share2,
  ArrowRight,
  Award,
  Globe,
  Leaf,
  TrendingUp,
  ChevronRight,
  LineChart,
  Menu,
  X,
  Shield,
  ArrowUpRight
} from 'lucide-react'

const Home = () => {
  // Ensure dark mode is applied
  useEffect(() => {
    document.documentElement.classList.add('dark')
    return () => {
      // Optional: remove it when component unmounts
      // document.documentElement.classList.remove('dark')
    }
  }, [])

  const features = [
    {
      icon: Recycle,
      title: 'Smart Waste Management',
      description: 'AI-powered waste categorization and recycling network. Connect with local recyclers and track your contribution.',
      gradient: 'from-emerald-500 to-green-600'
    },
    {
      icon: LineChart,
      title: 'Carbon Footprint Tracking',
      description: 'Monitor your daily carbon emissions through activities. Get personalized recommendations for reduction.',
      gradient: 'from-blue-500 to-cyan-600'
    },
    {
      icon: Users,
      title: 'Community Action',
      description: 'Report and track local environmental issues. Collaborate with neighbors to create sustainable change.',
      gradient: 'from-purple-500 to-violet-600'
    },
    {
      icon: Share2,
      title: 'Sharing Economy',
      description: 'Share and borrow items within your community. Reduce waste and build connections.',
      gradient: 'from-amber-500 to-orange-600'
    }
  ]

  const stats = [
    { value: '2.5K', label: 'Active Users', icon: Users },
    { value: '15K', label: 'Items Recycled', icon: Recycle },
    { value: '500', label: 'Issues Resolved', icon: Award },
    { value: '1.2K', label: 'Items Shared', icon: Share2 }
  ]

  // Array of floating elements
  const floatingElements = [
    { icon: Leaf, color: 'text-primary-400', size: 'h-6 w-6', delay: '0s', duration: '15s' },
    { icon: Recycle, color: 'text-blue-400', size: 'h-8 w-8', delay: '2s', duration: '25s' },
    { icon: Globe, color: 'text-purple-400', size: 'h-10 w-10', delay: '5s', duration: '20s' },
    { icon: TreePine, color: 'text-green-400', size: 'h-7 w-7', delay: '8s', duration: '18s' },
    { icon: Shield, color: 'text-amber-400', size: 'h-5 w-5', delay: '12s', duration: '22s' }
  ];

  return (
    <div className="bg-[#121212] text-gray-200 min-h-screen overflow-x-hidden">
      {/* Navbar */}
      <nav className="border-b border-gray-800 bg-[#1E1E1E] backdrop-blur-sm bg-opacity-80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <div className="relative">
                <div className="absolute -inset-1 rounded-full bg-primary-500 blur opacity-30"></div>
                <TreePine className="h-8 w-8 text-primary-500 relative" />
              </div>
              <span className="ml-2 text-xl font-bold text-white">Ecofy</span>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-4">
                <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors">
                  Features
                </Link>
                <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors">
                  Solutions
                </Link>
                <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors">
                  About Us
                </Link>
                <Link to="/register" className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-800 transition-colors border border-gray-700">
                  Sign Up
                </Link>
                <Link to="/login" className="px-4 py-2 rounded-md text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 transition-colors shadow-lg shadow-primary-900/30">
                  Sign In
                </Link>
              </div>
            </div>
            <div className="block md:hidden">
              <button className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800">
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative isolate overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[#121212]" />
          <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-radial from-primary-500/20 via-transparent to-transparent blur-3xl opacity-20" />
          <div className="absolute bottom-0 right-0 left-0 h-96 bg-gradient-radial from-purple-500/20 via-transparent to-transparent blur-3xl opacity-20" />
          <div className="absolute -top-40 -right-20 h-[500px] w-[500px] rounded-full bg-gradient-to-r from-primary-500/30 to-primary-500/5 blur-3xl opacity-20" />
          
          {/* Floating elements */}
          <div className="absolute inset-0 overflow-hidden">
            {floatingElements.map((element, index) => {
              const Icon = element.icon;
              return (
                <div 
                  key={index}
                  className={`absolute ${element.color} animate-float opacity-20`}
                  style={{ 
                    top: `${Math.random() * 100}%`, 
                    left: `${Math.random() * 100}%`,
                    animationDelay: element.delay,
                    animationDuration: element.duration
                  }}
                >
                  <Icon className={element.size} />
                </div>
              );
            })}
          </div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0" style={{ 
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`, 
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-32 sm:pb-40">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500 pb-2">
              <span className="block">Make Your Lifestyle</span>
              <span className="block text-primary-500">Eco-Friendly</span>
            </h1>
            <p className="mt-6 max-w-lg mx-auto text-lg sm:text-xl text-gray-400">
              Join our community and take action with smart tools to reduce your environmental footprint.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <Link 
                to="/register" 
                className="px-6 py-3 rounded-lg text-white bg-gradient-to-r from-primary-600 to-primary-500 font-medium text-lg shadow-lg shadow-primary-600/20 hover:shadow-primary-600/30 transition-all hover:scale-105"
              >
                Get Started
              </Link>
              <a 
                href="#learn-more"
                className="px-6 py-3 rounded-lg border border-gray-700 font-medium text-lg hover:bg-gray-800 transition-colors"
              >
                Learn More
              </a>
            </div>
            
            {/* Floating arrow indicator */}
            <div className="mt-16 animate-bounce">
              <ArrowUpRight className="h-6 w-6 text-primary-500 transform rotate-90 mx-auto" />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="learn-more" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-block px-3 py-1 rounded-full text-primary-400 bg-primary-900 bg-opacity-30 text-sm font-semibold mb-4">Features</span>
            <h2 className="text-3xl font-bold sm:text-4xl mb-12">One platform, multiple solutions</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index} 
                  className="bg-dark-card rounded-2xl p-6 border border-gray-800 hover:border-primary-500 transition-colors shadow-lg group relative overflow-hidden hover:shadow-primary-500/5"
                >
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity" style={{ 
                    backgroundImage: `linear-gradient(135deg, ${feature.gradient.split(' ')[0].replace('from-', '')} 0%, ${feature.gradient.split(' ')[1].replace('to-', '')} 100%)` 
                  }} />
                  
                  <div className={`inline-flex p-3 rounded-lg mb-5 bg-gradient-to-br ${feature.gradient}`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                  
                  <div className="mt-6 flex items-center justify-end">
                    <Link 
                      to="/register" 
                      className="text-primary-400 hover:text-primary-300 font-medium flex items-center text-sm"
                    >
                      Learn more <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-dark-card bg-opacity-50 border-y border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded-full text-primary-400 bg-primary-900 bg-opacity-30 text-sm font-semibold mb-4">Impact</span>
            <h2 className="text-3xl font-bold sm:text-4xl">Growing community impact</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center p-4 group">
                  <div className="inline-flex p-3 rounded-full bg-dark-300 mb-3 text-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  <p className="text-3xl font-bold text-white">{stat.value}</p>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-gradient-to-br from-dark-300 to-dark-200 p-10 relative overflow-hidden border border-gray-700">
            {/* Background decoration */}
            <div className="absolute inset-0">
              <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-primary-500 opacity-10 blur-3xl"></div>
              <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-purple-500 opacity-10 blur-3xl"></div>
            </div>
            
            <div className="relative z-10 text-center">
              <h2 className="text-3xl font-bold text-white sm:text-4xl mb-6">Ready to make a difference?</h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-10">
                Join thousands of users already reducing their environmental impact and building a more sustainable future.
              </p>
              <Link 
                to="/register" 
                className="inline-block px-8 py-4 rounded-lg text-white bg-gradient-to-r from-primary-600 to-primary-500 font-medium text-lg shadow-lg shadow-primary-600/20 hover:shadow-primary-600/40 transition-all hover:scale-105"
              >
                Join Ecofy Today
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-card border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center">
                <TreePine className="h-6 w-6 text-primary-500" />
                <span className="ml-2 text-lg font-bold text-white">Ecofy</span>
              </div>
              <p className="mt-4 text-sm text-gray-400">
                Building sustainable communities through technology and collaboration.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Product</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-sm text-gray-400 hover:text-gray-300">Features</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-gray-300">Solutions</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-gray-300">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Company</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-sm text-gray-400 hover:text-gray-300">About</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-gray-300">Blog</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-gray-300">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-wider uppercase">Legal</h3>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-sm text-gray-400 hover:text-gray-300">Privacy</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-gray-300">Terms</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-gray-300">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8">
            <p className="text-sm text-gray-400 text-center">© 2025 Ecofy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Home
