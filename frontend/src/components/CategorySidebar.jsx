import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/mockData';
import * as LucideIcons from 'lucide-react';
import { Button } from './ui/button';

const CategorySidebar = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-bold text-gray-900 mb-4">TOP CATEGORIES</h3>
      <div className="space-y-2">
        {categories.map((category) => {
          const IconComponent = LucideIcons[category.icon] || LucideIcons.Package;
          return (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition group"
            >
              <IconComponent className="w-5 h-5 text-[#2C3E95] group-hover:scale-110 transition" />
              <span className="text-sm text-gray-700 group-hover:text-[#2C3E95]">{category.name}</span>
            </Link>
          );
        })}
      </div>
      <Link to="/categories">
        <Button className="w-full mt-6 bg-[#2C3E95] hover:bg-[#1f2d6b] rounded-full">
          View all Categories
        </Button>
      </Link>
    </div>
  );
};

export default CategorySidebar;
