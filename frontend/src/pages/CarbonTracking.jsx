import React, { useState } from 'react'
import {
  TreePine,
  Car,
  Home,
  Utensils,
  Plus,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
  Calendar,
  ArrowRight
} from 'lucide-react'

const CarbonTracking = () => {
  const [showAddActivity, setShowAddActivity] = useState(false)
  const [timeframe, setTimeframe] = useState('week')

  const categories = [
    { id: 'transport', name: 'Transport', icon: Car },
    { id: 'home', name: 'Home', icon: Home },
    { id: 'food', name: 'Food', icon: Utensils }
  ]

  const activities = [
    {
      id: 1,
      type: 'transport',
      activity: 'Bicycle Commute',
      impact: '-2.5',
      date: '2025-06-16',
      points: 50,
      icon: Car,
      color: 'bg-green-500 bg-opacity-20 text-green-400'
    },
    {
      id: 2,
      type: 'home',
      activity: 'Solar Panel Usage',
      impact: '-5.8',
      date: '2025-06-15',
      points: 100,
      icon: Home,
      color: 'bg-blue-500 bg-opacity-20 text-blue-400'
    },
    {
      id: 3,
      type: 'food',
      activity: 'Local Food Purchase',
      impact: '-1.2',
      date: '2025-06-14',
      points: 30,
      icon: Utensils,
      color: 'bg-amber-500 bg-opacity-20 text-amber-400'
    }
  ]

  const metrics = {
    totalReduction: {
      value: '156.2',
      unit: 'kg CO2',
      trend: 'up',
      change: '12%'
    },
    weeklyGoal: {
      value: '75',
      unit: '%',
      target: '80%'
    },
    greenActivities: {
      value: '28',
      trend: 'up',
      change: '8%'
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-dark-card rounded-xl shadow-md p-6 border border-dark-300 bg-gradient-to-r from-dark-card to-dark-300">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-100">Carbon Tracking</h1>
            <p className="mt-1 text-gray-400">
              Track and reduce your carbon footprint
            </p>
          </div>
          <button
            onClick={() => setShowAddActivity(true)}
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-lg"
          >
            <Plus className="h-5 w-5 mr-2" />
            Log Activity
          </button>
        </div>
      </div>

      {/* Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Carbon Reduction */}
        <div className="bg-dark-card rounded-xl shadow-md p-6 border border-dark-300 hover:border-primary-500 transition-colors">
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-green-500 bg-opacity-20">
              <TreePine className="h-6 w-6 text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">
                Carbon Reduction
              </p>
              <div className="flex items-center">
                <p className="text-2xl font-semibold text-gray-200">
                  {metrics.totalReduction.value}
                </p>
                <span className="ml-2 text-sm text-gray-400">
                  {metrics.totalReduction.unit}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {metrics.totalReduction.trend === 'up' ? (
              <ArrowUpRight className="h-4 w-4 text-green-400" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-red-400" />
            )}
            <span className={`ml-1 text-sm ${
              metrics.totalReduction.trend === 'up'
                ? 'text-green-400'
                : 'text-red-400'
            }`}>
              {metrics.totalReduction.change} from last {timeframe}
            </span>
          </div>
        </div>

        {/* Weekly Goal Progress */}
        <div className="bg-dark-card rounded-xl shadow-md p-6 border border-dark-300 hover:border-primary-500 transition-colors">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-gray-400">Weekly Goal</p>
            <span className="text-sm text-gray-400">
              Target: {metrics.weeklyGoal.target}
            </span>
          </div>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-2xl font-semibold inline-block text-gray-200">
                  {metrics.weeklyGoal.value}%
                </span>
              </div>
            </div>
            <div className="flex h-2 mb-4 overflow-hidden bg-dark-400 rounded-full">
              <div
                style={{ width: `${metrics.weeklyGoal.value}%` }}
                className="flex flex-col justify-center rounded-full bg-primary-600"
              />
            </div>
          </div>
        </div>

        {/* Green Activities */}
        <div className="bg-dark-card rounded-xl shadow-md p-6 border border-dark-300 hover:border-primary-500 transition-colors">
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-primary-500 bg-opacity-20">
              <TreePine className="h-6 w-6 text-primary-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">
                Green Activities
              </p>
              <p className="text-2xl font-semibold text-gray-200">
                {metrics.greenActivities.value}
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {metrics.greenActivities.trend === 'up' ? (
              <ArrowUpRight className="h-4 w-4 text-green-400" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-red-400" />
            )}
            <span className={`ml-1 text-sm ${
              metrics.greenActivities.trend === 'up'
                ? 'text-green-400'
                : 'text-red-400'
            }`}>
              {metrics.greenActivities.change} from last {timeframe}
            </span>
          </div>
        </div>
      </div>

      {/* Activities List */}
      <div className="bg-dark-card rounded-xl shadow-md p-6 border border-dark-300">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 mb-6">
          <h2 className="text-lg font-semibold text-gray-200">Recent Activities</h2>
          <div className="flex space-x-4">
            {/* Category Filter */}
            <div className="relative">
              <button className="inline-flex items-center px-4 py-2 border border-dark-400 rounded-lg bg-dark-300 text-gray-300 hover:bg-dark-400 transition-colors">
                <Filter className="h-5 w-5 mr-2" />
                Filter
                <ChevronDown className="ml-2 h-4 w-4" />
              </button>
            </div>

            {/* Time Filter */}
            <div className="relative">
              <button className="inline-flex items-center px-4 py-2 border border-dark-400 rounded-lg bg-dark-300 text-gray-300 hover:bg-dark-400 transition-colors">
                <Calendar className="h-5 w-5 mr-2" />
                This {timeframe}
                <ChevronDown className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div 
                key={activity.id}
                className="flex items-center p-4 rounded-lg border border-dark-400 bg-dark-300 hover:border-primary-500 transition-colors"
              >
                <div className={`p-3 rounded-full ${activity.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="font-medium text-gray-200">{activity.activity}</h3>
                  <p className="text-sm text-gray-400">{activity.date}</p>
                </div>
                <div className="text-center px-4">
                  <p className="text-green-400 font-semibold">{activity.impact}</p>
                  <p className="text-xs text-gray-400">kg CO2</p>
                </div>
                <div className="text-center px-4 border-l border-dark-400">
                  <p className="text-primary-400 font-semibold">+{activity.points}</p>
                  <p className="text-xs text-gray-400">points</p>
                </div>
                <button className="p-2 ml-4 rounded-lg hover:bg-dark-400 text-gray-400 transition-colors">
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-6 text-center">
          <button className="inline-flex items-center px-4 py-2 border border-dark-400 rounded-lg bg-dark-300 text-gray-300 hover:bg-dark-400 transition-colors">
            View All Activities
          </button>
        </div>
      </div>

      {/* Add Activity Modal Placeholder */}
      {showAddActivity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-dark-card rounded-xl p-6 max-w-md w-full shadow-xl border border-dark-300">
            <h2 className="text-xl font-bold text-gray-200 mb-4">Log New Activity</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                {categories.map((category) => {
                  const CategoryIcon = category.icon;
                  return (
                    <button 
                      key={category.id}
                      className="flex flex-col items-center justify-center p-4 rounded-lg bg-dark-300 border border-dark-400 hover:border-primary-500 transition-colors"
                    >
                      <CategoryIcon className="h-8 w-8 text-gray-300 mb-2" />
                      <span className="text-sm text-gray-300">{category.name}</span>
                    </button>
                  );
                })}
              </div>
              
              <div className="flex justify-end space-x-4 pt-4 border-t border-dark-400">
                <button 
                  onClick={() => setShowAddActivity(false)}
                  className="px-4 py-2 border border-dark-400 rounded-lg text-gray-300 hover:bg-dark-400 transition-colors"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CarbonTracking