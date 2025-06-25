import React, { useState } from 'react';
import { Search, Filter, Grid, List, Calendar, Users, MapPin, Heart } from 'lucide-react';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 'all', name: 'All Photos', count: 48 },
    { id: 'activities', name: 'Activities', count: 15 },
    { id: 'events', name: 'Events', count: 12 },
    { id: 'classroom', name: 'Classroom', count: 10 },
    { id: 'outdoor', name: 'Outdoor Play', count: 8 },
    { id: 'arts', name: 'Arts & Crafts', count: 6 }
  ];

  const photos = [
    {
      id: 1,
      title: 'Art & Craft Session',
      category: 'activities',
      date: '2024-01-15',
      location: 'Art Room',
      participants: 12,
      image: 'https://images.pexels.com/photos/1094072/pexels-photo-1094072.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Children exploring creativity through colorful art projects'
    },
    {
      id: 2,
      title: 'Story Time Circle',
      category: 'classroom',
      date: '2024-01-14',
      location: 'Main Classroom',
      participants: 18,
      image: 'https://images.pexels.com/photos/8613317/pexels-photo-8613317.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Engaging storytelling session with our little learners'
    },
    {
      id: 3,
      title: 'Outdoor Adventure',
      category: 'outdoor',
      date: '2024-01-13',
      location: 'School Garden',
      participants: 20,
      image: 'https://images.pexels.com/photos/8613095/pexels-photo-8613095.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Exploring nature and having fun in our beautiful garden'
    },
    {
      id: 4,
      title: 'Science Discovery',
      category: 'activities',
      date: '2024-01-12',
      location: 'Discovery Lab',
      participants: 15,
      image: 'https://images.pexels.com/photos/8613354/pexels-photo-8613354.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Hands-on science experiments and discoveries'
    },
    {
      id: 5,
      title: 'Music & Movement',
      category: 'activities',
      date: '2024-01-11',
      location: 'Music Room',
      participants: 16,
      image: 'https://images.pexels.com/photos/8613323/pexels-photo-8613323.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Dancing and singing together in our music sessions'
    },
    {
      id: 6,
      title: 'Graduation Day',
      category: 'events',
      date: '2024-01-10',
      location: 'Main Hall',
      participants: 25,
      image: 'https://images.pexels.com/photos/8613086/pexels-photo-8613086.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Celebrating our little graduates moving to primary school'
    },
    {
      id: 7,
      title: 'Playground Fun',
      category: 'outdoor',
      date: '2024-01-09',
      location: 'Playground',
      participants: 22,
      image: 'https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Active play and developing motor skills'
    },
    {
      id: 8,
      title: 'Building Blocks',
      category: 'classroom',
      date: '2024-01-08',
      location: 'Construction Corner',
      participants: 10,
      image: 'https://images.pexels.com/photos/8613272/pexels-photo-8613272.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Creative construction and problem-solving activities'
    },
    {
      id: 9,
      title: 'Cooking Workshop',
      category: 'activities',
      date: '2024-01-07',
      location: 'Kitchen Lab',
      participants: 8,
      image: 'https://images.pexels.com/photos/8613284/pexels-photo-8613284.jpeg?auto=compress&cs=tinysrgb&w=800',
      description: 'Learning about healthy foods and cooking basics'
    }
  ];

  const filteredPhotos = photos.filter(photo => {
    const matchesCategory = activeCategory === 'all' || photo.category === activeCategory;
    const matchesSearch = photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         photo.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="bg-gradient-to-r from-purple-600 to-orange-500 rounded-2xl p-8 text-white mb-8">
          <h1 className="text-4xl font-bold mb-4">Photo Gallery</h1>
          <p className="text-xl text-purple-100">
            Capturing precious moments and milestones in our children's journey
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search photos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-white shadow-sm text-purple-600' : 'text-gray-600'
              }`}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-white shadow-sm text-purple-600' : 'text-gray-600'
              }`}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 mt-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>
      </div>

      {/* Photo Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
            >
              <div className="relative overflow-hidden">
                <img
                  src={photo.image}
                  alt={photo.title}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Heart className="h-5 w-5 text-red-500" />
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{photo.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{photo.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(photo.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      {photo.participants}
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {photo.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className={`flex items-center p-6 hover:bg-gray-50 transition-colors ${
                index !== filteredPhotos.length - 1 ? 'border-b border-gray-200' : ''
              }`}
            >
              <img
                src={photo.image}
                alt={photo.title}
                className="w-20 h-20 object-cover rounded-lg mr-6"
              />
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{photo.title}</h3>
                <p className="text-gray-600 text-sm mb-2">{photo.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(photo.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    {photo.participants} children
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    {photo.location}
                  </div>
                </div>
              </div>
              <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors">
                <Heart className="h-5 w-5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {filteredPhotos.length === 0 && (
        <div className="text-center py-12">
          <div className="bg-gradient-to-br from-purple-100 to-orange-100 rounded-full p-8 mx-auto w-24 h-24 flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-purple-500" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No photos found</h3>
          <p className="text-gray-600">Try adjusting your search or category filter</p>
        </div>
      )}
    </div>
  );
}