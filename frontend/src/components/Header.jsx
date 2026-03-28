import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ChevronDown, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { categories } from '../data/mock-data';

const Header = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${searchTerm}&category=${selectedCategory}`);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between py-3 md:py-4">
          {/* Logo */}
          <div className="flex flex-col shrink-0">
            <Link to="/" className="text-lg md:text-2xl font-bold text-[#2C3E95] leading-tight hover:opacity-80 transition-opacity">
              DealerDistributors.com
            </Link>
            <p className="text-xs text-gray-600 hidden sm:block">
              <Link to="/distributors" className="hover:text-[#2C3E95] hover:underline transition-colors">Distributors</Link>
              {' • '}
              <Link to="/franchises" className="hover:text-[#2C3E95] hover:underline transition-colors">Franchises</Link>
            </p>
          </div>

          {/* Search Bar — hidden on small, shown on md+ */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-6 lg:mx-8">
            <div className="flex items-center bg-gray-100 rounded-full overflow-hidden w-full">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40 lg:w-48 border-0 bg-transparent focus:ring-0 shrink-0">
                  <SelectValue placeholder="Distributors" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat.id} value={cat.slug}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex-1 flex items-center px-3">
                <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
                <input
                  type="text"
                  placeholder="Search Product Keywords"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-sm min-w-0"
                />
              </div>
              <Button type="submit" className="rounded-l-none rounded-r-full bg-[#2C3E95] hover:bg-[#1f2d6b] px-5 lg:px-8 shrink-0">
                Search
              </Button>
            </div>
          </form>

          {/* Right side buttons — hidden on small */}
          <div className="hidden md:flex items-center gap-3 lg:gap-4 shrink-0">
            <a href="https://www.tradeindia.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-700 hover:text-[#2C3E95] hidden lg:inline">
              Visit Tradeindia
            </a>
            <Link to="/signin" className="text-sm text-gray-700 hover:text-[#2C3E95]">
              Sign In
            </Link>
            <Link to="/join">
              <Button className="bg-[#FF6B2C] hover:bg-[#e55a1f] rounded-full px-4 lg:px-6 text-sm">
                Join Free
              </Button>
            </Link>
          </div>

          {/* Hamburger button — visible only on small screens */}
          <button
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 pb-4 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="pt-4">
              <div className="flex items-center bg-gray-100 rounded-full overflow-hidden">
                <div className="flex-1 flex items-center px-4">
                  <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
                  <input
                    type="text"
                    placeholder="Search Product Keywords"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1 bg-transparent outline-none text-sm min-w-0 py-2"
                  />
                </div>
                <Button type="submit" className="rounded-l-none rounded-r-full bg-[#2C3E95] hover:bg-[#1f2d6b] px-5 shrink-0">
                  Search
                </Button>
              </div>
            </form>

            {/* Mobile Nav Links */}
            <div className="flex flex-col gap-2">
              <Link
                to="/distributors"
                className="px-4 py-2 text-sm text-gray-700 hover:text-[#2C3E95] hover:bg-gray-50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Distributorships
              </Link>
              <Link
                to="/franchises"
                className="px-4 py-2 text-sm text-gray-700 hover:text-[#2C3E95] hover:bg-gray-50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Franchises
              </Link>
              <Link
                to="/blog"
                className="px-4 py-2 text-sm text-gray-700 hover:text-[#2C3E95] hover:bg-gray-50 rounded-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                Blog
              </Link>
              <a
                href="https://www.tradeindia.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 text-sm text-gray-700 hover:text-[#2C3E95] hover:bg-gray-50 rounded-lg"
              >
                Visit Tradeindia
              </a>
              <hr className="border-gray-100 my-1" />
              <div className="flex gap-3 px-4">
                <Link to="/signin" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full">Sign In</Button>
                </Link>
                <Link to="/join" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-[#FF6B2C] hover:bg-[#e55a1f] rounded-full">Join Free</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
