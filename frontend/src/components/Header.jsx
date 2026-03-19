import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { categories } from '../data/mockData';

const Header = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${searchTerm}&category=${selectedCategory}`);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex flex-col">
            <h1 className="text-2xl font-bold text-[#2C3E95]">DealerDistributors.com</h1>
            <p className="text-xs text-gray-600">Distributors • Franchises</p>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-8">
            <div className="flex items-center bg-gray-100 rounded-full overflow-hidden">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48 border-0 bg-transparent focus:ring-0">
                  <SelectValue placeholder="Distributors" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat.id} value={cat.slug}>{cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex-1 flex items-center px-4">
                <Search className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search Product Keywords"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-transparent outline-none text-sm"
                />
              </div>
              <Button type="submit" className="rounded-l-none rounded-r-full bg-[#2C3E95] hover:bg-[#1f2d6b] px-8">
                Search
              </Button>
            </div>
          </form>

          {/* Right side buttons */}
          <div className="flex items-center gap-4">
            <a href="https://www.tradeindia.com" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-700 hover:text-[#2C3E95]">
              Visit Tradeindia
            </a>
            <Link to="/signin" className="text-sm text-gray-700 hover:text-[#2C3E95]">
              Sign In
            </Link>
            <Link to="/join">
              <Button className="bg-[#FF6B2C] hover:bg-[#e55a1f] rounded-full px-6">
                Join Free
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
