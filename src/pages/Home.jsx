import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Users, BookOpen, Award, Star, ArrowRight } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: Heart,
      title: 'Nurturing Care',
      description: 'We provide a loving and supportive environment where every child feels valued and secure.'
    },
    {
      icon: Users,
      title: 'Expert Teachers',
      description: 'Our qualified and experienced teachers are passionate about early childhood development.'
    },
    {
      icon: BookOpen,
      title: 'Learning Through Play',
      description: 'We believe in making learning fun and engaging through interactive play-based activities.'
    },
    {
      icon: Award,
      title: 'Quality Education',
      description: 'Our curriculum is designed to prepare children for their educational journey ahead.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Parent',
      content: 'OVIYA Nursery has been wonderful for my daughter. The teachers are caring and the communication through their platform is excellent.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1239288/pexels-photo-1239288.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    {
      name: 'Michael Chen',
      role: 'Parent',
      content: 'The progress reports and daily updates help me stay connected with my sons development. Highly recommended!',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    },
    {
      name: 'Emily Davis',
      role: 'Parent',
      content: 'Amazing nursery with dedicated staff. The online chat feature makes communication so much easier.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-pink-500 to-rose-400 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Welcome to <span className="text-pink-100">OVIYA</span> Nursery School
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Where little minds bloom and dreams take flight. Join our nurturing community today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="bg-white text-pink-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-pink-50 transition-colors inline-flex items-center justify-center"
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-white hover:text-pink-600 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose OVIYA Nursery?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide a comprehensive early childhood education experience that nurtures every aspect of your child's development.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-xl bg-gradient-to-br from-pink-50 to-rose-50 hover:shadow-lg transition-shadow"
              >
                <div className="bg-gradient-to-r from-pink-500 to-rose-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-pink-100 to-rose-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-pink-600 mb-2">150+</div>
              <div className="text-gray-700">Happy Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-rose-500 mb-2">15+</div>
              <div className="text-gray-700">Expert Teachers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-pink-600 mb-2">8+</div>
              <div className="text-gray-700">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-rose-500 mb-2">98%</div>
              <div className="text-gray-700">Parent Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Parents Say
            </h2>
            <p className="text-xl text-gray-600">
              Hear from our amazing community of parents and families.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-lg border hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-pink-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 italic">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-rose-400 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Join Our Family?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Give your child the best start in their educational journey. Connect with our teachers, stay updated with progress, and be part of our growing community.
          </p>
          <Link
            to="/login"
            className="bg-white text-pink-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-pink-50 transition-colors inline-flex items-center"
          >
            Join Today <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}