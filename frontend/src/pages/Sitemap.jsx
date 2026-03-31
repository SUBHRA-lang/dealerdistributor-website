import React from 'react';
import { Link } from 'react-router-dom';
import { Map, ChevronRight, Home, Users, Briefcase, HelpCircle, Info, Mail, Star, FileText, User, UserPlus, Phone, MapPin } from 'lucide-react';
import { categories } from '../data/mock-data';

const Sitemap = () => {
  const sections = [
    {
      title: 'Quick Links',
      icon: ChevronRight,
      links: [
        { name: 'About us', path: '/about' },
        { name: 'Contact us', path: '/contact' },
        { name: 'Testimonials', path: '/testimonials' },
        { name: 'Blog', path: '/blog' },
      ]
    },
    {
      title: 'Distributors',
      icon: Users,
      links: categories.map(cat => ({ 
        name: cat.name, 
        path: `/distributors?category=${cat.slug}` 
      }))
    },
    {
      title: 'Dealers',
      icon: Briefcase,
      links: categories.map(cat => ({ 
        name: cat.name, 
        path: `/franchises?category=${cat.slug}` 
      }))
    },
    {
      title: 'Help & Legal',
      icon: HelpCircle,
      links: [
        { name: 'Feedback', path: '/feedback' },
        { name: 'Site map', path: '/sitemap' },
        { name: 'Terms & Conditions', path: '/terms' },
        { name: 'Privacy Policy', path: '/privacy' },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <div className="bg-[#2C3E95] py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
            <Map className="w-10 h-10 text-orange-500" />
          </div>
          <h1 className="text-5xl font-black mb-4">Site Map</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            A comprehensive overview of the DealerDistributors.com structure and offerings.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {sections.map((section, idx) => (
            <div key={idx} className="space-y-6">
              <div className="flex items-center gap-3 border-b-4 border-orange-500 pb-4">
                <div className="bg-[#2C3E95] p-2 rounded-lg text-white">
                  <section.icon className="w-6 h-6" />
                </div>
                <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight">
                  {section.title}
                </h2>
              </div>
              
              <ul className="space-y-3">
                {section.links.map((link, lIdx) => (
                  <li key={lIdx} className="group">
                    <Link 
                      to={link.path} 
                      className="flex items-center gap-2 text-gray-600 hover:text-[#2C3E95] font-medium transition-all group-hover:translate-x-1"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-gray-300 group-hover:bg-orange-500 transition-colors" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Improved Info Section with specific Address provided by user */}
      <div className="bg-gray-50 py-20 border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-black text-[#2C3E95] mb-4">Contact Our Support Team</h2>
              <div className="w-20 h-1.5 bg-orange-500 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-3xl shadow-xl shadow-blue-900/5 text-center">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <MapPin className="w-6 h-6 text-[#2C3E95]" />
                </div>
                <h4 className="font-black text-gray-900 mb-3">Address</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  131/C, Acharya Prafulla Chandra Rd, Manicktala, Goa Bagan, Ward Number 16, Kolkata, West Bengal 700006
                </p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-xl shadow-blue-900/5 text-center">
                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Phone className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className="font-black text-gray-900 mb-3">Phone</h4>
                <p className="text-gray-600 text-lg font-bold">7603009254</p>
              </div>

              <div className="bg-white p-8 rounded-3xl shadow-xl shadow-blue-900/5 text-center">
                <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-black text-gray-900 mb-3">Email</h4>
                <div className="space-y-1">
                  <p className="text-[#2C3E95] font-bold">query@dealerdistributors.com</p>
                  <p className="text-[#2C3E95] font-bold">greenson@dealerdistributors.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
