import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useToast } from '../hooks/use-toast';
import { newsletterAPI } from '../services/api';

const Footer = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      await newsletterAPI.subscribe(email);
      
      toast({
        title: 'Subscribed!',
        description: 'Thank you for subscribing to our newsletter.',
      });
      
      setEmail('');
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      toast({
        title: 'Error',
        description: 'Failed to subscribe. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-700">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h3>
            <p className="text-gray-300 mb-6">For Exclusive Updates, Latest Trends, and Exciting Business Opportunities!</p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white text-gray-900 flex-1"
                required
              />
              <Button 
                type="submit" 
                className="bg-[#FF6B2C] hover:bg-[#e55a1f]"
                disabled={submitting}
              >
                {submitting ? 'Subscribing...' : 'Subscribe'}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* About & Contact */}
          <div className="md:col-span-1">
            <h4 className="text-lg font-bold mb-6 border-b-2 border-orange-500 pb-2 inline-block">Contact Us</h4>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange-500 shrink-0" />
                <span>131/C, APC Rd, Kolkata, WB 700006</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-orange-500 shrink-0" />
                <span>7603009254</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-orange-500 shrink-0" />
                <span className="break-all">query@dealerdistributors.com</span>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-b-2 border-orange-500 pb-2 inline-block">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-gray-300 hover:text-orange-500 transition-colors">About us</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-orange-500 transition-colors">Contact us</Link></li>
              <li><Link to="/testimonials" className="text-gray-300 hover:text-orange-500 transition-colors">Testimonials</Link></li>
              <li><Link to="/blog" className="text-gray-300 hover:text-orange-500 transition-colors">Blog</Link></li>
            </ul>
          </div>

          {/* Business Sections */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-b-2 border-orange-500 pb-2 inline-block">Opportunities</h4>
            <ul className="space-y-3">
              <li><Link to="/distributors" className="text-gray-300 hover:text-orange-500 transition-colors">Distributorships</Link></li>
              <li><Link to="/franchises" className="text-gray-300 hover:text-orange-500 transition-colors">Franchises</Link></li>
              <li><Link to="/request-callback" className="text-gray-300 hover:text-orange-500 transition-colors">Request Call Back</Link></li>
              <li><Link to="/post-requirement" className="text-gray-300 hover:text-orange-500 transition-colors">Post Requirement</Link></li>
            </ul>
          </div>

          {/* Legal & Help */}
          <div>
            <h4 className="text-lg font-bold mb-6 border-b-2 border-orange-500 pb-2 inline-block">Help & Support</h4>
            <ul className="space-y-3">
              <li><Link to="/feedback" className="text-gray-300 hover:text-orange-500 transition-colors">Feedback</Link></li>
              <li><Link to="/sitemap" className="text-gray-300 hover:text-orange-500 transition-colors">Site map</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-orange-500 transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400 text-xs">
          <p className="max-w-3xl mx-auto leading-relaxed">
            DealerDistributors.com - An ideal platform for anybody who is looking forward to Appointing or Becoming a Distributor, Franchisee and Sales Agent.
          </p>
          <p className="mt-4 font-semibold uppercase tracking-widest text-gray-500">© 2025 DealerDistributors. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
