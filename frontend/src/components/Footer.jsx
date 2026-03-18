import React from 'react';
import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const Footer = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing!');
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-700">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h3>
            <p className="text-gray-300 mb-6">For Exclusive Updates, Latest Trends, and Exciting Business Opportunities!</p>
            <form onSubmit={handleSubscribe} className="flex gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white text-gray-900 flex-1"
                required
              />
              <Button type="submit" className="bg-[#FF6B2C] hover:bg-[#e55a1f]">
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-white transition">About us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition">Contact us</Link></li>
              <li><Link to="/testimonials" className="text-gray-300 hover:text-white transition">Testimonials</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-white transition">Blog</Link></li>
            </ul>
          </div>

          {/* GetDistributors */}
          <div>
            <h4 className="text-lg font-semibold mb-4">GetDistributors</h4>
            <ul className="space-y-2">
              <li><Link to="/membership" className="text-gray-300 hover:text-white transition">Membership</Link></li>
              <li><Link to="/callback" className="text-gray-300 hover:text-white transition">Request a callback</Link></li>
            </ul>
          </div>

          {/* Looking for */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Looking for</h4>
            <ul className="space-y-2">
              <li><Link to="/distributors" className="text-gray-300 hover:text-white transition">Distributor</Link></li>
              <li><Link to="/franchises" className="text-gray-300 hover:text-white transition">Franchisor</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Help</h4>
            <ul className="space-y-2">
              <li><Link to="/feedback" className="text-gray-300 hover:text-white transition">Feedback</Link></li>
              <li><Link to="/sitemap" className="text-gray-300 hover:text-white transition">Site map</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-white transition">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>GetDistributors.com - An ideal platform for anybody who is looking forward to Appointing or Becoming a Distributor, Franchisee and Sales Agent.</p>
          <p className="mt-2">© 2025 Infocom Network Private Limited. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
