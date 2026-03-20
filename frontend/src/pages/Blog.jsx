import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { blogAPI } from '../services/api';
import { blogPosts as mockBlogPosts } from '../data/mockData';

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const res = await blogAPI.getPosts({ limit: 10 });
        setBlogPosts(res.data);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        setBlogPosts(mockBlogPosts);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#2C3E95] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Blog & Resources</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore Insider Tips, Expert Guidance, Success Stories, & Industry Insights
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <Card className="mb-12 overflow-hidden hover:shadow-xl transition">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover"
              />
              <CardContent className="p-8 flex flex-col justify-center">
                <Badge className="w-fit bg-yellow-100 text-yellow-800 hover:bg-yellow-100 mb-4">
                  Featured Post
                </Badge>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{featuredPost.title}</h2>
                <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{featuredPost.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{featuredPost.author}</span>
                  </div>
                </div>
                <Link to={`/blog/${featuredPost.id}`}>
                  <Button className="bg-[#2C3E95] hover:bg-[#1f2d6b]">
                    Read Full Article <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </div>
          </Card>
        )}

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherPosts.map((post) => (
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
                  <h3 className="font-bold text-xl mb-3 hover:text-[#2C3E95] transition line-clamp-2">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{post.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>{post.author}</span>
                  </div>
                </div>
                <Link to={`/blog/${post.id}`}>
                  <Button variant="link" className="p-0 h-auto text-[#2C3E95]">
                    Read More →
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="rounded-full px-8">
            Load More Articles
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
