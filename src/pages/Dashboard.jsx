import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MessageCircle, 
  Bell, 
  FileText, 
  Calendar, 
  Users, 
  BookOpen,
  Award,
  Clock,
  TrendingUp,
  Heart
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const quickActions = [
    {
      title: 'Chat with Teachers',
      description: 'Connect with your child\'s teachers',
      icon: MessageCircle,
      link: '/chat',
      color: 'from-blue-500 to-blue-600',
      parentOnly: true
    },
    {
      title: 'Chat with Parents',
      description: 'Connect with parents',
      icon: MessageCircle,
      link: '/chat',
      color: 'from-blue-500 to-blue-600',
      teacherOnly: true
    },
    {
      title: 'Notice Board',
      description: 'Latest announcements and updates',
      icon: Bell,
      link: '/notice',
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'View Reports',
      description: 'Progress reports and assessments',
      icon: FileText,
      link: '/reports',
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'School Calendar',
      description: 'Events and important dates',
      icon: Calendar,
      link: '#',
      color: 'from-orange-500 to-orange-600'
    }
  ];

  const filteredActions = quickActions.filter(action => {
    if (action.parentOnly && user.role !== 'parent') return false;
    if (action.teacherOnly && user.role !== 'teacher') return false;
    return true;
  });

  const recentActivity = [
    {
      title: 'New message from Ms. Sarah',
      time: '2 hours ago',
      type: 'message',
      icon: MessageCircle
    },
    {
      title: 'Weekly progress report available',
      time: '1 day ago',
      type: 'report',
      icon: FileText
    },
    {
      title: 'School picnic announcement',
      time: '2 days ago',
      type: 'announcement',
      icon: Bell
    }
  ];

  const stats = {
    parent: [
      { label: 'Messages', value: '12', icon: MessageCircle, color: 'text-blue-600' },
      { label: 'Attendance', value: '95%', icon: Calendar, color: 'text-green-600' },
      { label: 'Activities', value: '8', icon: BookOpen, color: 'text-purple-600' },
      { label: 'Achievements', value: '3', icon: Award, color: 'text-orange-600' }
    ],
    teacher: [
      { label: 'Students', value: '24', icon: Users, color: 'text-blue-600' },
      { label: 'Messages', value: '18', icon: MessageCircle, color: 'text-green-600' },
      { label: 'Reports Due', value: '5', icon: FileText, color: 'text-purple-600' },
      { label: 'Activities', value: '12', icon: BookOpen, color: 'text-orange-600' }
    ],
    admin: [
      { label: 'Total Students', value: '150', icon: Users, color: 'text-blue-600' },
      { label: 'Teachers', value: '15', icon: Users, color: 'text-green-600' },
      { label: 'Reports', value: '45', icon: FileText, color: 'text-purple-600' },
      { label: 'Events', value: '8', icon: Calendar, color: 'text-orange-600' }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-purple-600 to-orange-500 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                {getGreeting()}, {user.name}!
              </h1>
              <p className="text-purple-100 capitalize">
                Welcome to your {user.role} dashboard
              </p>
            </div>
            <div className="hidden md:block">
              <img
                src={user.avatar}
                alt={user.name}
                className="h-20 w-20 rounded-full border-4 border-white object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        {stats[user.role].map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredActions.map((action, index) => (
              <Link
                key={index}
                to={action.link}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${action.color} mb-4`}>
                  <action.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{action.title}</h3>
                <p className="text-gray-600">{action.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-shrink-0">
                    <activity.icon className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                    <p className="text-xs text-gray-500 flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t">
              <Link
                to="/notice"
                className="text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                View all notifications →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Today's Schedule (if applicable) */}
      {user.role === 'teacher' && (
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Today's Schedule</h2>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="space-y-4">
              {[
                { time: '9:00 AM', activity: 'Morning Circle Time', class: 'Pre-K A' },
                { time: '10:30 AM', activity: 'Art & Craft', class: 'Pre-K A' },
                { time: '2:00 PM', activity: 'Story Time', class: 'Pre-K B' },
                { time: '3:30 PM', activity: 'Parent Meeting', class: 'Emma Johnson' }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-4 p-3 rounded-lg bg-gray-50">
                  <div className="text-sm font-medium text-purple-600 min-w-0 w-20">
                    {item.time}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{item.activity}</p>
                    <p className="text-xs text-gray-500">{item.class}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}