import React, { useState } from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useToast } from '../hooks/use-toast';
import { requirementsAPI, categoriesAPI } from '../services/api';
import { categories } from '../data/mock-data';

const PostRequirement = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    businessType: '',
    category: '',
    productName: '',
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    location: '',
    investment: '',
    territories: '',
    description: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      await requirementsAPI.create(formData);
      
      toast({
        title: 'Requirement Posted Successfully!',
        description: 'We will connect you with relevant distributors shortly.',
      });
      
      // Reset form
      setFormData({
        businessType: '',
        category: '',
        productName: '',
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        location: '',
        investment: '',
        territories: '',
        description: ''
      });
    } catch (error) {
      console.error('Error submitting requirement:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit requirement. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setFormData({
      businessType: '',
      category: '',
      productName: '',
      companyName: '',
      contactPerson: '',
      email: '',
      phone: '',
      location: '',
      investment: '',
      territories: '',
      description: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Post Your Requirement</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Tell us what you're looking for and we'll connect you with the right dealers or distributors
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Business Type */}
                <div>
                  <Label htmlFor="businessType">I am looking for *</Label>
                  <Select value={formData.businessType} onValueChange={(value) => setFormData({...formData, businessType: value})} required>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="franchise">Dealers</SelectItem>
                      <SelectItem value="distributor">Distributor</SelectItem>
                      <SelectItem value="sales-agent">Sales Agent</SelectItem>
                      <SelectItem value="super-stockist">Super Stockist</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Category */}
                <div>
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})} required>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat.id} value={cat.slug}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Product/Service Name */}
                <div>
                  <Label htmlFor="productName">Product/Service Name *</Label>
                  <Input
                    id="productName"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    placeholder="e.g., Organic Food Products"
                    required
                    className="mt-2"
                  />
                </div>

                {/* Company Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Your Company Name"
                      required
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactPerson">Contact Person *</Label>
                    <Input
                      id="contactPerson"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleChange}
                      placeholder="Full Name"
                      required
                      className="mt-2"
                    />
                  </div>
                </div>

                {/* Contact Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@company.com"
                      required
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      required
                      className="mt-2"
                    />
                  </div>
                </div>

                {/* Location & Investment */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="location">Location/City *</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g., Mumbai, Maharashtra"
                      required
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="investment">Investment Range *</Label>
                    <Select value={formData.investment} onValueChange={(value) => setFormData({...formData, investment: value})} required>
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select investment range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50k-1lac">₹50K - ₹1 Lac</SelectItem>
                        <SelectItem value="1lac-2lac">₹1 Lac - ₹2 Lac</SelectItem>
                        <SelectItem value="2lac-5lac">₹2 Lac - ₹5 Lac</SelectItem>
                        <SelectItem value="5lac-10lac">₹5 Lac - ₹10 Lac</SelectItem>
                        <SelectItem value="10lac+">₹10 Lac+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Territories */}
                <div>
                  <Label htmlFor="territories">Target Territories *</Label>
                  <Input
                    id="territories"
                    name="territories"
                    value={formData.territories}
                    onChange={handleChange}
                    placeholder="e.g., Maharashtra, Gujarat, Karnataka"
                    required
                    className="mt-2"
                  />
                </div>

                {/* Description */}
                <div>
                  <Label htmlFor="description">Additional Details *</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Provide detailed information about your requirements, expectations, and any specific criteria..."
                    required
                    rows={6}
                    className="mt-2"
                  />
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="flex-1 bg-[#2C3E95] hover:bg-[#1f2d6b] rounded-full"
                    disabled={submitting}
                  >
                    {submitting ? 'Submitting...' : 'Submit Requirement'}
                  </Button>
                  <Button type="button" variant="outline" size="lg" className="rounded-full px-8" onClick={handleReset}>
                    Reset
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Info Card */}
          <Card className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50">
            <CardContent className="p-6">
              <h3 className="font-bold text-lg mb-3">What happens next?</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-[#2C3E95] text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                  <span>Your requirement will be reviewed by our team</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-[#2C3E95] text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                  <span>Matching dealers/distributors will be notified</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-[#2C3E95] text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                  <span>You'll start receiving responses within 24-48 hours</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-[#2C3E95] text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
                  <span>Connect with interested parties and grow your network</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PostRequirement;
