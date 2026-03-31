import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as LucideIcons from 'lucide-react';
import { categoriesAPI } from '../services/api';
import { categories } from '../data/mock-data';
import { Badge } from '../components/ui/badge';

const Categories = () => {
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
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2C3E95]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 mb-4 px-4 py-1">Business Sectors</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Explore All Categories</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find the perfect distribution or dealers opportunity across a wide range of industry sectors.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {categoriesList.map((category) => {
            const IconComponent = LucideIcons[category.icon] || LucideIcons.Package;
            return (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="group bg-white rounded-2xl p-6 shadow-sm border border-transparent hover:border-blue-200 hover:shadow-xl transition-all duration-300 text-center flex flex-col items-center gap-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:bg-[#2C3E95] transition-colors duration-300">
                  <IconComponent className="w-8 h-8 text-[#2C3E95] group-hover:text-white transition-all transform group-hover:scale-110" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 group-hover:text-[#2C3E95] transition-colors line-clamp-2">
                    {category.name}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">Opportunities Available</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Categories;
