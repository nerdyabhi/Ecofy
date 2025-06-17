import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Camera, 
  MapPin, 
  Share, 
  TrendingUp, 
  Award, 
  Leaf, 
  Users,
  Calendar,
  ArrowRight,
  CheckCircle,
  Clock,
  Target
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import useStore from '../stores/useStore';

const Dashboard = () => {
  const { stats, ecoPoints, carbonScore, trustScore, user } = useStore();

  const quickActions = [
    {
      title: 'Add Waste Item',
      description: 'Photograph and categorize waste',
      icon: <Camera className="w-6 h-6" />,
      href: '/app/waste',
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Log Activity',
      description: 'Track your carbon footprint',
      icon: <Plus className="w-6 h-6" />,
      href: '/app/carbon',
      color: 'from-blue-500 to-cyan-600'
    },
    {
      title: 'Report Issue',
      description: 'Help your community',
      icon: <MapPin className="w-6 h-6" />,
      href: '/app/community',
      color: 'from-purple-500 to-violet-600'
    },
    {
      title: 'Share Item',
      description: 'List something to share',
      icon: <Share className="w-6 h-6" />,
      href: '/app/sharing',
      color: 'from-amber-500 to-orange-600'
    }
  ];

  const recentActivities = [
    {
      type: 'waste',
      title: 'Recycled plastic bottles',
      time: '2 hours ago',
      points: '+15 eco-points',
      icon: <CheckCircle className="w-4 h-4 text-green-500" />
    },
    {
      type: 'carbon',
      title: 'Biked to work',
      time: '1 day ago',
      points: '+8 eco-points',
      icon: <CheckCircle className="w-4 h-4 text-blue-500" />
    },
    {
      type: 'community',
      title: 'Reported broken streetlight',
      time: '2 days ago',
      points: '+12 eco-points',
      icon: <Clock className="w-4 h-4 text-purple-500" />
    },
    {
      type: 'sharing',
      title: 'Lent drill to neighbor',
      time: '3 days ago',
      points: '+10 eco-points',
      icon: <CheckCircle className="w-4 h-4 text-amber-500" />
    }
  ];

  const achievements = [
    {
      title: 'Eco Warrior',
      description: 'Reached 1000 eco-points',
      progress: 100,
      unlocked: true
    },
    {
      title: 'Community Helper',
      description: 'Resolved 10 issues',
      progress: 80,
      unlocked: false
    },
    {
      title: 'Carbon Saver',
      description: 'Saved 50kg CO₂',
      progress: 92,
      unlocked: false
    }
  ];

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100">
            Welcome back, {user?.name || 'Eco Warrior'}! 🌱
          </h1>
          <div className="text-right">
            <div className="text-sm text-neutral-500 dark:text-neutral-400">Today</div>
            <div className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'short', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>
        <p className="text-neutral-600 dark:text-neutral-300">
          You're making a real impact! Keep up the great work building a sustainable future.
        </p>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8"
      >        <Card className="p-4 sm:p-6 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200 dark:border-green-800">
          <CardContent className="p-0">
            <div className="flex items-center justify-between mb-2">
              <Leaf className="w-8 h-8 text-green-600 dark:text-green-400" />
              <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300">
                +24 today
              </Badge>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-green-700 dark:text-green-400 mb-1">
              {ecoPoints.toLocaleString()}
            </div>
            <div className="text-sm text-green-600 dark:text-green-400">Eco Points</div>
          </CardContent>
        </Card>

        <Card className="p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border-blue-200 dark:border-blue-800">
          <CardContent className="p-0">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <Badge variant="secondary" className="bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
                -2.1kg today
              </Badge>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-blue-700 dark:text-blue-400 mb-1">
              {carbonScore}kg
            </div>
            <div className="text-sm text-blue-600 dark:text-blue-400">CO₂ Saved</div>
          </CardContent>
        </Card>

        <Card className="p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 border-purple-200 dark:border-purple-800">
          <CardContent className="p-0">
            <div className="flex items-center justify-between mb-2">
              <Users className="w-8 h-8 text-purple-600 dark:text-purple-400" />
              <Badge variant="secondary" className="bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300">
                +2 this week
              </Badge>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-purple-700 dark:text-purple-400 mb-1">
              {stats.issuesResolved}
            </div>
            <div className="text-sm text-purple-600 dark:text-purple-400">Issues Resolved</div>
          </CardContent>
        </Card>

        <Card className="p-4 sm:p-6 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-200 dark:border-amber-800">
          <CardContent className="p-0">
            <div className="flex items-center justify-between mb-2">
              <Award className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              <Badge variant="secondary" className="bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300">
                ⭐ {trustScore}
              </Badge>
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-amber-700 dark:text-amber-400 mb-1">
              {stats.itemsShared}
            </div>
            <div className="text-sm text-amber-600 dark:text-amber-400">Items Shared</div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Quick Actions & Recent Activity */}
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>              <CardHeader>
                <CardTitle className="flex items-center text-neutral-900 dark:text-neutral-100">
                  <Target className="w-5 h-5 mr-2" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <motion.div
                      key={action.title}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      <Link to={action.href}>                        <Card className="p-4 hover:shadow-lg transition-all duration-200 cursor-pointer group bg-white dark:bg-neutral-800">
                          <CardContent className="p-0">
                            <div className="flex items-start space-x-3">
                              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
                                {action.icon}
                              </div>
                              <div className="flex-1">
                                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
                                  {action.title}
                                </h3>
                                <p className="text-sm text-neutral-600 dark:text-neutral-300">
                                  {action.description}
                                </p>
                              </div>
                              <ArrowRight className="w-4 h-4 text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 group-hover:translate-x-1 transition-all" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>              <CardHeader>
                <CardTitle className="flex items-center justify-between text-neutral-900 dark:text-neutral-100">
                  <div className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Recent Activity
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to="/app/profile">View All</Link>
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">                  {recentActivities.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                    >
                      {activity.icon}
                      <div className="flex-1">
                        <div className="font-medium text-neutral-900 dark:text-neutral-100">
                          {activity.title}
                        </div>
                        <div className="text-sm text-neutral-500 dark:text-neutral-400">
                          {activity.time}
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300">
                        {activity.points}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column - Achievements & Goals */}
        <div className="space-y-6">
          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card>              <CardHeader>
                <CardTitle className="flex items-center text-neutral-900 dark:text-neutral-100">
                  <Award className="w-5 h-5 mr-2" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={achievement.title}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                      className="space-y-2"
                    >                      <div className="flex items-center justify-between">
                        <div className="font-medium text-neutral-900 dark:text-neutral-100">
                          {achievement.title}
                        </div>
                        {achievement.unlocked && (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                      <div className="text-sm text-neutral-600 dark:text-neutral-300">
                        {achievement.description}
                      </div>
                      <Progress 
                        value={achievement.progress} 
                        className="h-2"
                      />
                      <div className="text-xs text-neutral-500 dark:text-neutral-400 text-right">
                        {achievement.progress}% complete
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Monthly Goal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Target className="w-5 h-5 mr-2" />
                  Monthly Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm opacity-90 mb-1">Save 20kg CO₂ this month</div>
                    <Progress 
                      value={75} 
                      className="h-3 bg-white/20"
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="opacity-90">15kg saved</span>
                    <span className="opacity-90">5kg remaining</span>
                  </div>
                  <div className="text-xs opacity-75">
                    Great progress! You're ahead of schedule 🎉
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Community Impact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Card>              <CardHeader>
                <CardTitle className="flex items-center text-neutral-900 dark:text-neutral-100">
                  <Users className="w-5 h-5 mr-2" />
                  Community Impact
                </CardTitle>
              </CardHeader><CardContent>
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    Top 15%
                  </div>
                  <div className="text-sm text-neutral-600 dark:text-neutral-300">
                    You're in the top contributors in your area!
                  </div>
                  <Button variant="outline" size="sm" className="mt-3" asChild>
                    <Link to="/app/community">
                      View Leaderboard
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
