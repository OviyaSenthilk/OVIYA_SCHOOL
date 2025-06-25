import React, { useState } from 'react';
import { Bell, Calendar, Clock, User, Pin, AlertCircle, Info, CheckCircle, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { format, parseISO, isToday, isTomorrow, isYesterday } from 'date-fns';

export default function Notice() {
  const { user } = useAuth();
  const [activeFilter, setActiveFilter] = useState('all');

  const notices = [
    {
      id: 1,
      title: 'School Picnic - Save the Date!',
      content: 'We are excited to announce our annual school picnic on March 15th at Central Park. Please mark your calendars and join us for a day of fun activities, games, and delicious food. More details will follow soon.',
      type: 'event',
      priority: 'high',
      author: 'Principal Maria Rodriguez',
      date: '2024-01-20T10:00:00Z',
      isPinned: true,
      category: 'Events',
      targetAudience: ['parents', 'teachers']
    },
    {
      id: 2,
      title: 'Parent-Teacher Conference Schedule',
      content: 'Parent-teacher conferences will be held from February 5-9. Please check your email for your scheduled appointment time. If you need to reschedule, contact the office by January 30th.',
      type: 'important',
      priority: 'high',
      author: 'Ms. Sarah Johnson',
      date: '2024-01-19T14:30:00Z',
      isPinned: true,
      category: 'Academic',
      targetAudience: ['parents']
    },
    {
      id: 3,
      title: 'New Art Supplies Arrival',
      content: 'We have received new art supplies for our creativity corner! Children will now have access to watercolors, colored pencils, and craft materials. Thank you to all parents who contributed to the fundraiser.',
      type: 'info',
      priority: 'medium',
      author: 'Ms. Lisa Brown',
      date: '2024-01-18T09:15:00Z',
      isPinned: false,
      category: 'Activities',
      targetAudience: ['parents', 'teachers']
    },
    {
      id: 4,
      title: 'Health and Safety Update',
      content: 'Please ensure your child brings a water bottle daily. With the changing weather, we want to keep everyone hydrated. Also, reminder about our hand washing protocols.',
      type: 'warning',
      priority: 'medium',
      author: 'Nurse Patricia Wilson',
      date: '2024-01-17T11:20:00Z',
      isPinned: false,
      category: 'Health',
      targetAudience: ['parents', 'teachers']
    },
    {
      id: 5,
      title: 'Reading Program Launch',
      content: 'Our new reading program starts next week! Each child will receive a reading log to track their progress. Parents are encouraged to read with their children for at least 15 minutes daily.',
      type: 'success',
      priority: 'medium',
      author: 'Librarian John Davis',
      date: '2024-01-16T16:45:00Z',
      isPinned: false,
      category: 'Academic',
      targetAudience: ['parents', 'teachers']
    },
    {
      id: 6,
      title: 'Snow Day Policy Reminder',
      content: 'With winter weather approaching, please review our snow day policy. School closures will be announced by 6 AM on social media and through our communication app.',
      type: 'info',
      priority: 'low',
      author: 'Administration',
      date: '2024-01-15T08:00:00Z',
      isPinned: false,
      category: 'Policy',
      targetAudience: ['parents', 'teachers']
    }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'event': return Calendar;
      case 'important': return AlertCircle;
      case 'warning': return AlertTriangle;
      case 'success': return CheckCircle;
      default: return Info;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'event': return 'from-purple-500 to-purple-600';
      case 'important': return 'from-red-500 to-red-600';
      case 'warning': return 'from-yellow-500 to-yellow-600';
      case 'success': return 'from-green-500 to-green-600';
      default: return 'from-blue-500 to-blue-600';
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const date = parseISO(dateString);
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    if (isYesterday(date)) return 'Yesterday';
    return format(date, 'MMM dd, yyyy');
  };

  const formatTime = (dateString) => {
    return format(parseISO(dateString), 'h:mm a');
  };

  const filters = [
    { id: 'all', name: 'All Notices', count: notices.length },
    { id: 'pinned', name: 'Pinned', count: notices.filter(n => n.isPinned).length },
    { id: 'important', name: 'Important', count: notices.filter(n => n.type === 'important').length },
    { id: 'events', name: 'Events', count: notices.filter(n => n.type === 'event').length }
  ];

  const filteredNotices = notices.filter(notice => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'pinned') return notice.isPinned;
    if (activeFilter === 'important') return notice.type === 'important';
    if (activeFilter === 'events') return notice.type === 'event';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-purple-600 to-orange-500 rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center justify-center mb-4">
            <Bell className="h-12 w-12 text-yellow-300" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Notice Board</h1>
          <p className="text-xl text-purple-100">
            Stay updated with the latest announcements and important information
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.name} ({filter.count})
            </button>
          ))}
        </div>
      </div>

      {/* Notices */}
      <div className="space-y-6">
        {filteredNotices.map((notice) => {
          const TypeIcon = getTypeIcon(notice.type);
          return (
            <div
              key={notice.id}
              className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow ${
                notice.isPinned ? 'ring-2 ring-yellow-300' : ''
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${getTypeColor(notice.type)}`}>
                      <TypeIcon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        {notice.isPinned && (
                          <Pin className="h-4 w-4 text-yellow-500" />
                        )}
                        <h2 className="text-xl font-bold text-gray-900">{notice.title}</h2>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityBadge(notice.priority)}`}>
                          {notice.priority.toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-1" />
                          {notice.author}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(notice.date)}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {formatTime(notice.date)}
                        </div>
                        <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                          {notice.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="ml-16">
                  <p className="text-gray-700 leading-relaxed mb-4">{notice.content}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">Target audience:</span>
                      {notice.targetAudience.map((audience, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs capitalize"
                        >
                          {audience}
                        </span>
                      ))}
                    </div>
                    
                    {user.role === 'admin' && (
                      <div className="flex items-center space-x-2">
                        <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                          Edit
                        </button>
                        <button className="text-red-600 hover:text-red-700 text-sm font-medium">
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredNotices.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gradient-to-br from-purple-100 to-orange-100 rounded-full p-8 mx-auto w-24 h-24 flex items-center justify-center mb-4">
            <Bell className="h-8 w-8 text-purple-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No notices found</h3>
          <p className="text-gray-600">There are no notices matching your current filter</p>
        </div>
      )}

      {/* Create Notice Button (Admin Only) */}
      {user.role === 'admin' && (
        <div className="fixed bottom-8 right-8">
          <button className="bg-gradient-to-r from-purple-600 to-orange-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-shadow">
            <Bell className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  );
}