import React from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Heart, 
  MessageCircle, 
  MapPin, 
  Calendar, 
  Star,
  User,
  Package,
  Clock,
  CheckCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Avatar, AvatarFallback } from '../components/ui/avatar';
import { toast } from 'sonner';
import useStore from '../stores/useStore';

const SharingEconomy = () => {
  const { sharedItems, addSharedItem } = useStore();
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [viewMode, setViewMode] = React.useState('browse'); // 'browse', 'my-items', 'requests'
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [newItem, setNewItem] = React.useState({
    name: '',
    description: '',
    category: '',
    condition: 'good',
    availableFrom: '',
    availableUntil: '',
    location: '',
    image: null
  });
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'tools', label: 'Tools & Equipment', color: 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300' },
    { value: 'appliances', label: 'Appliances', color: 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300' },
    { value: 'books', label: 'Books & Media', color: 'bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300' },
    { value: 'sports', label: 'Sports & Recreation', color: 'bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-300' },
    { value: 'electronics', label: 'Electronics', color: 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300' },
    { value: 'garden', label: 'Garden & Outdoor', color: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300' },
    { value: 'other', label: 'Other', color: 'bg-gray-100 dark:bg-gray-900/50 text-gray-800 dark:text-gray-300' }
  ];

  const mockItems = [
    {
      id: 1,
      name: 'Electric Drill Set',
      description: 'Professional electric drill with various bits. Perfect for home improvement projects.',
      category: 'tools',
      condition: 'excellent',
      owner: 'Mike Johnson',
      ownerRating: 4.8,
      location: '2.3 km away',
      availableFrom: '2025-06-17',
      availableUntil: '2025-06-30',
      price: 'Free',
      image: null,
      isFavorite: false,
      requests: 3
    },
    {
      id: 2,
      name: 'Bread Maker',
      description: 'Barely used bread maker with recipe book. Great for fresh homemade bread.',
      category: 'appliances',
      condition: 'good',
      owner: 'Sarah Chen',
      ownerRating: 4.9,
      location: '1.8 km away',
      availableFrom: '2025-06-18',
      availableUntil: '2025-07-18',
      price: 'Free',
      image: null,
      isFavorite: true,
      requests: 7
    },
    {
      id: 3,
      name: 'Programming Books Collection',
      description: 'Collection of programming books including Python, JavaScript, and React. Perfect for developers.',
      category: 'books',
      condition: 'good',
      owner: 'Alex Rodriguez',
      ownerRating: 4.7,
      location: '3.5 km away',
      availableFrom: '2025-06-16',
      availableUntil: '2025-08-16',
      price: 'Free',
      image: null,
      isFavorite: false,
      requests: 5
    },
    {
      id: 4,
      name: 'Camping Tent (4-person)',
      description: 'Spacious 4-person tent in excellent condition. Includes stakes and guy lines.',
      category: 'sports',
      condition: 'excellent',
      owner: 'Emma Wilson',
      ownerRating: 5.0,
      location: '4.2 km away',
      availableFrom: '2025-06-20',
      availableUntil: '2025-09-20',
      price: 'Free',
      image: null,
      isFavorite: false,
      requests: 12
    }
  ];

  const mockRequests = [
    {
      id: 1,
      itemName: 'Electric Drill Set',
      requester: 'John Doe',
      requestDate: '2025-06-16',
      status: 'pending',
      message: 'Hi! I need this for a small home repair project. Would need it for 2-3 days.',
      startDate: '2025-06-18',
      endDate: '2025-06-20'
    },
    {
      id: 2,
      itemName: 'Bread Maker',
      requester: 'Lisa Park',
      requestDate: '2025-06-15',
      status: 'approved',
      message: 'Would love to try baking some bread! Can pick up anytime.',
      startDate: '2025-06-17',
      endDate: '2025-06-24'
    }
  ];

  const handleAddItem = () => {
    if (!newItem.name || !newItem.description || !newItem.category || !newItem.location) {
      toast.error('Please fill in all required fields');
      return;
    }

    const item = {
      name: newItem.name,
      description: newItem.description,
      category: newItem.category,
      condition: newItem.condition,
      availableFrom: newItem.availableFrom,
      availableUntil: newItem.availableUntil,
      location: newItem.location,
      owner: 'You',
      ownerRating: 4.8,
      price: 'Free',
      requests: 0,
      isFavorite: false
    };

    addSharedItem(item);
    toast.success('Item added successfully! 🎉 Your neighbors can now request it.');
    setIsAddDialogOpen(false);
    setNewItem({
      name: '',
      description: '',
      category: '',
      condition: 'good',
      availableFrom: '',
      availableUntil: '',
      location: '',
      image: null
    });
  };
  const getConditionColor = (condition) => {
    switch (condition) {
      case 'excellent':
        return 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300';
      case 'good':
        return 'bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300';
      case 'fair':
        return 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900/50 text-gray-800 dark:text-gray-300';
    }
  };

  const getRequestStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300';
      case 'declined':
        return 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300';
      default:
        return 'bg-gray-100 dark:bg-gray-900/50 text-gray-800 dark:text-gray-300';
    }
  };

  const filteredItems = selectedCategory === 'all' 
    ? mockItems 
    : mockItems.filter(item => item.category === selectedCategory);

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-neutral-100 mb-2">
              Sharing Economy
            </h1>
            <p className="text-neutral-600 dark:text-neutral-300">
              Share resources with neighbors and build sustainable communities
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Share Item
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Share an Item</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Item Name *</Label>
                    <Input
                      id="name"
                      placeholder="e.g., Electric drill, Bread maker"
                      value={newItem.name}
                      onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the item, its condition, and any special instructions..."
                      value={newItem.description}
                      onChange={(e) => setNewItem({...newItem, description: e.target.value})}
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
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
                      <Label htmlFor="condition">Condition</Label>
                      <Select value={newItem.condition} onValueChange={(value) => setNewItem({...newItem, condition: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="excellent">Excellent</SelectItem>
                          <SelectItem value="good">Good</SelectItem>
                          <SelectItem value="fair">Fair</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="availableFrom">Available From</Label>
                      <Input
                        id="availableFrom"
                        type="date"
                        value={newItem.availableFrom}
                        onChange={(e) => setNewItem({...newItem, availableFrom: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="availableUntil">Available Until</Label>
                      <Input
                        id="availableUntil"
                        type="date"
                        value={newItem.availableUntil}
                        onChange={(e) => setNewItem({...newItem, availableUntil: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Pickup Location *</Label>
                    <Input
                      id="location"
                      placeholder="Neighborhood or general area"
                      value={newItem.location}
                      onChange={(e) => setNewItem({...newItem, location: e.target.value})}
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddItem}>
                      Share Item
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </motion.div>      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6"
      >
        <Card className="p-3 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border-amber-200 dark:border-amber-800">
          <CardContent className="p-0">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-bold text-amber-700 dark:text-amber-400">8</div>
                <div className="text-xs text-amber-600 dark:text-amber-400">Items Shared</div>
              </div>
              <Package className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 border-green-200 dark:border-green-800">
          <CardContent className="p-0">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-bold text-green-700 dark:text-green-400">15</div>
                <div className="text-xs text-green-600 dark:text-green-400">Items Borrowed</div>
              </div>
              <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="p-3 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 border-blue-200 dark:border-blue-800">
          <CardContent className="p-0">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-bold text-blue-700 dark:text-blue-400">4.8</div>
                <div className="text-xs text-blue-600 dark:text-blue-400">Trust Rating</div>
              </div>
              <Star className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="p-3 bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30 border-purple-200 dark:border-purple-800">
          <CardContent className="p-0">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-bold text-purple-700 dark:text-purple-400">3</div>
                <div className="text-xs text-purple-600 dark:text-purple-400">Pending Requests</div>
              </div>
              <Clock className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* View Mode Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <div className="flex flex-wrap gap-2">
          <Button
            variant={viewMode === 'browse' ? 'default' : 'outline'}
            onClick={() => setViewMode('browse')}
          >
            Browse Items
          </Button>
          <Button
            variant={viewMode === 'my-items' ? 'default' : 'outline'}
            onClick={() => setViewMode('my-items')}
          >
            My Items
          </Button>
          <Button
            variant={viewMode === 'requests' ? 'default' : 'outline'}
            onClick={() => setViewMode('requests')}
          >
            Requests
          </Button>
        </div>
      </motion.div>

      {/* Filters (for browse mode) */}
      {viewMode === 'browse' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-6"
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                    <Input placeholder="Search items..." className="pl-10" />
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
      )}

      {/* Content based on view mode */}
      {viewMode === 'browse' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <Card className="hover:shadow-lg transition-shadow h-full">
                <CardContent className="p-0">                  <div className="aspect-video bg-neutral-200 dark:bg-neutral-700 rounded-t-lg"></div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 line-clamp-1">
                        {item.name}
                      </h3>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600">
                        <Heart className={`w-4 h-4 ${item.isFavorite ? 'fill-current' : ''}`} />
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      <Badge className={categories.find(c => c.value === item.category)?.color}>
                        {categories.find(c => c.value === item.category)?.label}
                      </Badge>
                      <Badge className={getConditionColor(item.condition)}>
                        {item.condition}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-3 line-clamp-2">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs">
                          {item.owner.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-neutral-600 dark:text-neutral-300">{item.owner}</span>
                      <div className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400">
                        <Star className="w-3 h-3 fill-current" />
                        {item.ownerRating}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {item.location}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        Available
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                        {item.price}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Message
                        </Button>
                        <Button size="sm">
                          Request
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Requests View */}
      {viewMode === 'requests' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-4"
        >
          <Card>
            <CardHeader>
              <CardTitle>Pending Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockRequests.map((request, index) => (
                  <div key={request.id} className="border border-neutral-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-neutral-900">{request.itemName}</h4>
                        <p className="text-sm text-neutral-600">
                          Requested by {request.requester} on {new Date(request.requestDate).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge className={getRequestStatusColor(request.status)}>
                        {request.status}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-neutral-700 mb-3">{request.message}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-neutral-600 mb-3">
                      <span>From: {new Date(request.startDate).toLocaleDateString()}</span>
                      <span>To: {new Date(request.endDate).toLocaleDateString()}</span>
                    </div>
                    
                    {request.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Decline
                        </Button>
                        <Button size="sm">
                          Approve
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default SharingEconomy;
