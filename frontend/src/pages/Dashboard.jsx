import React from 'react'
import { useSelector } from 'react-redux'
import { 
  Award, 
  TreePine, 
  Users, 
  Recycle,
  TrendingUp,
  Calendar,
  Clock
} from 'lucide-react'

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="bg-dark-card rounded-xl shadow-md p-6 border border-dark-300 hover:border-primary-500 transition-colors backdrop-blur-sm">
    <div className="flex items-center">
      <div className={`p-2 rounded-lg ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-400">{title}</p>
        <p className="text-2xl font-semibold text-gray-200">{value}</p>
      </div>
    </div>
  </div>
)

const ActivityItem = ({ icon: Icon, title, description, time, color }) => (
  <div className="flex space-x-3 hover:bg-dark-300 p-3 rounded-lg transition-colors">
    <div className={`flex-shrink-0 p-2 rounded-lg ${color}`}>
      <Icon className="h-5 w-5 text-white" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-200">{title}</p>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
    <div className="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">
      {time}
    </div>
  </div>
)

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth)
  
  // This would come from your API in production
  const stats = {
    ecoPoints: user?.ecoPoints || 0,
    carbonSaved: "2.5 tons",
    communityImpact: "15 issues",
    wasteRecycled: "45 kg"
  }

  const recentActivities = [
    {
      icon: Recycle,
      title: "Waste Recycled",
      description: "Paper and cardboard items",
      time: "2h ago",
      color: "bg-green-500"
    },
    {
      icon: TreePine,
      title: "Carbon Reduced",
      description: "Used public transport",
      time: "5h ago",
      color: "bg-blue-500"
    },
    {
      icon: Users,
      title: "Community Issue Reported",
      description: "Street light malfunction",
      time: "1d ago",
      color: "bg-purple-500"
    }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-dark-card rounded-xl shadow-md p-6 border border-dark-300 bg-gradient-to-r from-dark-card to-dark-300">
        <h1 className="text-2xl font-bold text-gray-100">
          Welcome back, {user?.name}!
        </h1>
        <p className="mt-1 text-gray-400">
          Track your environmental impact and community contributions
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Eco Points"
          value={stats.ecoPoints}
          icon={Award}
          color="bg-primary-500"
        />
        <StatCard
          title="Carbon Saved"
          value={stats.carbonSaved}
          icon={TreePine}
          color="bg-green-500"
        />
        <StatCard
          title="Community Impact"
          value={stats.communityImpact}
          icon={Users}
          color="bg-purple-500"
        />
        <StatCard
          title="Waste Recycled"
          value={stats.wasteRecycled}
          icon={Recycle}
          color="bg-blue-500"
        />
      </div>

      {/* Activity Section */}
      <div className="bg-dark-card rounded-xl shadow-md p-6 border border-dark-300">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-200">Recent Activity</h2>
          <div className="flex space-x-2">
            <button className="p-2 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-dark-300 transition-colors">
              <Calendar className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-lg text-gray-400 hover:text-gray-200 hover:bg-dark-300 transition-colors">
              <Clock className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="space-y-2">
          {recentActivities.map((activity, index) => (
            <ActivityItem key={index} {...activity} />
          ))}
        </div>
      </div>

      {/* Monthly Goals */}
      <div className="bg-dark-card rounded-xl shadow-md p-6 border border-dark-300">
        <h2 className="text-lg font-semibold text-gray-200 mb-4">
          Monthly Goals
        </h2>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-300">Carbon Reduction</span>
              <span className="text-sm font-medium text-gray-300">75%</span>
            </div>
            <div className="w-full bg-dark-300 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-300">Waste Management</span>
              <span className="text-sm font-medium text-gray-300">60%</span>
            </div>
            <div className="w-full bg-dark-300 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-300">Community Engagement</span>
              <span className="text-sm font-medium text-gray-300">40%</span>
            </div>
            <div className="w-full bg-dark-300 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '40%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard