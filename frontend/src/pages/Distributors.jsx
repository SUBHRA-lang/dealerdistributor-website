import React, { useState, useEffect } from 'react';
import { useSearchParams, Link, useParams, useLocation } from 'react-router-dom';
import { Phone, DollarSign, Calendar, Filter, Search, Grid, List, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Input } from '../components/ui/input';
import { distributorsAPI, categoriesAPI } from '../services/api';
import { distributors as mockDistributors, categories as mockCategories } from '../data/mock-data';

const Distributors = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('q') || '';

  const { slug } = useParams();
  const location = useLocation();
  const isFranchise = location.pathname.includes('franchise');
  
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  // Sync state if URL search params change
  useEffect(() => {
    const q = searchParams.get('q') || '';
    const c = searchParams.get('category') || 'all';
    setSearchQuery(q);
    setSelectedCategory(c);
  }, [searchParams]);
  const [distributors, setDistributors] = useState([]);
  const [allDistributors, setAllDistributors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');

  // Page Content Configuration
  const pageConfig = {
    title: isFranchise ? 'Dealers Opportunities' : 'Distributor Opportunities',
    description: isFranchise 
      ? 'Explore low-cost and premium dealers business opportunities across India' 
      : 'Explore premium distributorship opportunities across India',
    placeholder: isFranchise ? 'Search dealers...' : 'Search distributors...',
    type: isFranchise ? 'franchise' : 'distributor'
  };

  const categoryFallbackImages = {
    'Food & Beverage':                  'https://images.unsplash.com/photo-1543353071-873f17a7a088?w=400&h=200&fit=crop&auto=format',
    'FMCG':                             'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=200&fit=crop&auto=format',
    'Health & Beauty':                  'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=200&fit=crop&auto=format',
    'Pharmaceuticals':                  'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=200&fit=crop&auto=format',
    'Apparel & Fashion':                'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=200&fit=crop&auto=format',
    'Chemicals':                        'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=200&fit=crop&auto=format',
    'Home Supplies':                    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=200&fit=crop&auto=format',
    'Construction & Real Estate':       'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&h=200&fit=crop&auto=format',
    'Electronics & Electrical Supplies':'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop&auto=format',
    'Agriculture':                      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=400&h=200&fit=crop&auto=format',
    'Automobile':                       'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=200&fit=crop&auto=format',
    'Packaging & Paper':                'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&h=200&fit=crop&auto=format',
    'Hospital & Medical Supplies':      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=200&fit=crop&auto=format',
    'Gifts & Crafts':                   'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=200&fit=crop&auto=format',
    'Consumer Electronics':             'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=200&fit=crop&auto=format',
    'Pipes, Tubes & Fittings':          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop&auto=format',
    'Industrial Supplies':              'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=200&fit=crop&auto=format',
  };

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
        const apiData = res.data || [];
        setAllDistributors([...apiData, ...mockDistributors.filter(md => !apiData.some(ad => ad.name === md.name))]);
      } catch (error) {
        console.error('Error fetching distributors:', error);
        setAllDistributors(mockDistributors);
      } finally {
        setLoading(false);
      }
    };
    fetchDistributors();
  }, []);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = allDistributors.filter(d => {
      const itemType = d.type || 'distributor';
      return itemType === pageConfig.type;
    });

    // Filter by keyword
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(d => 
        (d.name && d.name.toLowerCase().includes(query)) || 
        (d.products && d.products.some(p => {
          const productName = typeof p === 'object' ? p.name : p;
          return productName && productName.toLowerCase().includes(query);
        })) ||
        (d.category && d.category.toLowerCase().includes(query))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(d => 
        d.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => b.established - a.established);
        break;
      case 'investment-low':
        filtered.sort((a, b) => {
          const getMinInvestment = (range) => {
            const match = range.replace(/,/g, '').match(/₹\s*(\d+)/);
            return match ? parseInt(match[1]) : 0;
          };
          return getMinInvestment(a.investmentRange) - getMinInvestment(b.investmentRange);
        });
        break;
      case 'investment-high':
        filtered.sort((a, b) => {
          const getMaxInvestment = (range) => {
            const matches = range.replace(/,/g, '').match(/₹\s*(\d+)/g);
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
  }, [selectedCategory, sortBy, searchQuery, allDistributors, pageConfig.type]);

  const handleReset = () => {
    setSelectedCategory('all');
    setSortBy('newest');
    setSearchQuery('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#2C3E95] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading {isFranchise ? 'dealers' : 'distributors'}...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Search Section */}
      <div className="bg-[#2C3E95] py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{pageConfig.title}</h1>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">{pageConfig.description}</p>
          
          <form 
            onSubmit={(e) => e.preventDefault()}
            className="max-w-3xl mx-auto relative group"
          >
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-gray-400 group-focus-within:text-[#2C3E95] transition-colors" />
            </div>
            <Input
              type="text"
              placeholder={pageConfig.placeholder}
              className="w-full pl-12 pr-4 py-8 text-lg rounded-full border-none shadow-2xl text-gray-900 focus-visible:ring-4 focus-visible:ring-orange-500/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
              type="submit"
              className="absolute right-2 top-2 bottom-2 bg-[#FF6B2C] hover:bg-[#e55a1f] text-white rounded-full px-8 md:px-12 font-bold text-lg hidden sm:block"
            >
              Search
            </Button>
          </form>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8 relative z-10 pb-16">
        {/* Category Grid Section */}
        <Card className="mb-12 shadow-xl border-none">
          <CardContent className="p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <Grid className="w-5 h-5 text-[#2C3E95]" />
              Browse by Industrial Sector
            </h2>

            {/* Category image map */}
            {(() => {
              const categoryImages = {
                'Food & Beverage':                  'https://images.unsplash.com/photo-1543353071-873f17a7a088?w=80&h=80&fit=crop&auto=format',
                'FMCG':                             'https://images.unsplash.com/photo-1542838132-92c53300491e?w=80&h=80&fit=crop&auto=format',
                'Health & Beauty':                  'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=80&h=80&fit=crop&auto=format',
                'Pharmaceuticals':                  'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=80&h=80&fit=crop&auto=format',
                'Apparel & Fashion':                'https://images.unsplash.com/photo-1445205170230-053b83016050?w=80&h=80&fit=crop&auto=format',
                'Chemicals':                        'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=80&h=80&fit=crop&auto=format',
                'Home Supplies':                    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=80&h=80&fit=crop&auto=format',
                'Construction & Real Estate':       'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=80&h=80&fit=crop&auto=format',
                'Electronics & Electrical Supplies':'https://images.unsplash.com/photo-1518770660439-4636190af475?w=80&h=80&fit=crop&auto=format',
                'Agriculture':                      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=80&h=80&fit=crop&auto=format',
                'Automobile':                       'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=80&h=80&fit=crop&auto=format',
                'Packaging & Paper':                'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=80&h=80&fit=crop&auto=format',
                'Hospital & Medical Supplies':      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=80&h=80&fit=crop&auto=format',
                'Gifts & Crafts':                   'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=80&h=80&fit=crop&auto=format',
                'Consumer Electronics':             'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=80&h=80&fit=crop&auto=format',
                'Pipes, Tubes & Fittings':          'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=80&h=80&fit=crop&auto=format',
                'Industrial Supplies':              'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=80&h=80&fit=crop&auto=format',
              };
              return (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                  {categories.slice(0, 16).map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`p-3 rounded-xl border transition-all duration-300 group hover:border-[#2C3E95] hover:shadow-md ${
                        selectedCategory === cat.name ? 'border-[#2C3E95] bg-blue-50 text-[#2C3E95]' : 'border-gray-100 bg-white text-gray-600'
                      }`}
                    >
                      <div className="w-12 h-12 mx-auto mb-2 rounded-lg overflow-hidden shadow-sm">
                        <img
                          src={categoryImages[cat.name] || `https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=80&h=80&fit=crop&auto=format`}
                          alt={cat.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://placehold.co/80x80/e0e7ff/2C3E95?text=${encodeURIComponent(cat.name.substring(0, 2).toUpperCase())}`;
                          }}
                        />
                      </div>
                      <span className="text-xs font-semibold block leading-tight">{cat.name}</span>
                    </button>
                  ))}
                </div>
              );
            })()}
          </CardContent>
        </Card>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-1/4">
            <Card className="sticky top-24 border-none shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <Filter className="w-4 h-4" /> Filters
                  </h3>
                  <button onClick={handleReset} className="text-sm text-[#2C3E95] hover:underline">Reset</button>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map(cat => (
                          <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Sort Results</label>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sort By" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest First</SelectItem>
                        <SelectItem value="investment-low">Investment: Low to High</SelectItem>
                        <SelectItem value="investment-high">Investment: High to Low</SelectItem>
                        <SelectItem value="established">Most Established</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Lead Gen Box */}
                <div className="mt-8 p-4 bg-orange-50 border border-orange-100 rounded-xl">
                  <h4 className="font-bold text-orange-900 text-sm mb-2">Looking to Appoint?</h4>
                  <p className="text-xs text-orange-800 mb-4">Get verified {isFranchise ? 'dealers' : 'distributors'} for your brand today.</p>
                  <Link to="/join">
                    <Button className="w-full bg-[#FF6B2C] hover:bg-[#e55a1f] text-sm py-0 h-9">
                      Join Free Now
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Results Area */}
          <div className="lg:w-3/4">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-gray-600">
                Showing <span className="font-extrabold text-[#2C3E95]">{distributors.length}</span> verified {isFranchise ? 'dealers' : 'distributors'}
                {selectedCategory !== 'all' && <span> in <span className="font-semibold">{selectedCategory}</span></span>}
              </p>
              <div className="flex bg-gray-100 p-1 rounded-xl">
                <Button 
                  variant={viewMode === 'list' ? 'secondary' : 'ghost'} 
                  size="sm" 
                  onClick={() => setViewMode('list')}
                  className={`rounded-lg px-4 ${viewMode === 'list' ? 'bg-white shadow-sm text-[#2C3E95]' : 'text-gray-500 hover:text-[#2C3E95]'}`}
                >
                  <List className="w-4 h-4 mr-2" /> List
                </Button>
                <Button 
                  variant={viewMode === 'grid' ? 'secondary' : 'ghost'} 
                  size="sm" 
                  onClick={() => setViewMode('grid')}
                  className={`rounded-lg px-4 ${viewMode === 'grid' ? 'bg-white shadow-sm text-[#2C3E95]' : 'text-gray-500 hover:text-[#2C3E95]'}`}
                >
                  <Grid className="w-4 h-4 mr-2" /> Grid
                </Button>
              </div>
            </div>

            {distributors.length === 0 ? (
              <Card className="p-20 text-center border-dashed border-2 border-gray-200 bg-white">
                <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No Matching {isFranchise ? 'dealers' : 'distributors'} Found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters or search keywords to find more opportunities.</p>
                <Button onClick={handleReset} variant="outline" className="rounded-full px-8">Clear All Filters</Button>
              </Card>
            ) : (
              <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 gap-6" : "flex flex-col gap-4"}>
                {distributors.map((distributor) => (
                  <Card key={distributor.id} className={`hover:shadow-2xl transition-all duration-300 border-none group bg-white overflow-hidden ${viewMode === 'list' ? 'flex flex-col md:flex-row' : ''}`}>
                    {/* Product image banner (Grid only or hidden in List) */}
                    {viewMode === 'grid' && distributor.productImage && (
                      <div className="w-full h-[150px] overflow-hidden bg-gray-100">
                        <img
                          src={distributor.productImage || categoryFallbackImages[distributor.category] || `https://placehold.co/400x200/f8fafc/334155?text=${encodeURIComponent(distributor.category || 'Product')}`}
                          alt={`${distributor.name} product`}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = categoryFallbackImages[distributor.category] || `https://placehold.co/400x200/f8fafc/334155?text=${encodeURIComponent(distributor.category || 'Product')}`;
                          }}
                        />
                      </div>
                    )}

                    <CardContent className={`p-0 flex flex-col ${viewMode === 'list' ? 'md:flex-row flex-1' : ''}`}>
                      <div className={`p-6 ${viewMode === 'list' ? 'flex-1 grid grid-cols-1 md:grid-cols-3 gap-6' : ''}`}>
                        {/* 1. Logo & Basic Info */}
                        <div className="flex items-start gap-5">
                          <div className="w-20 h-20 rounded-xl overflow-hidden shadow-inner flex-shrink-0 border border-gray-100 p-1 bg-white">
                            <img
                              src={distributor.logo}
                              alt={distributor.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100 text-[10px] uppercase tracking-tighter">
                                Verified {distributor.type === 'franchise' ? 'Dealers' : 'Distributor'}
                              </Badge>
                              {viewMode === 'grid' && <p className="text-[10px] text-gray-400 font-bold uppercase">{distributor.location}</p>}
                            </div>
                            <Link to={`/distributor/${distributor.id}`}>
                              <h3 className="font-black text-lg text-gray-900 leading-tight group-hover:text-[#2C3E95] transition-colors line-clamp-1">
                                {distributor.name}
                              </h3>
                            </Link>
                            <p className="text-xs text-[#2C3E95] font-bold mt-1 opacity-80">{distributor.category}</p>
                            {viewMode === 'list' && <p className="text-[10px] text-gray-400 font-bold uppercase mt-2">{distributor.location}</p>}
                          </div>
                        </div>

                        {/* 2. Stats (Grid spacing adjusts) */}
                        <div className={`grid grid-cols-2 gap-4 ${viewMode === 'list' ? 'items-center' : 'mb-5 p-3 bg-gray-50 rounded-lg'}`}>
                          <div>
                            <p className="text-[10px] text-gray-500 uppercase font-black mb-1">Min Investment</p>
                            <div className="flex items-center gap-1.5 font-bold text-gray-900">
                              <DollarSign className="w-3.5 h-3.5 text-green-600" />
                              <span className="text-sm">{distributor.investmentRange}</span>
                            </div>
                          </div>
                          <div>
                            <p className="text-[10px] text-gray-500 uppercase font-black mb-1">Established</p>
                            <div className="flex items-center gap-1.5 font-bold text-gray-900">
                              <Calendar className="w-3.5 h-3.5 text-blue-600" />
                              <span className="text-sm">{distributor.established}</span>
                            </div>
                          </div>
                        </div>

                        {/* 3. Products/Description */}
                        <div className={`${viewMode === 'list' ? 'flex flex-col justify-center' : 'mb-6 h-[40px]'}`}>
                          <p className="text-[10px] text-gray-400 uppercase font-black mb-1 tracking-widest">Offers Opportunities for:</p>
                          <p className={`text-xs text-gray-700 italic font-medium ${viewMode === 'grid' ? 'line-clamp-2' : ''}`}>
                            "{distributor.products.map(p => typeof p === 'object' ? p.name : p).join(', ')}"
                          </p>
                        </div>
                      </div>

                      {/* 4. Actions */}
                      <div className={`flex ${viewMode === 'list' ? 'md:flex-col md:w-48 border-l border-gray-50' : 'border-t border-gray-50'}`}>
                        <a href={`tel:${distributor.phone}`} className={`flex-1 text-center py-4 text-gray-600 hover:bg-gray-50 transition-colors border-r border-gray-50 text-xs font-bold flex items-center justify-center gap-2 ${viewMode === 'list' ? 'md:border-r-0 md:border-b' : ''}`}>
                          <Phone className="w-3.5 h-3.5" /> Call Now
                        </a>
                        <Link to={`/distributor/${distributor.id}`} className="flex-1 text-center py-4 bg-white text-[#2C3E95] hover:bg-blue-50 transition-colors text-xs font-black flex items-center justify-center gap-2">
                          View Details <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modern CTA Footer for search page */}
      <div className="bg-white border-t border-gray-100 py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 bg-blue-50 text-[#2C3E95] border-blue-100 uppercase tracking-widest px-4 py-1">Join the Network</Badge>
          <h2 className="text-3xl font-black text-gray-900 mb-4">Expand Your Reach Across India</h2>
          <p className="text-gray-600 mb-10 max-w-xl mx-auto">Join thousands of brands and {isFranchise ? 'dealers' : 'distributors'} who have successfully scaled their operations using our platform.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/post-requirement">
              <Button size="lg" className="bg-[#FF6B2C] hover:bg-[#e55a1f] rounded-full px-10 font-bold">
                Post Requirement
              </Button>
            </Link>
            <Link to="/join">
              <Button size="lg" variant="outline" className="border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white rounded-full px-10 font-bold">
                Register as {isFranchise ? 'Dealers' : 'Distributor'}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Distributors;

