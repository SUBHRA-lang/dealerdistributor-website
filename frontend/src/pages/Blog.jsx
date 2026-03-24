import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Calendar, User, ArrowRight, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { blogAPI } from '../services/api';
import { blogPosts as mockBlogPosts } from '../data/mock-data';

const Blog = () => {
  const { id } = useParams();
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(4); // 1 featured + 3 others initally

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const res = await blogAPI.getPosts();
        setBlogPosts(res.data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setBlogPosts(mockBlogPosts);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogPosts();
    // Reset visible count when returning to list
    if (!id) setVisibleCount(4);
  }, [id]);

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

  // Detail View
  if (id) {
    const post = blogPosts.find(p => p.id === parseInt(id)) || mockBlogPosts.find(p => p.id === parseInt(id));
    
    if (!post) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Post Not Found</h2>
            <Link to="/blog">
              <Button>Back to Blog</Button>
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-white pb-20">
        {/* Banner */}
        <div className="h-[400px] relative overflow-hidden">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 flex items-center justify-center pt-20">
            <div className="container mx-auto px-4 max-w-4xl text-center text-white">
              <Badge className="bg-orange-500 text-white mb-6 hover:bg-orange-500">
                {post.category}
              </Badge>
              <h1 className="text-4xl md:text-6xl font-black leading-tight drop-shadow-xl">
                {post.title}
              </h1>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 max-w-4xl -mt-20 relative z-20">
          <Card className="shadow-2xl border-none">
            <CardContent className="p-8 md:p-12">
              <div className="flex flex-wrap items-center justify-between gap-6 mb-12 pb-8 border-b border-gray-100">
                <div className="flex items-center gap-8">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Calendar className="w-5 h-5 text-[#2C3E95]" />
                    <span className="font-medium">{post.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500">
                    <User className="w-5 h-5 text-[#2C3E95]" />
                    <span className="font-medium">{post.author}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Share</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="rounded-full hover:bg-blue-50 text-blue-600 border-blue-100">
                      <Facebook className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full hover:bg-blue-50 text-blue-400 border-blue-100">
                      <Twitter className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="rounded-full hover:bg-blue-50 text-blue-700 border-blue-100">
                      <Linkedin className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed font-medium space-y-8">
                <p className="text-xl text-gray-900 font-bold italic border-l-4 border-orange-500 pl-6">
                  {post.excerpt}
                </p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <div className="my-12">
                   <img src={post.image} alt="In-article" className="rounded-2xl shadow-lg w-full h-[400px] object-cover" />
                   <p className="text-center text-sm text-gray-400 mt-4 italic">Caption: Essential strategies for business growth in 2025</p>
                </div>
                <p>
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
                </p>
              </div>

              <div className="mt-16 pt-12 border-t border-gray-100 flex justify-between items-center">
                <Link to="/blog">
                  <Button variant="outline" className="rounded-full">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Blog
                  </Button>
                </Link>
                <Button className="bg-[#2C3E95] hover:bg-[#1f2d6b] rounded-full">
                  Share This Article <Share2 className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  // List View
  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1, visibleCount);

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-[#2C3E95]/10 text-[#2C3E95] hover:bg-[#2C3E95]/10 mb-4 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider">
            Our Newsroom
          </Badge>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 tracking-tight">Blog & Resources</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            Explore Insider Tips, Expert Guidance, Success Stories, & Industry Insights
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <Card className="mb-16 overflow-hidden hover:shadow-2xl transition-all duration-500 border-none shadow-xl group">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-[400px] lg:h-auto overflow-hidden">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent lg:hidden" />
              </div>
              <CardContent className="p-8 lg:p-16 flex flex-col justify-center bg-white">
                <Badge className="w-fit bg-orange-100 text-orange-600 hover:bg-orange-100 mb-6 px-4 py-1 rounded-full text-xs font-black uppercase">
                  Featured Article
                </Badge>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight group-hover:text-[#2C3E95] transition-colors">
                  {featuredPost.title}
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed line-clamp-3">
                  {featuredPost.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400 mb-10 font-bold uppercase tracking-widest">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#2C3E95]" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-[#2C3E95]" />
                    <span>{featuredPost.author}</span>
                  </div>
                </div>
                <Link to={`/blog/${featuredPost.id}`}>
                  <Button size="lg" className="bg-[#2C3E95] hover:bg-[#1f2d6b] rounded-full px-10 py-7 text-lg font-black shadow-xl scale-100 hover:scale-105 transition-all">
                    Read Full Article <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </div>
          </Card>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {otherPosts.map((post) => (
            <Card key={post.id} className="hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-none shadow-lg overflow-hidden group">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 backdrop-blur-sm text-[#2C3E95] hover:bg-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tighter">
                    {post.category}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-8">
                <div className="flex items-center gap-4 text-[10px] text-gray-400 mb-4 font-black uppercase tracking-widest">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3 h-3 text-orange-500" />
                    <span>{post.date}</span>
                  </div>
                  <div className="ml-auto flex items-center gap-1.5">
                    <User className="w-3 h-3 text-[#2C3E95]" />
                    <span>{post.author}</span>
                  </div>
                </div>
                <Link to={`/blog/${post.id}`}>
                  <h3 className="font-black text-xl mb-4 text-gray-900 group-hover:text-[#2C3E95] transition-colors line-clamp-2 leading-tight">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-sm text-gray-500 mb-8 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <Link to={`/blog/${post.id}`} className="inline-block group/link">
                  <Button variant="link" className="p-0 h-auto text-[#2C3E95] font-black text-sm group-hover/link:translate-x-1 transition-transform">
                    Read More <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        {visibleCount < blogPosts.length && (
          <div className="text-center mt-20">
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => setVisibleCount(prev => prev + 3)}
              className="rounded-full px-12 py-7 border-2 border-[#2C3E95] text-[#2C3E95] font-black hover:bg-[#2C3E95] hover:text-white transition-all text-lg shadow-xl"
            >
              Load More Articles
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
export default Blog;
