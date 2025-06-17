import React, { useState } from 'react'
import {
  TrendingUp,
  Users,
  Recycle,
  TreePine,
  Share2,
  Calendar,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell
} from 'recharts'

const Analytics = () => {
  const [timeframe, setTimeframe] = useState('month')

  // Placeholder data - would come from API
  const metrics = {
    totalImpact: {
      value: '2.8',
      unit: 'tons CO2',
      trend: 'up',
      change: '12%'
    },
    communityGrowth: {
      value: '156',
      unit: 'members',
      trend: 'up',
      change: '8%'
    },
    wasteRecycled: {
      value: '324',
      unit: 'kg',
      trend: 'up',
      change: '15%'
    },
    itemsShared: {
      value: '48',
      unit: 'items',
      trend: 'down',
      change: '3%'
    }
  }

  const impactBreakdown = [
    { category: 'Transport', percentage: 35 },
    { category: 'Waste', percentage: 25 },
    { category: 'Energy', percentage: 20 },
    { category: 'Food', percentage: 15 },
    { category: 'Other', percentage: 5 }
  ]

  const topContributors = [
    { name: 'Sarah Wilson', points: 1250, impact: '0.5 tons CO2' },
    { name: 'Mike Chen', points: 980, impact: '0.4 tons CO2' },
    { name: 'Emma Davis', points: 870, impact: '0.35 tons CO2' }
  ]

  // Chart data
  const monthlyData = [
    { name: 'Jan', emissions: 65, waste: 120, sharing: 15 },
    { name: 'Feb', emissions: 59, waste: 110, sharing: 18 },
    { name: 'Mar', emissions: 80, waste: 145, sharing: 22 },
    { name: 'Apr', emissions: 81, waste: 132, sharing: 25 },
    { name: 'May', emissions: 56, waste: 142, sharing: 20 },
    { name: 'Jun', emissions: 55, waste: 130, sharing: 28 },
  ]

  const pieChartData = impactBreakdown.map(item => ({
    name: item.category,
    value: item.percentage
  }))

  const COLORS = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6']
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-dark-200 p-3 border border-gray-700 rounded-md shadow-lg">
          <p className="text-gray-200 font-medium">{`${label}`}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-gray-200" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };
  return (
    <div className="space-y-6 bg-dark-bg min-h-screen p-6 text-white">
      {/* Page Header */}
      <div className="bg-dark-card rounded-xl shadow-md p-6 border border-gray-800">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-white">Analytics</h1>
            <p className="mt-1 text-gray-400">
              Track your environmental impact and community growth
            </p>
          </div>
          <div className="relative">
            <button className="inline-flex items-center px-4 py-2 border border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-dark-200 hover:bg-dark-300 transition-colors">
              <Calendar className="h-4 w-4 mr-2" />
              {timeframe === 'month' ? 'This Month' : 'This Year'}
              <ChevronDown className="h-4 w-4 ml-2" />
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Impact */}
        <div className="bg-dark-card rounded-xl shadow-md p-6 border border-gray-800">
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-primary-500/20">
              <TrendingUp className="h-6 w-6 text-primary-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Total Impact</p>
              <div className="flex items-center">
                <p className="text-2xl font-semibold text-white">
                  {metrics.totalImpact.value}
                </p>
                <span className="ml-2 text-sm text-gray-400">
                  {metrics.totalImpact.unit}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {metrics.totalImpact.trend === 'up' ? (
              <ArrowUpRight className="h-4 w-4 text-primary-500" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-red-500" />
            )}
            <span className={`ml-1 text-sm ${
              metrics.totalImpact.trend === 'up' 
                ? 'text-primary-500' 
                : 'text-red-500'
            }`}>
              {metrics.totalImpact.change}
            </span>
          </div>
        </div>        {/* Community Growth */}
        <div className="bg-dark-card rounded-xl shadow-md p-6 border border-gray-800">
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <Users className="h-6 w-6 text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Community</p>
              <div className="flex items-center">
                <p className="text-2xl font-semibold text-white">
                  {metrics.communityGrowth.value}
                </p>
                <span className="ml-2 text-sm text-gray-400">
                  {metrics.communityGrowth.unit}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {metrics.communityGrowth.trend === 'up' ? (
              <ArrowUpRight className="h-4 w-4 text-primary-500" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-red-500" />
            )}
            <span className={`ml-1 text-sm ${
              metrics.communityGrowth.trend === 'up'
                ? 'text-primary-500'
                : 'text-red-500'
            }`}>
              {metrics.communityGrowth.change}
            </span>
          </div>
        </div>        {/* Waste Recycled */}
        <div className="bg-dark-card rounded-xl shadow-md p-6 border border-gray-800">
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-blue-500/20">
              <Recycle className="h-6 w-6 text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Waste Recycled</p>
              <div className="flex items-center">
                <p className="text-2xl font-semibold text-white">
                  {metrics.wasteRecycled.value}
                </p>
                <span className="ml-2 text-sm text-gray-400">
                  {metrics.wasteRecycled.unit}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {metrics.wasteRecycled.trend === 'up' ? (
              <ArrowUpRight className="h-4 w-4 text-primary-500" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-red-500" />
            )}
            <span className={`ml-1 text-sm ${
              metrics.wasteRecycled.trend === 'up'
                ? 'text-primary-500'
                : 'text-red-500'
            }`}>
              {metrics.wasteRecycled.change}
            </span>
          </div>
        </div>        {/* Items Shared */}
        <div className="bg-dark-card rounded-xl shadow-md p-6 border border-gray-800">
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-amber-500/20">
              <Share2 className="h-6 w-6 text-amber-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Items Shared</p>
              <div className="flex items-center">
                <p className="text-2xl font-semibold text-white">
                  {metrics.itemsShared.value}
                </p>
                <span className="ml-2 text-sm text-gray-400">
                  {metrics.itemsShared.unit}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            {metrics.itemsShared.trend === 'up' ? (
              <ArrowUpRight className="h-4 w-4 text-primary-500" />
            ) : (
              <ArrowDownRight className="h-4 w-4 text-red-500" />
            )}
            <span className={`ml-1 text-sm ${
              metrics.itemsShared.trend === 'up'
                ? 'text-primary-500'
                : 'text-red-500'
            }`}>
              {metrics.itemsShared.change}
            </span>
          </div>
        </div>
      </div>      {/* Charts Section */}
      <div className="bg-dark-card rounded-xl shadow-md p-6 border border-gray-800">
        <h2 className="text-lg font-semibold text-white mb-6">Monthly Trends</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={monthlyData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="#E5E7EB" />
              <YAxis stroke="#E5E7EB" />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: '#E5E7EB' }} />
              <Bar dataKey="emissions" name="Carbon Emissions (kg)" fill="#22c55e" />
              <Bar dataKey="waste" name="Waste Recycled (kg)" fill="#3b82f6" />
              <Bar dataKey="sharing" name="Items Shared" fill="#f59e0b" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">        {/* Impact Breakdown */}
        <div className="bg-dark-card rounded-xl shadow-md p-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-white mb-6">
            Impact Breakdown
          </h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4 mt-4">
            {impactBreakdown.map((category, index) => (
              <div key={category.category}>
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-gray-300 flex items-center">
                    <div 
                      className="w-3 h-3 mr-2 rounded-sm" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    {category.category}
                  </span>
                  <span className="text-white">{category.percentage}%</span>
                </div>
                <div className="mt-1 w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="h-2 rounded-full"
                    style={{ 
                      width: `${category.percentage}%`,
                      backgroundColor: COLORS[index % COLORS.length]
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>        {/* Top Contributors */}
        <div className="bg-dark-card rounded-xl shadow-md p-6 border border-gray-800">
          <h2 className="text-lg font-semibold text-white mb-6">
            Top Contributors
          </h2>
          <div className="space-y-4">
            {topContributors.map((contributor, index) => (
              <div
                key={contributor.name}
                className="flex items-center justify-between p-4 bg-dark-200 rounded-lg border border-gray-700 hover:bg-dark-300 transition-colors"
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary-500/20 text-primary-400 font-semibold">
                    {index + 1}
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-white">
                      {contributor.name}
                    </p>
                    <p className="text-sm text-gray-400">
                      {contributor.impact}
                    </p>
                  </div>
                </div>
                <div className="text-sm font-medium text-primary-400">
                  {contributor.points} points
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>      {/* Additional Chart */}
      <div className="bg-dark-card rounded-xl shadow-md p-6 border border-gray-800">
        <h2 className="text-lg font-semibold text-white mb-6">Emissions Trends</h2>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={monthlyData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" stroke="#E5E7EB" />
              <YAxis stroke="#E5E7EB" />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ color: '#E5E7EB' }} />
              <Line 
                type="monotone" 
                dataKey="emissions" 
                name="Carbon Emissions (kg)" 
                stroke="#22c55e" 
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 2 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

export default Analytics