import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Leaf, Mail, Lock, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner';
import ThemeToggle from '../components/ThemeToggle';
import useStore from '../stores/useStore';

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useStore();
  const [isLoading, setIsLoading] = React.useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const mockUser = {
        id: '1',
        name: 'John Doe',
        email: data.email,
        profileImage: null
      };
      
      setUser(mockUser);
      toast.success('Welcome back! 🌱');
      navigate('/app');
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex bg-neutral-50 dark:bg-neutral-900">
      {/* Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      {/* Left side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center mb-6">
              <Leaf className="w-8 h-8 text-green-500 mr-2" />
              <span className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">Ecofy</span>
            </Link>
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
              Welcome back!
            </h1>
            <p className="text-neutral-600 dark:text-neutral-300">
              Sign in to continue your sustainability journey
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="pl-10"
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      className="pl-10"
                      {...register('password', {
                        required: 'Password is required',
                        minLength: {
                          value: 6,
                          message: 'Password must be at least 6 characters',
                        },
                      })}
                    />
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-600">{errors.password.message}</p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <input
                      id="remember"
                      type="checkbox"
                      className="rounded border-neutral-300 text-green-600 focus:ring-green-500"
                    />
                    <Label htmlFor="remember" className="text-sm text-neutral-600">
                      Remember me
                    </Label>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-green-600 hover:text-green-700"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    'Signing in...'
                  ) : (
                    <>
                      Sign In <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-neutral-600">
                  Don't have an account?{' '}
                  <Link
                    to="/register"
                    className="font-medium text-green-600 hover:text-green-700"
                  >
                    Sign up for free
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Demo Account Info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200"
          >
            <h3 className="font-medium text-green-800 mb-2">Demo Account</h3>
            <p className="text-sm text-green-700 mb-2">
              Use any email and password to explore the platform
            </p>
            <div className="text-xs text-green-600">
              Example: demo@ecofy.com / password123
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Right side - Background Image/Illustration */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-green-400 via-emerald-500 to-teal-600 items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center text-white"
        >
          <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <Leaf className="w-16 h-16" />
          </div>
          <h2 className="text-4xl font-bold mb-4">
            Join the Green Revolution
          </h2>
          <p className="text-xl opacity-90 max-w-md">
            Connect with your community, track your impact, and build a 
            sustainable future together.
          </p>
          <div className="mt-8 flex justify-center space-x-8 text-sm">
            <div className="text-center">
              <div className="font-bold text-2xl">12K+</div>
              <div className="opacity-75">Active Users</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl">234T</div>
              <div className="opacity-75">CO₂ Saved</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-2xl">1.8K</div>
              <div className="opacity-75">Issues Resolved</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
