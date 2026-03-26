import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/mock-data';
import * as LucideIcons from 'lucide-react';
import { Button } from './ui/button';
import { categoriesAPI } from '../services/api';

const CategorySidebar = () => {
  const [categoriesList, setCategoriesList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await categoriesAPI.getAll();
        setCategoriesList(res.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategoriesList(categories);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 w-full">
        <h3 className="text-lg font-bold text-gray-900 mb-4">TOP CATEGORIES</h3>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-10 bg-gray-100 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 w-full flex flex-col">
      <h3 className="text-lg font-bold text-gray-900 mb-3">TOP CATEGORIES</h3>

      {/* Scrollable list — max-h ensures it scrolls once it exceeds the fixed height */}
      <div className="overflow-y-auto max-h-[460px]">
        {categoriesList.map((category) => {
          const IconComponent = LucideIcons[category.icon] || LucideIcons.Package;
          return (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition group"
            >
              <IconComponent className="w-5 h-5 text-[#2C3E95] group-hover:scale-110 transition shrink-0" />
              <span className="text-sm text-gray-700 group-hover:text-[#2C3E95]">{category.name}</span>
            </Link>
          );
        })}
      </div>

      {/* View all button pinned below the list */}
      <Link to="/categories" className="mt-4">
        <Button className="w-full bg-[#2C3E95] hover:bg-[#1f2d6b] rounded-full">
          View all Categories
        </Button>
      </Link>
    </div>
  );
};

export default CategorySidebar;
