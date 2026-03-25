import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Target, Users, Award, TrendingUp } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#2C3E95] to-[#4C3F91] text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About DealerDistributors.com</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            India's Leading B2B Platform Connecting Manufacturers, Distributors, and Franchisees
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Mission</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-4">
                  DealerDistributors.com is dedicated to bridging the gap between manufacturers seeking to expand their distribution networks and entrepreneurs looking for profitable business opportunities. We provide a comprehensive platform that simplifies the process of finding, connecting, and partnering with the right business associates.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  With over 1.2 lakh distributors registered on our platform, we've become India's most trusted marketplace for distributorship and franchise opportunities across all major industries.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-xl transition">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-[#2C3E95]" />
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">1.2L+</h3>
                <p className="text-gray-600">Registered Distributors</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">36+</h3>
                <p className="text-gray-600">Industry Categories</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">5000+</h3>
                <p className="text-gray-600">Active Brands</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-xl transition">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-[#FF6B2C]" />
                </div>
                <h3 className="text-4xl font-bold text-gray-900 mb-2">98%</h3>
                <p className="text-gray-600">Success Rate</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="hover:shadow-xl transition">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Trust & Transparency</h3>
                <p className="text-gray-700">
                  We believe in building lasting relationships through honest communication and verified listings.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quality Over Quantity</h3>
                <p className="text-gray-700">
                  Every opportunity on our platform is carefully vetted to ensure genuine business prospects.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-xl transition">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Customer Success</h3>
                <p className="text-gray-700">
                  Your growth is our success. We provide dedicated support at every step of your journey.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-[#2C3E95] to-[#4C3F91] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Grow Your Business?</h2>
          <p className="text-xl text-blue-100 mb-8">Join thousands of successful entrepreneurs on our platform</p>
          <Link to="/join">
            <Button size="lg" className="bg-[#FF6B2C] hover:bg-[#e55a1f] rounded-full px-8">
              Get Started Today
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
