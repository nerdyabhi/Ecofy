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
  Award
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
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-900 transition-colors duration-200">
      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen bg-transparent flex items-center justify-center overflow-hidden">
      <BackgroundGrid />

        <div className="relative z-10 w-full">
          <BackgroundBeamsWithCollision>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center bg-transparent">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center bg-green-100/80 backdrop-blur-sm dark:bg-green-900/80 text-green-800 dark:text-green-100 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-md">
                  <Leaf className="w-4 h-4 mr-2" />
                  Building Sustainable Communities Together
                </div>
                
                
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-neutral-800 dark:text-neutral-100 mb-6">
                  Transform Your
                  <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                    {' '}Community
                  </span>
                  <br />
                  Into a Sustainable Future
                </h1>
                
                <p className="text-xl sm:text-2xl text-neutral-600 dark:text-neutral-300 mb-8 max-w-3xl mx-auto">
                  Join thousands of citizens making real environmental impact through smart waste management, 
                  carbon tracking, community reporting, and resource sharing.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white border-0 px-8 py-4 text-lg">
                    <Link to="/register">
                      Start Your Journey <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-neutral-700 dark:border-neutral-300 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-700 hover:text-white dark:hover:bg-neutral-200 dark:hover:text-neutral-800 px-8 py-4 text-lg">
                    <Link to="/login">
                      Sign In
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>          </BackgroundBeamsWithCollision>
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
      <section className="py-20 bg-white dark:bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-5xl font-bold text-neutral-900 dark:text-neutral-100 mb-6">
              One Platform, Four Solutions
            </h2>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
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
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-950/30 dark:to-emerald-950/30">
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
