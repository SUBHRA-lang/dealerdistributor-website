import React, { useState } from 'react';
import { Phone, Mail, Package, MessageSquare, Ship, Users, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Textarea } from './ui/textarea';

const AskExpertSection = () => {
  const [formData, setFormData] = useState({
    type: 'distributor',
    role: 'looking',
    email: '',
    countryCode: '+91',
    mobile: '',
    productName: '',
    requirement: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (value) => {
    setFormData(prev => ({ ...prev, type: value }));
  };

  const handleRoleChange = (value) => {
    setFormData(prev => ({ ...prev, role: value }));
  };

  const getRoleLabels = () => {
    switch (formData.type) {
      case 'brands':
        return {
          looking: 'I am looking for Brands',
          become: 'I want to become a Brands'
        };
      case 'franchise':
        return {
          looking: 'I am looking for Franchise',
          become: 'I want to become a Franchise'
        };
      default:
        return {
          looking: 'I am looking for distributor',
          become: 'I want to become a distributor'
        };
    }
  };

  const roleLabels = getRoleLabels();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:8001/expert_inquiry.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        alert(data.message || 'Thank you! Your requirement has been submitted. Our experts will contact you soon.');
        setFormData({
          type: 'distributor',
          role: 'looking',
          email: '',
          countryCode: '+91',
          mobile: '',
          productName: '',
          requirement: ''
        });
      } else {
        alert(data.detail || data.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Submission Error:', error);
      alert('Failed to connect to the server. Please check if the backend is running.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-[#2C3E95] py-16 text-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">

          {/* Left Content */}
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold mb-10">Ask Our Experts</h2>

            <div className="space-y-12">
              <div className="flex gap-6">
                <div className="bg-orange-500/20 p-4 rounded-2xl h-fit">
                  <Ship className="w-8 h-8 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Distributors</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Willing to appoint distributors for your business? Seek expert guidance and unlock limitless possibilities!
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    Want to take distributorship? Don't hesitate to reach out to our industry specialists to drive your business forward.
                  </p>
                </div>
              </div>

              <div className="w-full h-px bg-white/10" />

              <div className="flex gap-6">
                <div className="bg-orange-500/20 p-4 rounded-2xl h-fit">
                  <Package className="w-8 h-8 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Brands</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    List your brand with us to reach a wider audience and find the perfect distribution partners.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    Elevate your brand presence across multiple regions with our expert-led distribution network.
                  </p>
                </div>
              </div>

              <div className="w-full h-px bg-white/10" />

              <div className="flex gap-6">
                <div className="bg-orange-500/20 p-4 rounded-2xl h-fit">
                  <Users className="w-8 h-8 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Franchise</h3>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    Expand your brand with like-minded franchisees; Reach new heights of success together!
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    Exploring franchise opportunities? Connect with our experts for personalised guidance and support.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Form Card */}
          <div className="lg:w-1/2 w-full">
            <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 text-gray-900 shadow-2xl relative">
              <h3 className="text-2xl font-bold mb-1">What are you looking ?</h3>
              <p className="text-sm text-gray-500 mb-8">Fast Track Your Business</p>

              <form onSubmit={handleSubmit} className="space-y-6">

                {/* Type Toggle */}
                <div className="flex gap-4 mb-6">
                  <button
                    type="button"
                    onClick={() => handleTypeChange('distributor')}
                    className={`flex items-center gap-2 px-6 py-2 rounded-full border transition-all ${formData.type === 'distributor'
                        ? 'bg-blue-50 border-[#2C3E95] text-[#2C3E95] font-semibold ring-1 ring-[#2C3E95]'
                        : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                      }`}
                  >
                    {formData.type === 'distributor' && <CheckCircle2 className="w-4 h-4" />}
                    Distributor
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTypeChange('brands')}
                    className={`flex items-center gap-2 px-6 py-2 rounded-full border transition-all ${formData.type === 'brands'
                        ? 'bg-blue-50 border-[#2C3E95] text-[#2C3E95] font-semibold ring-1 ring-[#2C3E95]'
                        : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                      }`}
                  >
                    {formData.type === 'brands' && <CheckCircle2 className="w-4 h-4" />}
                    Brands
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTypeChange('franchise')}
                    className={`flex items-center gap-2 px-6 py-2 rounded-full border transition-all ${formData.type === 'franchise'
                        ? 'bg-blue-50 border-[#2C3E95] text-[#2C3E95] font-semibold ring-1 ring-[#2C3E95]'
                        : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                      }`}
                  >
                    {formData.type === 'franchise' && <CheckCircle2 className="w-4 h-4" />}
                    Franchise
                  </button>
                </div>

                {/* Role Toggle */}
                <RadioGroup
                  value={formData.role}
                  onValueChange={handleRoleChange}
                  className="flex flex-col sm:flex-row gap-4 mb-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="looking" id="role-looking" className="border-gray-300" />
                    <Label htmlFor="role-looking" className="text-sm cursor-pointer whitespace-nowrap">{roleLabels.looking}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="become" id="role-become" className="border-gray-300" />
                    <Label htmlFor="role-become" className="text-sm cursor-pointer whitespace-nowrap">{roleLabels.become}</Label>
                  </div>
                </RadioGroup>

                {/* Contact Info Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="rounded-xl border-gray-200 h-12"
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className="w-24">
                      <select
                        className="w-full h-12 rounded-xl border border-gray-200 bg-white px-3 text-sm"
                        value={formData.countryCode}
                        onChange={(e) => setFormData(prev => ({ ...prev, countryCode: e.target.value }))}
                      >
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                      </select>
                    </div>
                    <Input
                      type="tel"
                      name="mobile"
                      placeholder="Mobile Number"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                      className="flex-1 rounded-xl border-gray-200 h-12"
                    />
                  </div>
                </div>

                {/* Product Name */}
                <div className="space-y-2">
                  <Input
                    type="text"
                    name="productName"
                    placeholder="Enter Product Name"
                    value={formData.productName}
                    onChange={handleChange}
                    required
                    className="rounded-xl border-gray-200 h-12"
                  />
                </div>

                {/* Requirement */}
                <div className="space-y-2">
                  <Textarea
                    name="requirement"
                    placeholder="Type your requirment"
                    value={formData.requirement}
                    onChange={handleChange}
                    required
                    className="rounded-xl border-gray-200 min-h-[100px] resize-none"
                  />
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-12 h-12 bg-[#FF6B2C] hover:bg-[#e55a1f] text-white font-bold rounded-full transition-all text-lg shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit'
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AskExpertSection;
