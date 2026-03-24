import React from 'react';
import { Link } from 'react-router-dom';
import { Map, ChevronRight, Home, Users, Briefcase, HelpCircle, Info, Mail, Star, FileText } from 'lucide-react';
import { categories } from '../data/mock-data';

const Sitemap = () => {
  const mainLinks = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About Us', path: '/about', icon: Info },
    { name: 'Contact Us', path: '/contact', icon: Mail },
    { name: 'Testimonials', path: '/testimonials', icon: Star },
    { name: 'Blog', path: '/blog', icon: FileText },
    { name: 'Feedback', path: '/feedback', icon: Mail },
    { name: 'Request Callback', path: '/request-callback', icon: Phone },
    { name: 'Post Requirement', path: '/post-requirement', icon: FileText },
    { name: 'Sign In', path: '/signin', icon: User },
    { name: 'Join Now', path: '/join', icon: UserPlus },
  ];

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
      title: 'Franchises',
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
      ]
    }
  ];

  // Helper for icons (some might not be imported)
  const IconWrapper = ({ icon: IconComponent }) => IconComponent ? <IconComponent className="w-5 h-5" /> : <Map className="w-5 h-5" />;

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

      {/* Footer Info Section */}
      <div className="bg-gray-50 py-16 border-t border-gray-100">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 font-medium">Looking for something specific that you can't find here?</p>
          <Link to="/contact" className="text-[#2C3E95] font-black hover:underline mt-2 inline-block text-lg">
            Contact our support team
          </Link>
        </div>
      </div>
    </div>
  );
};

// Mock icon placeholders for those not imported to avoid crashes
const User = () => null;
const UserPlus = () => null;
const Phone = () => null;

export default Sitemap;
