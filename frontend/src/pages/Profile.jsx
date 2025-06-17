import React from 'react'
import { 
  Award,
  Settings,
  Medal,
  Star,
  Share2,
  Recycle,
  TreePine,
  MessageSquare,
  ArrowRight
} from 'lucide-react'
import { useSelector } from 'react-redux'

const Profile = () => {
  const { user } = useSelector((state) => state.auth)

  const achievements = [
    {
      id: 1,
      title: 'Carbon Champion',
      description: 'Reduced carbon footprint by 50%',
      icon: TreePine,
      color: 'bg-green-500 bg-opacity-20 text-green-400'
    },
    {
      id: 2,
      title: 'Community Leader',
      description: 'Resolved 10 community issues',
      icon: MessageSquare,
      color: 'bg-purple-500 bg-opacity-20 text-purple-400'
    },
    {
      id: 3,
      title: 'Sharing Pioneer',
      description: 'Shared 20 items with the community',
      icon: Share2,
      color: 'bg-amber-500 bg-opacity-20 text-amber-400'
    }
  ]

  const activityHistory = [
    {
      id: 1,
      type: 'carbon',
      action: 'Logged bicycle commute',
      points: 50,
      date: '2025-06-16',
      icon: TreePine,
      color: 'bg-green-500 bg-opacity-20 text-green-400'
    },
    {
      id: 2,
      type: 'waste',
      action: 'Recycled electronics',
      points: 100,
      date: '2025-06-15',
      icon: Recycle,
      color: 'bg-blue-500 bg-opacity-20 text-blue-400'
    },
    {
      id: 3,
      type: 'community',
      action: 'Reported illegal dumping',
      points: 75,
      date: '2025-06-14',
      icon: MessageSquare,
      color: 'bg-purple-500 bg-opacity-20 text-purple-400'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-dark-card rounded-xl shadow-md overflow-hidden border border-dark-300">
        <div className="h-32 bg-gradient-to-r from-primary-600 to-primary-400" />
        <div className="px-6 pb-6">
          <div className="flex justify-between items-start -mt-12">
            <div className="flex items-end">
              <div className="h-24 w-24 rounded-full ring-4 ring-dark-card bg-dark-300 shadow-lg">
                {/* User avatar would go here */}
                <div className="h-full w-full rounded-full bg-primary-600 bg-opacity-30 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary-400">
                    {user?.name?.[0] || 'U'}
                  </span>
                </div>
              </div>
              <div className="ml-4 mb-2">
                <h2 className="text-2xl font-bold text-gray-100">{user?.name}</h2>
                <p className="text-gray-400">Member since June 2025</p>
              </div>
            </div>
            <button className="mt-4 flex items-center px-4 py-2 border border-dark-400 rounded-md shadow-sm text-sm font-medium text-gray-300 bg-dark-300 hover:bg-dark-400 transition-colors">
              <Settings className="h-4 w-4 mr-2" />
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Eco Points */}
        <div className="bg-dark-card rounded-xl shadow-md p-6 border border-dark-300 hover:border-primary-500 transition-colors">
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-primary-500 bg-opacity-20">
              <Award className="h-6 w-6 text-primary-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Eco Points</p>
              <p className="text-2xl font-semibold text-gray-200">
                {user?.ecoPoints || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Trust Score */}
        <div className="bg-dark-card rounded-xl shadow-md p-6 border border-dark-300 hover:border-primary-500 transition-colors">
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-yellow-500 bg-opacity-20">
              <Star className="h-6 w-6 text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Trust Score</p>
              <p className="text-2xl font-semibold text-gray-200">4.8</p>
            </div>
          </div>
        </div>

        {/* Level */}
        <div className="bg-dark-card rounded-xl shadow-md p-6 border border-dark-300 hover:border-primary-500 transition-colors">
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-purple-500 bg-opacity-20">
              <Medal className="h-6 w-6 text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-400">Level</p>
              <p className="text-2xl font-semibold text-gray-200">15</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Progress to next level</span>
              <span className="font-medium text-gray-300">65%</span>
            </div>
            <div className="mt-2 w-full bg-dark-400 rounded-full h-2">
              <div className="bg-primary-600 h-2 rounded-full" style={{ width: '65%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-dark-card rounded-xl shadow-md p-6 border border-dark-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-200">Achievements</h2>
          <button className="text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors">
            View all
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {achievements.map((achievement) => {
            const Icon = achievement.icon
            return (
              <div
                key={achievement.id}
                className="p-4 rounded-lg border border-dark-400 bg-dark-300 hover:border-primary-500 transition-colors"
              >
                <div className={`p-2 rounded-lg inline-block ${achievement.color}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-medium text-gray-200">
                  {achievement.title}
                </h3>
                <p className="mt-1 text-sm text-gray-400">
                  {achievement.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-dark-card rounded-xl shadow-md p-6 border border-dark-300">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-200">Recent Activity</h2>
          <button className="text-sm font-medium text-primary-400 hover:text-primary-300 transition-colors">
            View all
          </button>
        </div>
        <div className="space-y-4">
          {activityHistory.map((activity) => {
            const Icon = activity.icon
            return (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 bg-dark-300 rounded-lg group hover:border-primary-500 border border-dark-400 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-full ${activity.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-200">
                      {activity.action}
                    </p>
                    <p className="text-xs text-gray-400">{activity.date}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-primary-400 font-semibold">
                    +{activity.points} points
                  </span>
                  <button className="ml-4 p-1 rounded-full text-gray-400 hover:text-gray-300 hover:bg-dark-400 transition-colors">
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Profile