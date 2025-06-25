import React, { useState } from 'react';
import { FileText, Download, Calendar, TrendingUp, Star, BarChart3, PieChart, User, Award, Clock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Reports() {
  const { user } = useAuth();
  const [selectedChild, setSelectedChild] = useState('emma');
  const [activeTab, setActiveTab] = useState('progress');

  // Mock data for different children (for parents) or students (for teachers)
  const children = {
    emma: {
      name: 'Emma Smith',
      age: 4,
      class: 'Pre-K A',
      avatar: 'https://images.pexels.com/photos/8613317/pexels-photo-8613317.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    alex: {
      name: 'Alex Johnson',
      age: 5,
      class: 'Pre-K B',
      avatar: 'https://images.pexels.com/photos/8613095/pexels-photo-8613095.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    }
  };

  const progressData = {
    emma: {
      overall: 85,
      subjects: [
        { name: 'Language & Literacy', score: 90, improvement: '+5', color: 'from-purple-400 to-purple-500' },
        { name: 'Mathematics', score: 82, improvement: '+3', color: 'from-blue-400 to-blue-500' },
        { name: 'Social Skills', score: 88, improvement: '+7', color: 'from-green-400 to-green-500' },
        { name: 'Creative Arts', score: 85, improvement: '+2', color: 'from-orange-400 to-orange-500' },
        { name: 'Physical Development', score: 80, improvement: '+4', color: 'from-red-400 to-red-500' },
        { name: 'Science & Discovery', score: 78, improvement: '+6', color: 'from-indigo-400 to-indigo-500' }
      ],
      attendance: 96,
      behavior: 'Excellent',
      milestones: [
        { title: 'First time reading a sentence', date: '2024-01-15', achieved: true },
        { title: 'Counting to 50', date: '2024-01-10', achieved: true },
        { title: 'Sharing toys with friends', date: '2024-01-08', achieved: true },
        { title: 'Writing first name', date: '2024-01-20', achieved: false }
      ]
    }
  };

  const assessments = [
    {
      id: 1,
      title: 'Monthly Progress Assessment',
      date: '2024-01-15',
      teacher: 'Ms. Sarah Johnson',
      type: 'Comprehensive',
      status: 'Completed',
      score: 85,
      file: 'january_assessment.pdf'
    },
    {
      id: 2,
      title: 'Creative Arts Evaluation',
      date: '2024-01-10',
      teacher: 'Ms. Lisa Brown',
      type: 'Subject-specific',
      status: 'Completed',
      score: 88,
      file: 'arts_evaluation.pdf'
    },
    {
      id: 3,
      title: 'Social Skills Review',
      date: '2024-01-05',
      teacher: 'Mr. David Wilson',
      type: 'Behavioral',
      status: 'Completed',
      score: 92,
      file: 'social_skills.pdf'
    }
  ];

  const achievements = [
    {
      id: 1,
      title: 'Reading Star',
      description: 'Completed 10 books this month',
      date: '2024-01-18',
      icon: '📚',
      color: 'from-purple-400 to-purple-500'
    },
    {
      id: 2,
      title: 'Helper of the Week',
      description: 'Outstanding assistance to classmates',
      date: '2024-01-12',
      icon: '🤝',
      color: 'from-green-400 to-green-500'
    },
    {
      id: 3,
      title: 'Creative Artist',
      description: 'Exceptional artwork in art class',
      date: '2024-01-08',
      icon: '🎨',
      color: 'from-orange-400 to-orange-500'
    },
    {
      id: 4,
      title: 'Math Explorer',
      description: 'Mastered counting and basic addition',
      date: '2024-01-03',
      icon: '🔢',
      color: 'from-blue-400 to-blue-500'
    }
  ];

  const tabs = [
    { id: 'progress', name: 'Progress Overview', icon: TrendingUp },
    { id: 'assessments', name: 'Assessments', icon: FileText },
    { id: 'achievements', name: 'Achievements', icon: Award },
    { id: 'attendance', name: 'Attendance', icon: Calendar }
  ];

  const child = children[selectedChild];
  const progress = progressData[selectedChild];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="bg-gradient-to-r from-purple-600 to-orange-500 rounded-2xl p-8 text-white mb-8">
          <div className="flex items-center justify-center mb-4">
            <BarChart3 className="h-12 w-12 text-yellow-300" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Progress Reports</h1>
          <p className="text-xl text-purple-100">
            Track development and celebrate achievements
          </p>
        </div>
      </div>

      {/* Child Selector (for parents with multiple children) */}
      {user.role === 'parent' && Object.keys(children).length > 1 && (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Child</h2>
          <div className="flex space-x-4">
            {Object.entries(children).map(([key, child]) => (
              <button
                key={key}
                onClick={() => setSelectedChild(key)}
                className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all ${
                  selectedChild === key
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <img
                  src={child.avatar}
                  alt={child.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="text-left">
                  <h3 className="font-semibold text-gray-900">{child.name}</h3>
                  <p className="text-sm text-gray-600">{child.class} • Age {child.age}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Child Info Header */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img
              src={child.avatar}
              alt={child.name}
              className="h-16 w-16 rounded-full object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{child.name}</h2>
              <div className="flex items-center space-x-4 text-gray-600">
                <span>{child.class}</span>
                <span>•</span>
                <span>Age {child.age}</span>
                <span>•</span>
                <span>Attendance: {progress.attendance}%</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-purple-600 mb-1">
              {progress.overall}%
            </div>
            <div className="text-sm text-gray-600">Overall Progress</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-lg mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="h-5 w-5" />
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Progress Overview Tab */}
          {activeTab === 'progress' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Subject Progress */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Subject Progress</h3>
                  <div className="space-y-4">
                    {progress.subjects.map((subject, index) => (
                      <div key={index} className="relative">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">{subject.name}</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-bold text-gray-900">{subject.score}%</span>
                            <span className="text-xs text-green-600">{subject.improvement}</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`bg-gradient-to-r ${subject.color} h-2 rounded-full transition-all duration-500`}
                            style={{ width: `${subject.score}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Milestones */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Milestones</h3>
                  <div className="space-y-4">
                    {progress.milestones.map((milestone, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                          milestone.achieved ? 'bg-green-100' : 'bg-gray-100'
                        }`}>
                          {milestone.achieved ? (
                            <Star className="h-4 w-4 text-green-600 fill-current" />
                          ) : (
                            <Clock className="h-4 w-4 text-gray-400" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium ${
                            milestone.achieved ? 'text-gray-900' : 'text-gray-500'
                          }`}>
                            {milestone.title}
                          </p>
                          <p className="text-xs text-gray-500">{milestone.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Assessments Tab */}
          {activeTab === 'assessments' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Assessment Reports</h3>
                <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-600 hover:to-purple-700 transition-colors">
                  Download All
                </button>
              </div>
              <div className="space-y-4">
                {assessments.map((assessment) => (
                  <div key={assessment.id} className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-3 rounded-lg">
                          <FileText className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{assessment.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                            <span>By {assessment.teacher}</span>
                            <span>•</span>
                            <span>{assessment.date}</span>
                            <span>•</span>
                            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs">
                              {assessment.type}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-2xl font-bold text-purple-600">{assessment.score}%</div>
                          <div className="text-xs text-gray-500">{assessment.status}</div>
                        </div>
                        <button className="bg-white text-purple-600 border border-purple-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-50 transition-colors flex items-center space-x-2">
                          <Download className="h-4 w-4" />
                          <span>Download</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Achievements</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
                    <div className="flex items-start space-x-4">
                      <div className={`bg-gradient-to-r ${achievement.color} p-3 rounded-full text-2xl`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-gray-900 mb-1">{achievement.title}</h4>
                        <p className="text-gray-600 text-sm mb-2">{achievement.description}</p>
                        <p className="text-xs text-gray-500">{achievement.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Attendance Tab */}
          {activeTab === 'attendance' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Attendance Overview</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-green-600">Present Days</p>
                      <p className="text-3xl font-bold text-green-700">48</p>
                    </div>
                    <Calendar className="h-8 w-8 text-green-500" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-yellow-600">Absent Days</p>
                      <p className="text-3xl font-bold text-yellow-700">2</p>
                    </div>
                    <Calendar className="h-8 w-8 text-yellow-500" />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Attendance Rate</p>
                      <p className="text-3xl font-bold text-blue-700">96%</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-blue-500" />
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Monthly Breakdown</h4>
                <div className="grid grid-cols-7 gap-2 text-center text-sm">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                    <div key={day} className="font-medium text-gray-600 p-2">{day}</div>
                  ))}
                  {/* Mock calendar grid */}
                  {Array.from({ length: 31 }, (_, i) => (
                    <div
                      key={i}
                      className={`p-2 rounded ${
                        Math.random() > 0.1
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}