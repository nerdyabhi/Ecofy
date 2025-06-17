import React from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Edit, 
  Settings, 
  Award, 
  TrendingUp, 
  Calendar,
  MapPin,
  Mail,
  Phone,
  Bell,
  Shield,
  LogOut,
  Camera,
  Save
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Switch } from '../components/ui/switch';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from 'sonner';
import useStore from '../stores/useStore';

const Profile = () => {
  const { user, ecoPoints, carbonScore, trustScore, stats, logout } = useStore();
  const [isEditing, setIsEditing] = React.useState(false);
  const [profileData, setProfileData] = React.useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    phone: user?.phone || '+1 (555) 123-4567',
    bio: 'Environmental enthusiast passionate about sustainable living and community building.',
    location: 'San Francisco, CA',
    notifications: {
      email: true,
      push: true,
      community: true,
      sharing: true
    }
  });

  const achievements = [
    {
      id: 1,
      title: 'Eco Warrior',
      description: 'Reached 1000 eco-points',
      icon: '🌱',
      unlocked: true,
      progress: 100,
      unlockedDate: '2025-06-10'
    },
    {
      id: 2,
      title: 'Community Helper',
      description: 'Resolved 10 community issues',
      icon: '🤝',
      unlocked: true,
      progress: 100,
      unlockedDate: '2025-06-05'
    },
    {
      id: 3,
      title: 'Carbon Saver',
      description: 'Saved 50kg of CO₂',
      icon: '♻️',
      unlocked: false,
      progress: 92,
      target: 50,
      current: 46
    },
    {
      id: 4,
      title: 'Sharing Champion',
      description: 'Shared 20 items with neighbors',
      icon: '🤝',
      unlocked: false,
      progress: 40,
      target: 20,
      current: 8
    },
    {
      id: 5,
      title: 'Recycling Master',
      description: 'Recycled 100kg of waste',
      icon: '♻️',
      unlocked: false,
      progress: 75,
      target: 100,
      current: 75
    },
    {
      id: 6,
      title: 'Monthly Streak',
      description: 'Active for 30 consecutive days',
      icon: '🔥',
      unlocked: false,
      progress: 67,
      target: 30,
      current: 20
    }
  ];

  const activityHistory = [
    {
      date: '2025-06-16',
      type: 'waste',
      description: 'Recycled plastic bottles',
      points: '+15 eco-points',
      impact: '-2.1kg CO₂'
    },
    {
      date: '2025-06-15',
      type: 'community',
      description: 'Reported broken streetlight',
      points: '+12 eco-points',
      impact: 'Community improvement'
    },
    {
      date: '2025-06-14',
      type: 'sharing',
      description: 'Lent drill to neighbor',
      points: '+10 eco-points',
      impact: 'Resource sharing'
    },
    {
      date: '2025-06-13',
      type: 'carbon',
      description: 'Biked to work',
      points: '+8 eco-points',
      impact: '-1.5kg CO₂'
    }
  ];

  const handleSaveProfile = () => {
    // Simulate API call
    setTimeout(() => {
      setIsEditing(false);
      toast.success('Profile updated successfully! 👤');
    }, 500);
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully! 👋');
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">
              Profile
            </h1>
            <p className="text-neutral-600">
              Manage your account and view your sustainability journey
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-1">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="mb-6">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="relative inline-block">
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                      <AvatarFallback className="text-2xl bg-green-500 text-white">
                        {profileData.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <Button 
                      size="sm" 
                      className="absolute bottom-0 right-0 rounded-full w-8 h-8 p-0"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  </div>
                  <h2 className="text-xl font-semibold text-neutral-900 mb-1">
                    {profileData.name}
                  </h2>
                  <p className="text-neutral-600 text-sm mb-4">
                    {profileData.bio}
                  </p>
                  <div className="flex items-center justify-center gap-1 text-sm text-neutral-500">
                    <MapPin className="w-4 h-4" />
                    {profileData.location}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{ecoPoints}</div>
                    <div className="text-xs text-green-600">Eco Points</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{trustScore}</div>
                    <div className="text-xs text-blue-600">Trust Score</div>
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Impact Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Impact Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">CO₂ Saved</span>
                    <span className="font-semibold text-green-600">{carbonScore}kg</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">Waste Recycled</span>
                    <span className="font-semibold text-blue-600">{stats.wasteRecycled}kg</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">Issues Resolved</span>
                    <span className="font-semibold text-purple-600">{stats.issuesResolved}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-neutral-600">Items Shared</span>
                    <span className="font-semibold text-amber-600">{stats.itemsShared}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column - Tabbed Content */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                {isEditing ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Edit Profile</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={profileData.name}
                            onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={profileData.email}
                            onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input
                            id="phone"
                            value={profileData.phone}
                            onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="location">Location</Label>
                          <Input
                            id="location"
                            value={profileData.location}
                            onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={profileData.bio}
                          onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                        />
                      </div>
                      
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                          Cancel
                        </Button>
                        <Button onClick={handleSaveProfile}>
                          <Save className="w-4 h-4 mr-2" />
                          Save Changes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <>
                    {/* Stats Overview */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                        <CardContent className="p-0 text-center">
                          <div className="text-2xl font-bold text-green-600 mb-1">
                            {stats.totalEcoPoints}
                          </div>
                          <div className="text-sm text-green-600">Total Eco Points</div>
                        </CardContent>
                      </Card>
                      
                      <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
                        <CardContent className="p-0 text-center">
                          <div className="text-2xl font-bold text-blue-600 mb-1">
                            {stats.carbonSaved}kg
                          </div>
                          <div className="text-sm text-blue-600">CO₂ Saved</div>
                        </CardContent>
                      </Card>
                      
                      <Card className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
                        <CardContent className="p-0 text-center">
                          <div className="text-2xl font-bold text-purple-600 mb-1">
                            {stats.issuesResolved}
                          </div>
                          <div className="text-sm text-purple-600">Issues Resolved</div>
                        </CardContent>
                      </Card>
                      
                      <Card className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
                        <CardContent className="p-0 text-center">
                          <div className="text-2xl font-bold text-amber-600 mb-1">
                            {stats.itemsShared}
                          </div>
                          <div className="text-sm text-amber-600">Items Shared</div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Contact Information */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Contact Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <Mail className="w-5 h-5 text-neutral-400" />
                          <span>{profileData.email}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Phone className="w-5 h-5 text-neutral-400" />
                          <span>{profileData.phone}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <MapPin className="w-5 h-5 text-neutral-400" />
                          <span>{profileData.location}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </>
                )}
              </TabsContent>

              {/* Achievements Tab */}
              <TabsContent value="achievements">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="w-5 h-5 mr-2" />
                      Achievements
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {achievements.map((achievement, index) => (
                        <motion.div
                          key={achievement.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`p-4 border rounded-lg ${
                            achievement.unlocked 
                              ? 'bg-green-50 border-green-200' 
                              : 'bg-neutral-50 border-neutral-200'
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="text-2xl">{achievement.icon}</div>
                            <div className="flex-1">
                              <h4 className={`font-semibold ${
                                achievement.unlocked ? 'text-green-800' : 'text-neutral-800'
                              }`}>
                                {achievement.title}
                              </h4>
                              <p className={`text-sm ${
                                achievement.unlocked ? 'text-green-600' : 'text-neutral-600'
                              }`}>
                                {achievement.description}
                              </p>
                              
                              {achievement.unlocked ? (
                                <div className="mt-2">
                                  <Badge className="bg-green-100 text-green-700">
                                    Unlocked {new Date(achievement.unlockedDate).toLocaleDateString()}
                                  </Badge>
                                </div>
                              ) : (
                                <div className="mt-2 space-y-1">
                                  <Progress value={achievement.progress} className="h-2" />
                                  <div className="text-xs text-neutral-500">
                                    {achievement.current}/{achievement.target} ({achievement.progress}%)
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Activity Tab */}
              <TabsContent value="activity">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {activityHistory.map((activity, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center space-x-4 p-3 bg-neutral-50 rounded-lg"
                        >
                          <div className="text-sm text-neutral-500 min-w-[80px]">
                            {new Date(activity.date).toLocaleDateString()}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-neutral-900">
                              {activity.description}
                            </div>
                            <div className="text-sm text-neutral-600">
                              {activity.impact}
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-700">
                            {activity.points}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Bell className="w-5 h-5 mr-2" />
                        Notification Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-notifications">Email Notifications</Label>
                          <p className="text-sm text-neutral-600">Receive updates via email</p>
                        </div>
                        <Switch
                          id="email-notifications"
                          checked={profileData.notifications.email}
                          onCheckedChange={(checked) => 
                            setProfileData({
                              ...profileData,
                              notifications: { ...profileData.notifications, email: checked }
                            })
                          }
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="push-notifications">Push Notifications</Label>
                          <p className="text-sm text-neutral-600">Receive push notifications on your device</p>
                        </div>
                        <Switch
                          id="push-notifications"
                          checked={profileData.notifications.push}
                          onCheckedChange={(checked) => 
                            setProfileData({
                              ...profileData,
                              notifications: { ...profileData.notifications, push: checked }
                            })
                          }
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="community-notifications">Community Updates</Label>
                          <p className="text-sm text-neutral-600">Get notified about community issues and updates</p>
                        </div>
                        <Switch
                          id="community-notifications"
                          checked={profileData.notifications.community}
                          onCheckedChange={(checked) => 
                            setProfileData({
                              ...profileData,
                              notifications: { ...profileData.notifications, community: checked }
                            })
                          }
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="sharing-notifications">Sharing Requests</Label>
                          <p className="text-sm text-neutral-600">Get notified when someone requests your items</p>
                        </div>
                        <Switch
                          id="sharing-notifications"
                          checked={profileData.notifications.sharing}
                          onCheckedChange={(checked) => 
                            setProfileData({
                              ...profileData,
                              notifications: { ...profileData.notifications, sharing: checked }
                            })
                          }
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Shield className="w-5 h-5 mr-2" />
                        Privacy & Security
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline" className="w-full justify-start">
                        Change Password
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Privacy Settings
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Data Export
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        Delete Account
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
