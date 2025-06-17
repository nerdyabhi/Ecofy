import React from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  TrendingDown, 
  TrendingUp, 
  Car, 
  Zap, 
  Utensils, 
  Home,
  Target,
  Award,
  Calendar,
  BarChart3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { toast } from 'sonner';
import useStore from '../stores/useStore';

const CarbonTracker = () => {
  const { activities, addActivity } = useStore();
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [newActivity, setNewActivity] = React.useState({
    type: '',
    description: '',
    value: '',
    unit: ''
  });

  const activityTypes = [
    { 
      value: 'transport', 
      label: 'Transportation', 
      icon: <Car className="w-4 h-4" />,
      color: 'from-blue-500 to-cyan-600',
      units: [
        { value: 'km', label: 'Kilometers' },
        { value: 'miles', label: 'Miles' }
      ]
    },
    { 
      value: 'electricity', 
      label: 'Electricity', 
      icon: <Zap className="w-4 h-4" />,
      color: 'from-yellow-500 to-orange-600',
      units: [
        { value: 'kwh', label: 'kWh' },
        { value: 'hours', label: 'Hours' }
      ]
    },
    { 
      value: 'food', 
      label: 'Food Consumption', 
      icon: <Utensils className="w-4 h-4" />,
      color: 'from-green-500 to-emerald-600',
      units: [
        { value: 'meals', label: 'Meals' },
        { value: 'kg', label: 'Kilograms' }
      ]
    },
    { 
      value: 'heating', 
      label: 'Home Heating', 
      icon: <Home className="w-4 h-4" />,
      color: 'from-red-500 to-pink-600',
      units: [
        { value: 'hours', label: 'Hours' },
        { value: 'therms', label: 'Therms' }
      ]
    }
  ];

  // Mock data for charts
  const weeklyData = [
    { day: 'Mon', emissions: 12.4, saved: 2.1 },
    { day: 'Tue', emissions: 8.7, saved: 4.3 },
    { day: 'Wed', emissions: 15.2, saved: 1.8 },
    { day: 'Thu', emissions: 6.9, saved: 5.2 },
    { day: 'Fri', emissions: 11.3, saved: 3.6 },
    { day: 'Sat', emissions: 4.2, saved: 7.8 },
    { day: 'Sun', emissions: 3.8, saved: 6.4 }
  ];

  const monthlyTrends = [
    { month: 'Jan', emissions: 285 },
    { month: 'Feb', emissions: 267 },
    { month: 'Mar', emissions: 243 },
    { month: 'Apr', emissions: 221 },
    { month: 'May', emissions: 198 },
    { month: 'Jun', emissions: 176 }
  ];

  const emissionsByCategory = [
    { name: 'Transportation', value: 35, color: '#3B82F6' },
    { name: 'Electricity', value: 28, color: '#F59E0B' },
    { name: 'Food', value: 22, color: '#10B981' },
    { name: 'Heating', value: 15, color: '#EF4444' }
  ];

  const recentActivities = [
    {
      type: 'transport',
      description: 'Biked to work',
      impact: -2.4,
      date: '2 hours ago',
      icon: <Car className="w-4 h-4" />
    },
    {
      type: 'electricity',
      description: 'Used LED lights',
      impact: -0.8,
      date: '5 hours ago',
      icon: <Zap className="w-4 h-4" />
    },
    {
      type: 'food',
      description: 'Vegetarian lunch',
      impact: -1.2,
      date: '1 day ago',
      icon: <Utensils className="w-4 h-4" />
    },
    {
      type: 'heating',
      description: 'Lowered thermostat',
      impact: -3.1,
      date: '2 days ago',
      icon: <Home className="w-4 h-4" />
    }
  ];

  const recommendations = [
    {
      title: 'Switch to Public Transport',
      description: 'Could save 15kg CO₂ per week',
      impact: 'High',
      difficulty: 'Easy'
    },
    {
      title: 'Use Energy-Efficient Appliances',
      description: 'Could save 8kg CO₂ per month',
      impact: 'Medium',
      difficulty: 'Medium'
    },
    {
      title: 'Reduce Meat Consumption',
      description: 'Could save 12kg CO₂ per week',
      impact: 'High',
      difficulty: 'Medium'
    }
  ];

  const handleAddActivity = () => {
    if (!newActivity.type || !newActivity.description || !newActivity.value) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Mock carbon calculation
    const mockEmissionFactors = {
      transport: 0.2, // kg CO2 per km
      electricity: 0.5, // kg CO2 per kWh
      food: 2.5, // kg CO2 per meal
      heating: 1.8 // kg CO2 per hour
    };

    const carbonImpact = parseFloat(newActivity.value) * mockEmissionFactors[newActivity.type];

    const activity = {
      type: newActivity.type,
      description: newActivity.description,
      value: parseFloat(newActivity.value),
      unit: newActivity.unit,
      carbonImpact: carbonImpact,
      date: new Date().toISOString(),
    };

    addActivity(activity);
    toast.success('Activity logged successfully! 📊');
    setIsAddDialogOpen(false);
    setNewActivity({
      type: '',
      description: '',
      value: '',
      unit: ''
    });
  };

  const selectedActivityType = activityTypes.find(type => type.value === newActivity.type);

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
              Carbon Footprint Tracker
            </h1>
            <p className="text-neutral-600">
              Monitor and reduce your environmental impact daily
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700">
                <Plus className="w-4 h-4 mr-2" />
                Log Activity
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Log Carbon Activity</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Activity Type *</Label>
                  <Select onValueChange={(value) => setNewActivity({...newActivity, type: value, unit: ''})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select activity type" />
                    </SelectTrigger>
                    <SelectContent>
                      {activityTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center">
                            {type.icon}
                            <span className="ml-2">{type.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Input
                    id="description"
                    placeholder="e.g., Drove to work, Used air conditioning"
                    value={newActivity.description}
                    onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="value">Value *</Label>
                    <Input
                      id="value"
                      type="number"
                      step="0.1"
                      placeholder="0.0"
                      value={newActivity.value}
                      onChange={(e) => setNewActivity({...newActivity, value: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="unit">Unit *</Label>
                    <Select 
                      value={newActivity.unit}
                      onValueChange={(value) => setNewActivity({...newActivity, unit: value})}
                      disabled={!selectedActivityType}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent>
                        {selectedActivityType?.units.map((unit) => (
                          <SelectItem key={unit.value} value={unit.value}>
                            {unit.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddActivity}>
                    Log Activity
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
      >
        <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-0">
            <div className="flex items-center justify-between mb-2">
              <TrendingDown className="w-8 h-8 text-green-600" />
              <Badge className="bg-green-100 text-green-700">
                -12% this week
              </Badge>
            </div>
            <div className="text-2xl font-bold text-green-700 mb-1">
              45.8kg
            </div>
            <div className="text-sm text-green-600">CO₂ Saved</div>
          </CardContent>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <CardContent className="p-0">
            <div className="flex items-center justify-between mb-2">
              <BarChart3 className="w-8 h-8 text-blue-600" />
              <Badge className="bg-blue-100 text-blue-700">
                Today: 8.4kg
              </Badge>
            </div>
            <div className="text-2xl font-bold text-blue-700 mb-1">
              176kg
            </div>
            <div className="text-sm text-blue-600">Monthly Emissions</div>
          </CardContent>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <CardContent className="p-0">
            <div className="flex items-center justify-between mb-2">
              <Target className="w-8 h-8 text-purple-600" />
              <Badge className="bg-purple-100 text-purple-700">
                On track
              </Badge>
            </div>
            <div className="text-2xl font-bold text-purple-700 mb-1">
              75%
            </div>
            <div className="text-sm text-purple-600">Goal Progress</div>
          </CardContent>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200">
          <CardContent className="p-0">
            <div className="flex items-center justify-between mb-2">
              <Award className="w-8 h-8 text-amber-600" />
              <Badge className="bg-amber-100 text-amber-700">
                +15 today
              </Badge>
            </div>
            <div className="text-2xl font-bold text-amber-700 mb-1">
              28
            </div>
            <div className="text-sm text-amber-600">Logged Activities</div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Charts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Weekly Emissions Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Weekly Carbon Footprint</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="emissions" 
                      stroke="#EF4444" 
                      strokeWidth={2}
                      name="Emissions (kg CO₂)"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="saved" 
                      stroke="#10B981" 
                      strokeWidth={2}
                      name="Saved (kg CO₂)"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Monthly Trends */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Monthly Emission Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="emissions" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Emissions by Category */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Emissions by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={emissionsByCategory}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name} ${value}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {emissionsByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column - Activities & Recommendations */}
        <div className="space-y-6">
          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Recent Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-center space-x-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors"
                    >
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${activityTypes.find(t => t.value === activity.type)?.color || 'from-gray-400 to-gray-500'} text-white`}>
                        {activity.icon}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-neutral-900">
                          {activity.description}
                        </div>
                        <div className="text-sm text-neutral-500">
                          {activity.date}
                        </div>
                      </div>
                      <Badge 
                        className={activity.impact < 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
                      >
                        {activity.impact < 0 ? '' : '+'}{activity.impact}kg CO₂
                      </Badge>
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
            transition={{ delay: 0.7 }}
          >
            <Card className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Target className="w-5 h-5 mr-2" />
                  Monthly Goal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm opacity-90 mb-1">Reduce emissions by 20%</div>
                    <Progress 
                      value={75} 
                      className="h-3 bg-white/20"
                    />
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="opacity-90">15% achieved</span>
                    <span className="opacity-90">5% remaining</span>
                  </div>
                  <div className="text-xs opacity-75">
                    Great progress! Keep up the sustainable habits 🌱
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingDown className="w-5 h-5 mr-2" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendations.map((rec, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      className="p-3 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-neutral-900">{rec.title}</h4>
                        <div className="flex gap-1">
                          <Badge 
                            variant="outline" 
                            className={rec.impact === 'High' ? 'border-green-500 text-green-700' : 'border-yellow-500 text-yellow-700'}
                          >
                            {rec.impact}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-neutral-600 mb-2">{rec.description}</p>
                      <div className="text-xs text-neutral-500">
                        Difficulty: {rec.difficulty}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CarbonTracker;
