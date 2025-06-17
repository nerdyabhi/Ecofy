import React, { useState } from 'react'
import { 
  Share2,
  MessageSquare,
  Star,
  Grid,
  List,
  Plus,
  Search,
  Calendar,
  Camera,
  X
} from 'lucide-react'

const Sharing = () => {
  const [viewMode, setViewMode] = useState('grid')
  const [showAddItem, setShowAddItem] = useState(false)

  const items = [
    {
      id: 1,
      name: 'Power Drill',
      category: 'Tools',
      description: 'Professional grade power drill, barely used',
      owner: 'John Doe',
      ownerRating: 4.8,
      distance: '0.8 km',
      image: 'https://example.com/drill.jpg',
      status: 'available'
    },
    {
      id: 2,
      name: 'Camping Tent',
      category: 'Outdoor',
      description: '4-person tent, perfect for weekend trips',
      owner: 'Jane Smith',
      ownerRating: 4.5,
      distance: '1.2 km',
      image: 'https://example.com/tent.jpg',
      status: 'available'
    },
    {
      id: 3,
      name: 'Electric Bike',
      category: 'Transportation',
      description: 'Eco-friendly electric bike for daily commutes',
      owner: 'Alex Johnson',
      ownerRating: 4.9,
      distance: '2.3 km',
      image: 'https://example.com/bike.jpg',
      status: 'available'
    }
  ]

  const categories = [
    'All',
    'Tools',
    'Outdoor',
    'Electronics',
    'Books',
    'Kitchen',
    'Garden',
    'Transportation'
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-dark-card rounded-xl shadow-md p-6 border border-dark-300 bg-gradient-to-r from-dark-card to-dark-300">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-100">Sharing Economy</h1>
            <p className="mt-1 text-gray-400">
              Borrow and lend items in your community
            </p>
          </div>
          <button
            onClick={() => setShowAddItem(true)}
            className="inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-lg"
          >
            <Plus className="h-5 w-5 mr-2" />
            Share Item
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-dark-card rounded-xl shadow-md p-6 border border-dark-300">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border border-dark-400 rounded-lg bg-dark-300 text-gray-200 focus:ring-primary-500 focus:border-primary-500 placeholder-gray-500"
                placeholder="Search items..."
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center space-x-2 bg-dark-300 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-dark-400 text-primary-400' : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-dark-400 text-primary-400' : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="mt-4">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category}
                className="px-4 py-2 text-sm font-medium rounded-lg bg-dark-300 text-gray-300 hover:bg-dark-400 hover:text-gray-200 transition-colors whitespace-nowrap"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Items Grid/List */}
      <div className="bg-dark-card rounded-xl shadow-md p-6 border border-dark-300">
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item.id} className="bg-dark-300 rounded-lg overflow-hidden border border-dark-400 shadow-md hover:border-primary-500 transition-colors">
                <div className="aspect-w-3 aspect-h-2 bg-dark-400">
                  {/* Item image would go here */}
                  <div className="flex items-center justify-center h-48 bg-dark-400 bg-opacity-50 group">
                    <Share2 className="h-12 w-12 text-gray-500 group-hover:text-primary-400 transition-colors" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-200">{item.name}</h3>
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-dark-400 text-primary-400 rounded-full mt-1">
                    {item.category}
                  </span>
                  <p className="mt-2 text-sm text-gray-400">{item.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400" />
                      <span className="ml-1 text-sm text-gray-300">{item.ownerRating}</span>
                    </div>
                    <span className="text-sm text-gray-400">{item.distance}</span>
                  </div>
                  <button className="mt-4 w-full px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                    Request to Borrow
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center space-x-4 p-4 bg-dark-300 rounded-lg border border-dark-400 hover:border-primary-500 transition-colors"
              >
                <div className="flex-shrink-0 h-16 w-16 bg-dark-400 rounded-lg flex items-center justify-center">
                  <Share2 className="h-8 w-8 text-gray-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center">
                    <h3 className="text-sm font-medium text-gray-200">{item.name}</h3>
                    <span className="ml-2 inline-block px-2 py-0.5 text-xs bg-dark-400 text-primary-400 rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-gray-400 truncate">
                    {item.description}
                  </p>
                  <div className="mt-2 flex items-center">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="ml-1 text-sm text-gray-300">{item.ownerRating}</span>
                    <span className="mx-2 text-gray-600">·</span>
                    <span className="text-sm text-gray-400">{item.distance}</span>
                  </div>
                </div>
                <button className="flex-shrink-0 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                  Request
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Item Modal */}
      {showAddItem && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-dark-card rounded-xl max-w-md w-full p-6 border border-dark-300 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-200">Share an Item</h2>
              <button 
                onClick={() => setShowAddItem(false)}
                className="text-gray-400 hover:text-gray-300 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Item Name
                </label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border-dark-400 bg-dark-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-gray-200 placeholder-gray-500"
                  placeholder="What are you sharing?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Category
                </label>
                <select
                  className="mt-1 block w-full rounded-md border-dark-400 bg-dark-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-gray-200"
                >
                  <option value="">Select a category</option>
                  {categories.slice(1).map((category) => (
                    <option key={category} value={category.toLowerCase()}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Description
                </label>
                <textarea
                  rows={3}
                  className="mt-1 block w-full rounded-md border-dark-400 bg-dark-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 text-gray-200 placeholder-gray-500"
                  placeholder="Briefly describe the item..."
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Upload Photos
                </label>
                <div className="mt-1 border-2 border-dashed border-dark-400 rounded-md p-4 text-center hover:border-primary-500 transition-colors">
                  <Camera className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="mt-1 text-sm text-gray-400">
                    Click to upload or drag and drop
                  </p>
                  <input type="file" className="hidden" />
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowAddItem(false)}
                  className="px-4 py-2 border border-dark-400 rounded-md shadow-sm text-gray-300 hover:bg-dark-400 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 border border-transparent rounded-md shadow-sm text-white hover:bg-primary-700 transition-colors"
                >
                  Share Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Sharing