import React, { useState } from 'react'
import { 
  AlertTriangle,
  ThumbsUp,
  MessageSquare,
  MapPin,
  Camera,
  Filter,
  Clock,
  List,
  Send
} from 'lucide-react'

const Community = () => {
  const [view, setView] = useState('list')
  const [filter, setFilter] = useState('all')

  const issues = [
    {
      id: 1,
      title: 'Broken Streetlight',
      description: 'Street light not working on Green Avenue',
      location: '123 Green Avenue',
      status: 'pending',
      votes: 15,
      comments: 3,
      date: '2025-06-16',
      image: 'https://example.com/streetlight.jpg'
    },
    {
      id: 2,
      title: 'Illegal Dumping',
      description: 'Waste dumped near river bank',
      location: 'River Park',
      status: 'in-progress',
      votes: 32,
      comments: 8,
      date: '2025-06-15',
      image: 'https://example.com/dump.jpg'
    }
  ]

  const filters = [
    { id: 'all', name: 'All Issues' },
    { id: 'pending', name: 'Pending' },
    { id: 'in-progress', name: 'In Progress' },
    { id: 'resolved', name: 'Resolved' }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500 bg-opacity-20 text-yellow-400'
      case 'in-progress':
        return 'bg-blue-500 bg-opacity-20 text-blue-400'
      case 'resolved':
        return 'bg-green-500 bg-opacity-20 text-green-400'
      default:
        return 'bg-gray-500 bg-opacity-20 text-gray-400'
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-dark-card rounded-xl shadow-md p-6 border border-dark-300 bg-gradient-to-r from-dark-card to-dark-300">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-100">Community Issues</h1>
            <p className="mt-1 text-gray-400">
              Report and track local environmental issues
            </p>
          </div>
          <button 
            onClick={() => setView('report')}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-lg"
          >
            Report Issue
          </button>
        </div>
      </div>

      {/* View Controls */}
      <div className="bg-dark-card rounded-xl shadow-md p-6 border border-dark-300">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          {/* Filters */}
          <div className="flex space-x-2 overflow-x-auto">
            {filters.map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`
                  px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors
                  ${filter === f.id
                    ? 'bg-primary-500 bg-opacity-20 text-primary-400'
                    : 'text-gray-400 hover:text-gray-300 hover:bg-dark-300'}
                `}
              >
                {f.name}
              </button>
            ))}
          </div>

          {/* View Toggle */}
          <div className="flex items-center space-x-2 bg-dark-300 rounded-lg p-1">
            <button
              onClick={() => setView('list')}
              className={`p-2 rounded-lg transition-colors ${
                view === 'list' ? 'bg-dark-400 text-primary-400' : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <List className="h-5 w-5" />
            </button>
            <button
              onClick={() => setView('map')}
              className={`p-2 rounded-lg transition-colors ${
                view === 'map' ? 'bg-dark-400 text-primary-400' : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <MapPin className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Issues List */}
        {view === 'list' && (
          <div className="mt-6 space-y-4">
            {issues.map((issue) => (
              <div 
                key={issue.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-dark-300 rounded-lg space-y-4 sm:space-y-0 border border-dark-400 hover:border-primary-500 transition-colors"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="p-2 rounded-lg bg-primary-500 bg-opacity-20">
                      <AlertTriangle className="h-6 w-6 text-primary-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-200">
                      {issue.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-400">
                      {issue.description}
                    </p>
                    <div className="mt-2 flex items-center space-x-4">
                      <div className="flex items-center text-sm text-gray-400">
                        <MapPin className="h-4 w-4 mr-1" />
                        {issue.location}
                      </div>
                      <div className="flex items-center text-sm text-gray-400">
                        <Clock className="h-4 w-4 mr-1" />
                        {issue.date}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(issue.status)}`}>
                    {issue.status}
                  </span>
                  <button className="flex items-center text-gray-400 hover:text-primary-400 transition-colors">
                    <ThumbsUp className="h-5 w-5 mr-1" />
                    <span className="text-sm">{issue.votes}</span>
                  </button>
                  <button className="flex items-center text-gray-400 hover:text-primary-400 transition-colors">
                    <MessageSquare className="h-5 w-5 mr-1" />
                    <span className="text-sm">{issue.comments}</span>
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-4 text-center">
              <button className="px-4 py-2 border border-dark-400 rounded-lg text-gray-300 hover:bg-dark-400 transition-colors">
                View More Issues
              </button>
            </div>
          </div>
        )}

        {/* Map View */}
        {view === 'map' && (
          <div className="mt-6 border-2 border-dark-400 border-dashed rounded-lg h-96 flex items-center justify-center bg-dark-300">
            <div className="text-center">
              <MapPin className="h-12 w-12 text-gray-500 mx-auto mb-2" />
              <span className="text-gray-400">Map view coming soon</span>
            </div>
          </div>
        )}

        {/* Report Form */}
        {view === 'report' && (
          <div className="mt-6">
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Issue Title
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-dark-400 bg-dark-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-gray-200 placeholder-gray-500"
                  placeholder="Brief description of the issue"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Detailed Description
                </label>
                <textarea
                  rows={4}
                  className="mt-1 block w-full rounded-md border-dark-400 bg-dark-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-gray-200 placeholder-gray-500"
                  placeholder="Provide more details about the issue..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Location
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-dark-400 bg-dark-400 text-gray-400">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <input
                    type="text"
                    className="flex-1 block w-full rounded-none rounded-r-md border-dark-400 bg-dark-300 focus:border-primary-500 focus:ring-primary-500 text-gray-200"
                    placeholder="Address or location description"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Add Photos
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dark-400 border-dashed rounded-md hover:border-primary-500 transition-colors cursor-pointer">
                  <div className="space-y-1 text-center">
                    <Camera className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-400">
                      <label className="relative cursor-pointer rounded-md bg-dark-300 font-medium text-primary-400 hover:text-primary-500">
                        <span>Upload a file</span>
                        <input type="file" className="sr-only" />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setView('list')}
                  className="px-4 py-2 border border-dark-400 rounded-md shadow-sm text-sm font-medium text-gray-300 hover:bg-dark-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
                >
                  <Send className="h-4 w-4 mr-2" />
                  Submit Report
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default Community