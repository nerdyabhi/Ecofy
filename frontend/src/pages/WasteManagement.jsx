import React, { useState } from 'react'
import { 
  Upload,
  MapPin,
  List,
  History,
  Package,
  Camera
} from 'lucide-react'

const WasteManagement = () => {
  const [activeTab, setActiveTab] = useState('add')

  const tabs = [
    { id: 'add', name: 'Add Item', icon: Upload },
    { id: 'recyclers', name: 'Find Recyclers', icon: MapPin },
    { id: 'history', name: 'History', icon: History }
  ]

  // Placeholder data - would come from API
  const recentTransactions = [
    {
      id: 1,
      type: 'Paper',
      weight: '5kg',
      points: 50,
      date: '2025-06-16',
      status: 'completed'
    },
    {
      id: 2,
      type: 'Plastic',
      weight: '3kg',
      points: 30,
      date: '2025-06-15',
      status: 'pending'
    }
  ]

  const nearbyRecyclers = [
    {
      id: 1,
      name: 'Green Recycling Center',
      distance: '1.2km',
      rating: 4.5,
      address: '123 Eco Street'
    },
    {
      id: 2,
      name: 'City Waste Management',
      distance: '2.5km',
      rating: 4.2,
      address: '456 Green Avenue'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-dark-card rounded-xl shadow-md p-6 border border-dark-300 bg-gradient-to-r from-dark-card to-dark-300">
        <h1 className="text-2xl font-bold text-gray-100">Waste Management</h1>
        <p className="mt-1 text-gray-400">
          Photograph waste items for recycling and earn eco-points
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-dark-card rounded-xl shadow-md border border-dark-300">
        <div className="border-b border-dark-300">
          <nav className="flex -mb-px" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex-1 px-4 py-4 text-center border-b-2 font-medium text-sm
                    ${activeTab === tab.id
                      ? 'border-primary-500 text-primary-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-dark-400'}
                  `}
                >
                  <Icon className="mx-auto h-5 w-5 mb-1" />
                  {tab.name}
                </button>
              )
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'add' && (
            <div className="space-y-6">
              <div className="border-2 border-dashed border-dark-400 rounded-lg p-12 text-center hover:border-primary-500 transition-colors cursor-pointer">
                <div className="mx-auto h-12 w-12 text-gray-400">
                  <Camera className="h-12 w-12" />
                </div>
                <div className="mt-4">
                  <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-colors">
                    Take Photo
                  </button>
                </div>
                <p className="mt-2 text-sm text-gray-400">
                  or drag and drop image files
                </p>
              </div>

              <div className="bg-dark-300 rounded-lg p-4 border border-dark-400">
                <h3 className="text-sm font-medium text-gray-200">Tips</h3>
                <ul className="mt-2 text-sm text-gray-400 list-disc pl-5 space-y-1">
                  <li>Ensure items are clean and sorted</li>
                  <li>Remove any non-recyclable parts</li>
                  <li>Group similar materials together</li>
                  <li>Check local recycling guidelines for specific materials</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'recyclers' && (
            <div className="space-y-4">
              {nearbyRecyclers.map((recycler) => (
                <div 
                  key={recycler.id}
                  className="flex items-center justify-between p-4 bg-dark-300 rounded-lg border border-dark-400 hover:border-primary-500 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="p-2 bg-primary-600 rounded-lg">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-200">
                        {recycler.name}
                      </h3>
                      <p className="text-sm text-gray-400">{recycler.address}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-primary-400">
                      {recycler.distance}
                    </p>
                    <p className="text-sm text-gray-400">
                      Rating: {recycler.rating}
                    </p>
                  </div>
                </div>
              ))}
              <div className="mt-4 text-center">
                <button className="px-4 py-2 bg-dark-300 text-gray-300 rounded-md hover:bg-dark-400 transition-colors">
                  Show More Locations
                </button>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div 
                  key={transaction.id}
                  className="flex items-center justify-between p-4 bg-dark-300 rounded-lg border border-dark-400 hover:border-primary-500 transition-colors"
                >
                  <div className="flex items-center">
                    <div className="p-2 bg-green-600 rounded-lg">
                      <Package className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-sm font-medium text-gray-200">
                        {transaction.type}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {transaction.date}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-300">
                      {transaction.weight}
                    </p>
                    <p className="text-sm text-primary-400">
                      +{transaction.points} points
                    </p>
                  </div>
                </div>
              ))}
              <div className="mt-4 text-center">
                <button className="px-4 py-2 bg-dark-300 text-gray-300 rounded-md hover:bg-dark-400 transition-colors">
                  View Full History
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default WasteManagement