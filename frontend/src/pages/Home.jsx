import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Phone, DollarSign, Calendar } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import CategorySidebar from '../components/CategorySidebar';
import { videoTestimonials, distributors as mockDistributors, testimonials as mockTestimonials, blogPosts as mockBlogPosts, exclusiveBrands } from '../data/mock-data';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Label } from '../components/ui/label';
import { distributorsAPI, testimonialsAPI, blogAPI } from '../services/api';
import HomeSlider from '../components/HomeSlider';
import HeroSlider from '../components/HeroSlider';
import AskExpertSection from '../components/AskExpertSection';
import DistributorInquiries from "../components/DistributorInquiries";

const Home = () => {
  const [lookingFor, setLookingFor] = useState('distributor');
  const [distributors, setDistributors] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [distRes, testRes, blogRes] = await Promise.all([
          distributorsAPI.getFeatured(),
          testimonialsAPI.getFeatured(),
          blogAPI.getPosts({ limit: 3 })
        ]);

        setDistributors(distRes.data);
        setTestimonials(testRes.data);
        setBlogPosts(blogRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        // Fallback to mock data when API is unavailable
        setDistributors(mockDistributors);
        setTestimonials(mockTestimonials);
        setBlogPosts(mockBlogPosts);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#2C3E95] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gray-50 pt-6 pb-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-8">
            {/* Left Sidebar - Categories (only on large screens) */}
            <div className="hidden lg:block lg:col-span-3 lg:-translate-x-5 lg:-translate-y-2.5 lg:mx-[6px] lg:pr-[35px]">
              <CategorySidebar />
            </div>

            {/* Center - Hero Content */}
            <div className="lg:col-span-6 text-center">
              {/* Dynamic Hero Slider (Circular) */}
              <HeroSlider />
            </div>

            {/* Right Sidebar - What are you looking for */}
            <div className="lg:col-span-3 lg:translate-x-5 lg:-translate-y-2.5 lg:mx-[6px] lg:pl-[35px]">
              <Card className="shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">What are you looking for?</h3>
                  <p className="text-sm text-gray-600 mb-4">Explore Opportunities!</p>

                  <RadioGroup value={lookingFor} onValueChange={setLookingFor} className="space-y-3 mb-6">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="distributor" id="distributor" />
                      <Label htmlFor="distributor" className="cursor-pointer">Distributor</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="franchise" id="franchise" />
                      <Label htmlFor="franchise" className="cursor-pointer">Franchise</Label>
                    </div>
                  </RadioGroup>

                  <Link to={lookingFor === 'franchise' ? '/franchises' : '/distributors'}>
                    <Button className="w-full bg-[#FF6B2C] hover:bg-[#e55a1f] rounded-full mb-4">
                      {lookingFor === 'franchise' ? 'Looking for Franchises' : 'Looking for Distributors'}
                    </Button>
                  </Link>

                  <div className="text-center pt-4 border-t">
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 mb-4">
                      <p className="text-sm font-semibold text-gray-900 mb-2">Supercharge Your Business Growth</p>
                      <p className="text-xs text-gray-600">Unlock Limitless Opportunities!</p>
                    </div>
                    <Link to="/post-requirement">
                      <Button className="w-full bg-[#2C3E95] hover:bg-[#1f2d6b] rounded-full">
                        Post Your Requirement
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Stats Card */}
              <Card className="mt-4 shadow-lg">
                <CardContent className="p-6 text-center">
                  <p className="text-sm text-gray-600 mb-2">ALL CATEGORIES</p>
                  <h2 className="text-3xl font-bold text-[#2C3E95]">Total 1.2 Lakh</h2>
                  <p className="text-lg font-semibold text-gray-900">Distributors</p>
                  <div className="flex justify-center gap-1 mt-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>



      {/* Banner Slider Section (Home Slider) */}
      <section className="pt-0 pb-4 bg-white">
        <div className="container mx-auto px-4">
          <HomeSlider />
        </div>
      </section>

      {/* Featured Distributorship Opportunities */}
      <section className="pt-4 pb-6 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Distributorship Opportunities
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {distributors.map((distributor) => (
              <Card key={distributor.id} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                {/* Product image banner at top of card */}
                <div className="w-full h-[160px] overflow-hidden bg-gray-100">
                  <img
                    src={distributor.productImage}
                    alt={`${distributor.name} product`}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.style.background = 'linear-gradient(135deg,#e0e7ff,#f0fdf4)'; }}
                  />
                </div>
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

          <div className="text-center">
            <Link to="/distributors">
              <Button size="lg" className="bg-[#FF6B2C] hover:bg-[#e55a1f] rounded-full px-8">
                View More Opportunities
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Exclusive Brands ── */}
      <section className="pt-6 pb-6 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Exclusive Brands</h2>
            <p className="text-gray-500 mt-1 text-sm">Top industry players trust DealerDistributors</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {exclusiveBrands.map((brand) => (
              <Link to="/distributors" key={brand.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 p-4 flex flex-col gap-3 transition-all duration-300 hover:-translate-y-1 group">
                {/* Logo + Category badge row */}
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl overflow-hidden border border-gray-100 flex-shrink-0 shadow-sm">
                    <img
                      src={brand.logo}
                      alt={brand.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.style.background = brand.color + '22'; }}
                    />
                  </div>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full leading-tight"
                    style={{ backgroundColor: brand.color + '20', color: brand.color }}
                  >
                    {brand.category}
                  </span>
                </div>
                {/* Name */}
                <p className="font-bold text-gray-900 text-sm leading-snug group-hover:text-[#2C3E95] transition-colors line-clamp-1">{brand.name}</p>
                {/* Investment */}
                <div>
                  <p className="text-[10px] text-gray-400 uppercase font-semibold tracking-wide">Investment price range</p>
                  <p className="text-xs font-bold text-gray-700 mt-0.5">{brand.investment}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Ask Our Experts ── */}
      <AskExpertSection />

      {/* ── Distributor Inquiries ── */}
      <DistributorInquiries />

      {/* Success Stories/Testimonials */}
      <section className="pt-8 pb-8 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-lg text-gray-600">Our clients' testimonials speak volumes of satisfaction</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-xl transition">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.designation}</p>
                      <p className="text-xs text-gray-500">{testimonial.company}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 italic">"{testimonial.testimonial}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/testimonials">
              <Button size="lg" className="bg-[#2C3E95] hover:bg-[#1f2d6b] rounded-full px-8">
                View All Testimonials
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="pt-8 pb-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Video Testimonials</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videoTestimonials.map((video) => (
              <div key={video.id} className="group">
                <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition" style={{ paddingTop: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${video.youtubeId}`}
                    title={`Video Testimonial ${video.id}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="pt-8 pb-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest Blog Posts</h2>
            <p className="text-lg text-gray-600">Explore Insider Tips, Expert Guidance, Success Stories, & Industry Insights</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 mb-3">
                    {post.category}
                  </Badge>
                  <Link to={`/blog/${post.id}`}>
                    <h3 className="font-bold text-lg mb-3 hover:text-[#2C3E95] transition line-clamp-2">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{post.date}</span>
                    <span>{post.author}</span>
                  </div>
                  <Link to={`/blog/${post.id}`}>
                    <Button variant="link" className="p-0 h-auto mt-4 text-[#2C3E95]">
                      Read More →
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/blog">
              <Button size="lg" className="bg-[#2C3E95] hover:bg-[#1f2d6b] rounded-full px-8">
                View All Posts
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
