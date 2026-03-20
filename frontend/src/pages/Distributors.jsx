import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useParams } from 'react-router-dom';
import { Phone, DollarSign, Calendar, Filter } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { distributorsAPI, categoriesAPI } from '../services/api';
import { distributors as mockDistributors, categories as mockCategories } from '../data/mock-data';

const Distributors = () => {
  const [searchParams] = useSearchParams();
  const { slug } = useParams();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [distributors, setDistributors] = useState([]);
  const [allDistributors, setAllDistributors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await categoriesAPI.getAll();
        setCategories(res.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories(mockCategories);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchDistributors = async () => {
      setLoading(true);
      try {
        const res = await distributorsAPI.getAll({});
        setAllDistributors(res.data);
        setDistributors(res.data);
      } catch (error) {
        console.error('Error fetching distributors:', error);
        setAllDistributors(mockDistributors);
        setDistributors(mockDistributors);
      } finally {
        setLoading(false);
      }
    };
    fetchDistributors();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...allDistributors];

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(d => 
        d.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'newest':
        // Keep default order (newest first)
        break;
      case 'investment-low':
        filtered.sort((a, b) => {
          const getMinInvestment = (range) => {
            const match = range.match(/₹\s*(\d+)/);
            return match ? parseInt(match[1]) : 0;
          };
          return getMinInvestment(a.investmentRange) - getMinInvestment(b.investmentRange);
        });
        break;
      case 'investment-high':
        filtered.sort((a, b) => {
          const getMaxInvestment = (range) => {
            const matches = range.match(/₹\s*(\d+)/g);
            if (matches && matches.length > 1) {
              return parseInt(matches[1].replace('₹', '').trim());
            }
            return parseInt(matches ? matches[0].replace('₹', '').trim() : 0);
          };
          return getMaxInvestment(b.investmentRange) - getMaxInvestment(a.investmentRange);
        });
        break;
      case 'established':
        filtered.sort((a, b) => a.established - b.established);
        break;
      default:
        break;
    }

    setDistributors(filtered);
  }, [selectedCategory, sortBy, allDistributors]);

  const handleReset = () => {
    setSelectedCategory('all');
    setSortBy('newest');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#2C3E95] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading distributors...</p>
        </div>
      </div>
    );
  }

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

                <Button variant="outline" className="w-full" onClick={handleReset}>
                  Reset Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{distributors.length}</span> opportunities
            {selectedCategory !== 'all' && <span> in <span className="font-semibold">{selectedCategory}</span></span>}
          </p>
        </div>

        {/* Distributors Grid */}
        {distributors.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-gray-600 text-lg">No distributors found matching your criteria.</p>
            <Button onClick={handleReset} className="mt-4">Reset Filters</Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {distributors.map((distributor) => (
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
        )}

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
