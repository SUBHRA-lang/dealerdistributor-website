import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Phone, Mail, MapPin, DollarSign, Calendar, ArrowLeft, Package } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { distributorsAPI, callbackAPI } from '../services/api';
import { distributors as mockDistributors } from '../data/mock-data';
import { useToast } from '@/hooks/use-toast';

const DistributorDetail = () => {
  const { id } = useParams();
  const [distributor, setDistributor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const { toast } = useToast();

  const handleExpressInterest = async () => {
    try {
      // Demo User Data for this exercise
      const demoData = {
        type: 'distributor',
        intent: 'become',
        companyName: 'Demo Interest Corp',
        fullName: 'John Demo',
        phone: '9876543210',
        city: 'Demo City',
        product: distributor.name,
        pincode: '400001',
        email: 'demo@example.com'
      };

      await callbackAPI.submit(demoData);

      toast({
        title: "Interest Expressed!",
        description: `Your interest in ${distributor.name} has been recorded. They will contact you soon.`,
      });
    } catch (error) {
      console.error('Error expressing interest:', error);
      toast({
        title: "Error",
        description: "Failed to submit interest. Please try again.",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    const fetchDistributor = async () => {
      try {
        const res = await distributorsAPI.getById(id);
        setDistributor(res.data);
      } catch (error) {
        console.error('Error fetching distributor:', error);
        const mockDistributor = mockDistributors.find(d => d.id === parseInt(id));
        if (mockDistributor) {
          setDistributor(mockDistributor);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchDistributor();
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

  if (!distributor) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold">Distributor not found</h2>
        <Link to="/distributors">
          <Button className="mt-4">Back to Distributors</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <Link to="/distributors" className="inline-flex items-center text-[#2C3E95] hover:underline mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Distributors
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg">
              <CardContent className="p-8">
                {/* Header */}
                <div className="flex items-start gap-6 mb-8">
                  <img
                    src={distributor.logo}
                    alt={distributor.name}
                    className="w-24 h-24 rounded-lg object-cover shadow"
                  />
                  <div className="flex-1">
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 mb-2">
                      {distributor.category}
                    </Badge>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{distributor.name}</h1>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{distributor.location}</span>
                    </div>
                  </div>
                </div>

                {/* Key Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-green-700 mb-2">
                      <DollarSign className="w-5 h-5" />
                      <span className="font-semibold">Investment</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{distributor.investmentRange}</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-blue-700 mb-2">
                      <Calendar className="w-5 h-5" />
                      <span className="font-semibold">Established</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{distributor.established}</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-purple-700 mb-2">
                      <Package className="w-5 h-5" />
                      <span className="font-semibold">Experience</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{distributor.experience}</p>
                  </div>
                </div>

                {/* Tabs */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="products">Products</TabsTrigger>
                    <TabsTrigger value="territories">Territories</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="mt-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-bold text-lg mb-2">About the Company</h3>
                        <p className="text-gray-700">{distributor.description}</p>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg mb-2">Why Partner With Us?</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                          <li>Established brand with proven track record</li>
                          <li>Comprehensive training and support</li>
                          <li>Attractive margin structures</li>
                          <li>Marketing and promotional support</li>
                          <li>Exclusive territory rights</li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="products" className="mt-6">
                    <div>
                      <h3 className="font-bold text-lg mb-4">Product Portfolio</h3>
                      <ul className="space-y-2">
                        {distributor.products.map((product, index) => (
                          <li key={index} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                            <Package className="w-5 h-5 text-[#2C3E95] mt-0.5" />
                            <span className="text-gray-800">{product}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                  <TabsContent value="territories" className="mt-6">
                    <div>
                      <h3 className="font-bold text-lg mb-4">Available Territories</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {distributor.territories.map((territory, index) => (
                          <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                            <MapPin className="w-5 h-5 text-[#2C3E95]" />
                            <span className="text-gray-800 font-medium">{territory}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Contact */}
          <div className="lg:col-span-1">
            <Card className="shadow-lg sticky top-24">
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-6">Get in Touch</h3>

                <div className="space-y-4 mb-6">
                  <a href={`tel:${distributor.phone}`} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition">
                    <Phone className="w-5 h-5 text-green-700" />
                    <div>
                      <p className="text-xs text-gray-600">Call Now</p>
                      <p className="font-semibold text-green-700">{distributor.phone}</p>
                    </div>
                  </a>

                  {distributor.email && (
                    <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                      <Mail className="w-5 h-5 text-blue-700" />
                      <div>
                        <p className="text-xs text-gray-600">Email</p>
                        <p className="font-semibold text-blue-700 text-sm break-all">{distributor.email}</p>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <MapPin className="w-5 h-5 text-purple-700" />
                    <div>
                      <p className="text-xs text-gray-600">Location</p>
                      <p className="font-semibold text-purple-700">{distributor.location}</p>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleExpressInterest}
                  className="w-full bg-[#FF6B2C] hover:bg-[#e55a1f] rounded-full mb-3"
                >
                  Express Interest
                </Button>
                <Button variant="outline" className="w-full rounded-full">
                  Download Brochure
                </Button>

                {/* Quick Stats */}
                <div className="mt-6 pt-6 border-t">
                  <h4 className="font-semibold text-sm mb-3">Quick Facts</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Founded</span>
                      <span className="font-semibold">{distributor.established}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category</span>
                      <span className="font-semibold">{distributor.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Products</span>
                      <span className="font-semibold">{distributor.products.length}+</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DistributorDetail;
