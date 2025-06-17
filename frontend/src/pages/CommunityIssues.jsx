import React from 'react';
import { motion } from 'framer-motion';
import { 
  Plus, 
  MapPin, 
  Camera, 
  ThumbsUp, 
  MessageCircle, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Filter,
  Search,
  Users,
  Calendar,
  Send
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

const CommunityIssues = () => {
  const { communityIssues, addCommunityIssue } = useStore();
  const [isReportDialogOpen, setIsReportDialogOpen] = React.useState(false);
  const [selectedIssue, setSelectedIssue] = React.useState(null);
  const [selectedCategory, setSelectedCategory] = React.useState('all');
  const [selectedStatus, setSelectedStatus] = React.useState('all');
  const [newIssue, setNewIssue] = React.useState({
    title: '',
    description: '',
    category: '',
    location: '',
    severity: 'medium',
    image: null
  });

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'infrastructure', label: 'Infrastructure', color: 'bg-blue-100 text-blue-800' },
    { value: 'waste', label: 'Waste Management', color: 'bg-green-100 text-green-800' },
    { value: 'safety', label: 'Safety', color: 'bg-red-100 text-red-800' },
    { value: 'environment', label: 'Environment', color: 'bg-emerald-100 text-emerald-800' },
    { value: 'utilities', label: 'Utilities', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'other', label: 'Other', color: 'bg-gray-100 text-gray-800' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'reported', label: 'Reported', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'in-progress', label: 'In Progress', color: 'bg-blue-100 text-blue-800' },
    { value: 'resolved', label: 'Resolved', color: 'bg-green-100 text-green-800' },
    { value: 'dismissed', label: 'Dismissed', color: 'bg-gray-100 text-gray-800' }
  ];

  const mockIssues = [
    {
      id: 1,
      title: 'Broken Streetlight on Oak Avenue',
      description: 'The streetlight has been flickering for weeks and finally went out completely. This creates a safety hazard for pedestrians and drivers.',
      category: 'utilities',
      location: 'Oak Avenue & 3rd Street',
      severity: 'high',
      status: 'in-progress',
      reportedBy: 'Sarah Johnson',
      reportedDate: '2025-06-14',
      votes: 23,
      comments: 8,
      authority: 'City Public Works',
      image: null
    },
    {
      id: 2,
      title: 'Large Pothole Causing Traffic Issues',
      description: 'Deep pothole in the middle of the road is causing cars to swerve dangerously. Multiple reports of tire damage.',
      category: 'infrastructure',
      location: 'Main Street near Shopping Center',
      severity: 'high',
      status: 'reported',
      reportedBy: 'Mike Chen',
      reportedDate: '2025-06-15',
      votes: 31,
      comments: 12,
      authority: 'Department of Transportation',
      image: null
    },
    {
      id: 3,
      title: 'Illegal Dumping in Park Area',
      description: 'Someone has been dumping construction debris in Riverside Park. This is affecting wildlife and park visitors.',
      category: 'environment',
      location: 'Riverside Park, North Entrance',
      severity: 'medium',
      status: 'resolved',
      reportedBy: 'Emma Davis',
      reportedDate: '2025-06-10',
      resolvedDate: '2025-06-16',
      votes: 18,
      comments: 6,
      authority: 'Parks & Recreation',
      image: null
    },
    {
      id: 4,
      title: 'Overflowing Trash Bins at Bus Stop',
      description: 'Trash bins at the central bus stop are consistently overflowing, creating unsanitary conditions.',
      category: 'waste',
      location: 'Central Bus Terminal',
      severity: 'medium',
      status: 'reported',
      reportedBy: 'John Smith',
      reportedDate: '2025-06-16',
      votes: 15,
      comments: 4,
      authority: 'Waste Management Department',
      image: null
    }
  ];

  const handleReportIssue = () => {
    if (!newIssue.title || !newIssue.description || !newIssue.category || !newIssue.location) {
      toast.error('Please fill in all required fields');
      return;
    }

    const issue = {
      title: newIssue.title,
      description: newIssue.description,
      category: newIssue.category,
      location: newIssue.location,
      severity: newIssue.severity,
      status: 'reported',
      reportedBy: 'You',
      reportedDate: new Date().toISOString().split('T')[0],
      votes: 1,
      comments: 0,
      authority: 'Pending Assignment'
    };

    addCommunityIssue(issue);
    toast.success('Issue reported successfully! 📍 Authorities will be notified.');
    setIsReportDialogOpen(false);
    setNewIssue({
      title: '',
      description: '',
      category: '',
      location: '',
      severity: 'medium',
      image: null
    });
  };

  const getStatusColor = (status) => {
    return statusOptions.find(s => s.value === status)?.color || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'resolved':
        return <CheckCircle className="w-4 h-4" />;
      case 'in-progress':
        return <Clock className="w-4 h-4" />;
      case 'reported':
        return <AlertTriangle className="w-4 h-4" />;
      default:
        return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredIssues = mockIssues.filter(issue => {
    const matchesCategory = selectedCategory === 'all' || issue.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || issue.status === selectedStatus;
    return matchesCategory && matchesStatus;
  });

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
              Community Issues
            </h1>
            <p className="text-neutral-600">
              Report local problems and drive community-led solutions
            </p>
          </div>
          <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700">
                <Plus className="w-4 h-4 mr-2" />
                Report Issue
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Report a Community Issue</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Issue Title *</Label>
                  <Input
                    id="title"
                    placeholder="Brief description of the issue"
                    value={newIssue.title}
                    onChange={(e) => setNewIssue({...newIssue, title: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide detailed information about the issue..."
                    value={newIssue.description}
                    onChange={(e) => setNewIssue({...newIssue, description: e.target.value})}
                    rows={4}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select onValueChange={(value) => setNewIssue({...newIssue, category: value})}>
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
                    <Label htmlFor="severity">Severity</Label>
                    <Select value={newIssue.severity} onValueChange={(value) => setNewIssue({...newIssue, severity: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <div className="flex space-x-2">
                    <Input
                      id="location"
                      placeholder="Street address or landmark"
                      value={newIssue.location}
                      onChange={(e) => setNewIssue({...newIssue, location: e.target.value})}
                      className="flex-1"
                    />
                    <Button variant="outline" size="sm">
                      <MapPin className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="photo">Photo (Optional)</Label>
                  <div className="border-2 border-dashed border-neutral-300 rounded-lg p-6 text-center">
                    <Camera className="w-8 h-8 text-neutral-400 mx-auto mb-2" />
                    <p className="text-sm text-neutral-600">
                      Click to add a photo or drag and drop
                    </p>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsReportDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleReportIssue}>
                    Report Issue
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
      >
        <Card className="p-4 bg-gradient-to-br from-purple-50 to-violet-50 border-purple-200">
          <CardContent className="p-0">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-purple-700">12</div>
                <div className="text-sm text-purple-600">Issues Resolved</div>
              </div>
              <CheckCircle className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <CardContent className="p-0">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-700">8</div>
                <div className="text-sm text-blue-600">In Progress</div>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200">
          <CardContent className="p-0">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-yellow-700">15</div>
                <div className="text-sm text-yellow-600">Reported</div>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-0">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-700">147</div>
                <div className="text-sm text-green-600">Community Votes</div>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

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
                  <Input placeholder="Search issues..." className="pl-10" />
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
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Issues List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        {filteredIssues.map((issue, index) => (
          <motion.div
            key={issue.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedIssue(issue)}>
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                          {issue.title}
                        </h3>
                        <div className="flex flex-wrap gap-2 mb-2">
                          <Badge className={categories.find(c => c.value === issue.category)?.color || 'bg-gray-100 text-gray-800'}>
                            {categories.find(c => c.value === issue.category)?.label}
                          </Badge>
                          <Badge className={getStatusColor(issue.status)}>
                            {getStatusIcon(issue.status)}
                            <span className="ml-1 capitalize">{issue.status.replace('-', ' ')}</span>
                          </Badge>
                          <Badge className={getSeverityColor(issue.severity)}>
                            {issue.severity.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-neutral-600 mb-3 line-clamp-2">
                      {issue.description}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-neutral-500 mb-3">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {issue.location}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(issue.reportedDate).toLocaleDateString()}
                      </div>
                      <div>
                        Reported by {issue.reportedBy}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <ThumbsUp className="w-4 h-4" />
                        {issue.votes}
                      </Button>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4" />
                        {issue.comments}
                      </Button>
                      <div className="text-sm text-neutral-500">
                        Authority: {issue.authority}
                      </div>
                    </div>
                  </div>
                  
                  {issue.image && (
                    <div className="w-full sm:w-32 h-32 bg-neutral-200 rounded-lg"></div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      {/* Issue Detail Dialog */}
      {selectedIssue && (
        <Dialog open={!!selectedIssue} onOpenChange={() => setSelectedIssue(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{selectedIssue.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2">
                <Badge className={categories.find(c => c.value === selectedIssue.category)?.color}>
                  {categories.find(c => c.value === selectedIssue.category)?.label}
                </Badge>
                <Badge className={getStatusColor(selectedIssue.status)}>
                  {getStatusIcon(selectedIssue.status)}
                  <span className="ml-1 capitalize">{selectedIssue.status.replace('-', ' ')}</span>
                </Badge>
                <Badge className={getSeverityColor(selectedIssue.severity)}>
                  {selectedIssue.severity.toUpperCase()}
                </Badge>
              </div>
              
              <p className="text-neutral-700">{selectedIssue.description}</p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Location:</strong> {selectedIssue.location}
                </div>
                <div>
                  <strong>Reported:</strong> {new Date(selectedIssue.reportedDate).toLocaleDateString()}
                </div>
                <div>
                  <strong>Reporter:</strong> {selectedIssue.reportedBy}
                </div>
                <div>
                  <strong>Authority:</strong> {selectedIssue.authority}
                </div>
              </div>
              
              {selectedIssue.resolvedDate && (
                <div className="text-sm text-green-600">
                  <strong>Resolved:</strong> {new Date(selectedIssue.resolvedDate).toLocaleDateString()}
                </div>
              )}
              
              <div className="flex items-center gap-4 pt-4 border-t">
                <Button variant="outline" className="flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4" />
                  Support ({selectedIssue.votes})
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Comment ({selectedIssue.comments})
                </Button>
              </div>
              
              <div className="pt-4 border-t">
                <Label htmlFor="comment">Add a comment</Label>
                <div className="flex gap-2 mt-2">
                  <Input placeholder="Share your thoughts..." className="flex-1" />
                  <Button size="sm">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CommunityIssues;
