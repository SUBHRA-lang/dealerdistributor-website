import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Phone, DollarSign, Calendar, Filter } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { distributors, categories } from '../data/mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';

const Distributors = () => {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Filter distributors based on category
  const filteredDistributors = selectedCategory === 'all'
    ? distributors
    : distributors.filter(d => d.category.toLowerCase().includes(selectedCategory.toLowerCase()));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Distributor Opportunities</h1>
          <p className="text-lg text-gray-600">Explore premium distributorship opportunities across India</p>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-gray-600" />
              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map(cat => (
                      <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort By" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="investment-low">Investment: Low to High</SelectItem>
                    <SelectItem value="investment-high">Investment: High to Low</SelectItem>
                    <SelectItem value="established">Most Established</SelectItem>
                  </SelectContent>
                </Select>

                <Button variant="outline" className="w-full">
                  Reset Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{filteredDistributors.length}</span> opportunities
          </p>
        </div>

        {/* Distributors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDistributors.map((distributor) => (
            <Card key={distributor.id} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <img
                    src={distributor.logo}
                    alt={distributor.name}
                    className="w-16 h-16 rounded object-cover"
                  />
                  <div className="flex-1">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 mb-2">
                      {distributor.category}
                    </Badge>
                    <Link to={`/distributor/${distributor.id}`}>
                      <h3 className="font-bold text-lg hover:text-[#2C3E95] transition">
                        {distributor.name}
                      </h3>
                    </Link>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="text-gray-600">Investment:</span>
                    <span className="font-semibold text-gray-900">{distributor.investmentRange}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-blue-600" />
                    <span className="text-gray-600">Established:</span>
                    <span className="font-semibold text-gray-900">{distributor.established}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-gray-600 mb-2">Distributors of:</p>
                  <p className="text-sm text-gray-800 line-clamp-2">{distributor.products.join(', ')}</p>
                </div>

                <div className="flex gap-2">
                  <a href={`tel:${distributor.phone}`} className="flex-1">
                    <Button variant="outline" className="w-full">
                      <Phone className="w-4 h-4 mr-2" />
                      Call
                    </Button>
                  </a>
                  <Link to={`/distributor/${distributor.id}`} className="flex-1">
                    <Button className="w-full bg-[#2C3E95] hover:bg-[#1f2d6b]">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <Card className="mt-12 bg-gradient-to-r from-[#2C3E95] to-[#4C3F91] text-white">
          <CardContent className="p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
            <p className="text-lg mb-6 text-blue-100">Post your requirement and let distributors come to you!</p>
            <Link to="/post-requirement">
              <Button size="lg" className="bg-[#FF6B2C] hover:bg-[#e55a1f] rounded-full px-8">
                Post Your Requirement
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Distributors;
