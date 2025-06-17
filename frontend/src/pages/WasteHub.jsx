import React from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, 
  Plus, 
  Recycle, 
  MapPin, 
  DollarSign, 
  Calendar, 
  Filter,
  Search,
  Truck,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';
import useStore from '../stores/useStore';

const WasteHub = () => {
  const { wasteItems, addWasteItem } = useStore();
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [newItem, setNewItem] = React.useState({
    name: '',
    category: '',
    weight: '',
    description: '',
    image: null
  });
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'plastic', label: 'Plastic', color: 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300' },
    { value: 'paper', label: 'Paper', color: 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300' },
    { value: 'metal', label: 'Metal', color: 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300' },
    { value: 'glass', label: 'Glass', color: 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300' },
    { value: 'electronic', label: 'Electronics', color: 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300' },
    { value: 'organic', label: 'Organic', color: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300' }
  ];

  const mockWasteItems = [
    {
      id: 1,
      name: 'Plastic Bottles',
      category: 'plastic',
      weight: 2.5,
      estimatedValue: 12.50,
      status: 'collected',
      date: '2025-06-15',
      recycler: 'GreenCycle Co.',
      location: 'Downtown Center'
    },
    {
      id: 2,
      name: 'Cardboard Boxes',
      category: 'paper',
      weight: 5.2,
      estimatedValue: 8.75,
      status: 'pending',
      date: '2025-06-16',
      recycler: 'EcoRecycle Ltd.',
      location: 'Business District'
    },
    {
      id: 3,
      name: 'Aluminum Cans',
      category: 'metal',
      weight: 1.8,
      estimatedValue: 15.20,
      status: 'scheduled',
      date: '2025-06-17',
      recycler: 'Metal Recovery Inc.',
      location: 'Residential Area'
    }
  ];

  const mockRecyclers = [
    {
      id: 1,
      name: 'GreenCycle Co.',
      location: 'Downtown Center',
      distance: '2.3 km',
      rating: 4.8,
      specialties: ['Plastic', 'Glass'],
      pickupDays: ['Mon', 'Wed', 'Fri']
    },
    {
      id: 2,
      name: 'EcoRecycle Ltd.',
      location: 'Business District',
      distance: '3.1 km',
      rating: 4.6,
      specialties: ['Paper', 'Cardboard'],
      pickupDays: ['Tue', 'Thu', 'Sat']
    },
    {
      id: 3,
      name: 'Metal Recovery Inc.',
      location: 'Industrial Zone',
      distance: '4.7 km',
      rating: 4.9,
      specialties: ['Metal', 'Electronics'],
      pickupDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    }
  ];

  const handleAddItem = () => {
    if (!newItem.name || !newItem.category || !newItem.weight) {
      toast.error('Please fill in all required fields');
      return;
    }

    const item = {
      name: newItem.name,
      category: newItem.category,
      weight: parseFloat(newItem.weight),
      description: newItem.description,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      estimatedValue: parseFloat(newItem.weight) * 2.5 // Mock calculation
    };

    addWasteItem(item);
    toast.success('Waste item added successfully! 🗂️');
    setIsAddDialogOpen(false);
    setNewItem({
      name: '',
      category: '',
      weight: '',
      description: '',
      image: null
    });
  };
  const getStatusColor = (status) => {
    switch (status) {
      case 'collected':
        return 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300';
      case 'scheduled':
        return 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300';
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900/50 text-gray-800 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'collected':
        return <CheckCircle className="w-4 h-4" />;
      case 'scheduled':
        return <Clock className="w-4 h-4" />;
      case 'pending':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const filteredItems = selectedCategory === 'all' 
    ? mockWasteItems 
    : mockWasteItems.filter(item => item.category === selectedCategory);

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
              Waste Management Hub
            </h1>
            <p className="text-neutral-600 dark:text-neutral-300">
              Smart waste categorization and recycler connections
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700">
                <Camera className="w-4 h-4 mr-2" />
                Add Waste Item
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Waste Item</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Item Name *</Label>
                  <Input
                    id="name"
                    placeholder="e.g., Plastic bottles"
                    value={newItem.name}
                    onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select onValueChange={(value) => setNewItem({...newItem, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.slice(1).map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg) *</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    placeholder="0.0"
                    value={newItem.weight}
                    onChange={(e) => setNewItem({...newItem, weight: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Additional details about the item..."
                    value={newItem.description}
                    onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                  />
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddItem}>
                    Add Item
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
      >        <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200 dark:border-green-800">
          <CardContent className="p-0">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-700 dark:text-green-400">25.5</div>
                <div className="text-sm text-green-600 dark:text-green-400">kg Recycled</div>
              </div>
              <Recycle className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border-blue-200 dark:border-blue-800">
          <CardContent className="p-0">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-700 dark:text-blue-400">$127.50</div>
                <div className="text-sm text-blue-600 dark:text-blue-400">Total Earned</div>
              </div>
              <DollarSign className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 border-purple-200 dark:border-purple-800">
          <CardContent className="p-0">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-700 dark:text-purple-400">18</div>                <div className="text-sm text-purple-600 dark:text-purple-400">Items Processed</div>
              </div>
              <Calendar className="w-8 h-8 text-purple-600 dark:text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-200 dark:border-amber-800">
          <CardContent className="p-0">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-amber-700 dark:text-amber-400">3</div>
                <div className="text-sm text-amber-600 dark:text-amber-400">Pending Pickups</div>
              </div>
              <Truck className="w-8 h-8 text-amber-600 dark:text-amber-400" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column - Waste Items */}
        <div className="lg:col-span-2">
          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                      <Input placeholder="Search waste items..." className="pl-10" />
                    </div>
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full sm:w-48">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Waste Items List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div className="flex-1">                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                            {item.name}
                          </h3>
                          <Badge className={categories.find(c => c.value === item.category)?.color || 'bg-gray-100 text-gray-800'}>
                            {categories.find(c => c.value === item.category)?.label}
                          </Badge>
                          <Badge className={getStatusColor(item.status)}>
                            {getStatusIcon(item.status)}
                            <span className="ml-1 capitalize">{item.status}</span>
                          </Badge>
                        </div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-300 space-y-1">
                          <div>Weight: {item.weight} kg</div>
                          <div>Estimated Value: ${item.estimatedValue}</div>
                          <div>Date: {new Date(item.date).toLocaleDateString()}</div>
                          {item.recycler && (
                            <div>Recycler: {item.recycler}</div>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <Button variant="outline" size="sm">
                          <MapPin className="w-4 h-4 mr-1" />
                          Track
                        </Button>
                        {item.status === 'pending' && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Schedule Pickup
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right Column - Recyclers */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card>              <CardHeader>
                <CardTitle className="flex items-center text-neutral-900 dark:text-neutral-100">
                  <MapPin className="w-5 h-5 mr-2" />
                  Nearby Recyclers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockRecyclers.map((recycler, index) => (
                    <motion.div
                      key={recycler.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}                      className="p-4 border border-neutral-200 dark:border-neutral-700 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-neutral-900 dark:text-neutral-100">{recycler.name}</h4>
                        <div className="flex items-center text-sm text-amber-600 dark:text-amber-400">
                          ⭐ {recycler.rating}
                        </div>
                      </div>
                      <div className="text-sm text-neutral-600 dark:text-neutral-300 space-y-1">
                        <div className="flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {recycler.location} • {recycler.distance}
                        </div>
                        <div>
                          Specialties: {recycler.specialties.join(', ')}
                        </div>
                        <div>
                          Pickup Days: {recycler.pickupDays.join(', ')}
                        </div>
                      </div>
                      <Button size="sm" className="w-full mt-3" variant="outline">
                        Contact Recycler
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-6"
          >            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle className="text-green-800 dark:text-green-300">💡 Quick Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-green-700 dark:text-green-300 space-y-2">
                  <li>• Clean containers before recycling</li>
                  <li>• Remove labels when possible</li>
                  <li>• Separate different materials</li>
                  <li>• Take photos for accurate categorization</li>
                  <li>• Schedule regular pickups to maximize earnings</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WasteHub;
