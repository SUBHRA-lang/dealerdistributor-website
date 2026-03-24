import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Building2, User, Mail, MapPin, Package, Briefcase, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs';
import { useToast } from '../hooks/use-toast';

const RequestCallback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [type, setType] = useState('distributor'); // 'distributor' or 'franchise'
  const [intent, setIntent] = useState('appoint'); // 'appoint' (looking for) or 'become' (want to become)

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast({
        title: "Request Sent!",
        description: "One of our experts will call you back shortly.",
      });
    }, 1500);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center p-12 shadow-2xl border-none">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4">Request Successful!</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Thank you for your interest. Our representative will contact you on your provided mobile number within 24 business hours.
          </p>
          <Button 
            onClick={() => navigate('/')} 
            className="w-full bg-[#2C3E95] hover:bg-[#1f2d6b] rounded-full py-6 text-lg font-bold"
          >
            Back to Home
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Left-side Illustration/Content */}
      <div className="lg:w-1/2 bg-[#2C3E95] p-12 lg:p-24 text-white flex flex-col justify-center">
        <div className="max-w-xl mx-auto lg:mx-0">
          <h1 className="text-5xl font-black mb-6 leading-tight">
            Grow Your Business With <span className="text-orange-500">DealerDistributors</span>
          </h1>
          <p className="text-xl text-blue-100 mb-12">
            Trusted by 5,00,000+ businesses across India. Connect with the right partners today.
          </p>
          
          <div className="space-y-8">
            <div className="flex gap-4 items-start">
              <div className="bg-white/10 p-3 rounded-xl">
                <CheckCircle2 className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h4 className="font-bold text-lg">Verified Leads</h4>
                <p className="text-blue-100/80">Get access to authentic and background-checked business partners.</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="bg-white/10 p-3 rounded-xl">
                <CheckCircle2 className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h4 className="font-bold text-lg">Quick Callback</h4>
                <p className="text-blue-100/80">Our experts analyze your requirements and reach out within 24 hours.</p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="bg-white/10 p-3 rounded-xl">
                <CheckCircle2 className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <h4 className="font-bold text-lg">Pan-India Reach</h4>
                <p className="text-blue-100/80">Expand your distribution network to any corner of the country.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right-side Form */}
      <div className="lg:w-1/2 p-12 lg:p-24 flex items-center justify-center">
        <Card className="w-full max-w-xl border-none shadow-2xl overflow-hidden rounded-3xl bg-white">
          <CardContent className="p-8 md:p-12">
            <div className="mb-10">
              <h2 className="text-3xl font-black text-gray-900 mb-2">Request A Callback</h2>
              <p className="text-gray-500">Fill in the details below to get started</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Tabs for Distributor/Franchise */}
              <Tabs value={type} onValueChange={setType} className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-gray-100 rounded-xl p-1 h-14">
                  <TabsTrigger 
                    value="distributor" 
                    className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-[#2C3E95] data-[state=active]:shadow-sm font-bold text-gray-600 h-12"
                  >
                    Distributor
                  </TabsTrigger>
                  <TabsTrigger 
                    value="franchise" 
                    className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-[#2C3E95] data-[state=active]:shadow-sm font-bold text-gray-600 h-12"
                  >
                    Franchise
                  </TabsTrigger>
                </TabsList>
              </Tabs>

              {/* Radio Group for Intent */}
              <RadioGroup value={intent} onValueChange={setIntent} className="flex flex-col sm:flex-row gap-6 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex items-center space-x-3 cursor-pointer group">
                  <RadioGroupItem value="appoint" id="appoint" className="border-2 border-gray-300 text-[#2C3E95]" />
                  <Label htmlFor="appoint" className="font-bold text-gray-700 cursor-pointer group-hover:text-[#2C3E95] transition-colors">
                    I am looking for {type}
                  </Label>
                </div>
                <div className="flex items-center space-x-3 cursor-pointer group">
                  <RadioGroupItem value="become" id="become" className="border-2 border-gray-300 text-[#2C3E95]" />
                  <Label htmlFor="become" className="font-bold text-gray-700 cursor-pointer group-hover:text-[#2C3E95] transition-colors">
                    I want to become a {type}
                  </Label>
                </div>
              </RadioGroup>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase text-gray-400 tracking-widest pl-1">Company Name</Label>
                  <div className="relative group">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#2C3E95] transition-colors" />
                    <Input required className="pl-12 py-7 rounded-2xl border-gray-100 bg-gray-50 focus-visible:ring-4 focus-visible:ring-blue-500/10" placeholder="e.g. Acme Corp" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase text-gray-400 tracking-widest pl-1">Full Name</Label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#2C3E95] transition-colors" />
                    <Input required className="pl-12 py-7 rounded-2xl border-gray-100 bg-gray-50 focus-visible:ring-4 focus-visible:ring-blue-500/10" placeholder="e.g. John Doe" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase text-gray-400 tracking-widest pl-1">Mobile Number</Label>
                  <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400 border-r border-gray-200 pr-3">+91</span>
                    <Input required type="tel" className="pl-16 py-7 rounded-2xl border-gray-100 bg-gray-50 focus-visible:ring-4 focus-visible:ring-blue-500/10" placeholder="98765 43210" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase text-gray-400 tracking-widest pl-1">City Name</Label>
                  <div className="relative group">
                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#2C3E95] transition-colors" />
                    <Input required className="pl-12 py-7 rounded-2xl border-gray-100 bg-gray-50 focus-visible:ring-4 focus-visible:ring-blue-500/10" placeholder="e.g. Mumbai" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase text-gray-400 tracking-widest pl-1">Product Interested In</Label>
                  <div className="relative group">
                    <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#2C3E95] transition-colors" />
                    <Input required className="pl-12 py-7 rounded-2xl border-gray-100 bg-gray-50 focus-visible:ring-4 focus-visible:ring-blue-500/10" placeholder="e.g. Solar Panels" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase text-gray-400 tracking-widest pl-1">Pin Code</Label>
                  <div className="relative group">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#2C3E95] transition-colors" />
                    <Input required className="pl-12 py-7 rounded-2xl border-gray-100 bg-gray-50 focus-visible:ring-4 focus-visible:ring-blue-500/10" placeholder="400001" />
                  </div>
                </div>

                <div className="md:col-span-2 space-y-2">
                  <Label className="text-xs font-black uppercase text-gray-400 tracking-widest pl-1">Email Address</Label>
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#2C3E95] transition-colors" />
                    <Input required type="email" className="pl-12 py-7 rounded-2xl border-gray-100 bg-gray-50 focus-visible:ring-4 focus-visible:ring-blue-500/10" placeholder="e.g. john@example.com" />
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#FF6B2C] hover:bg-[#e55a1f] text-white py-8 rounded-2xl text-xl font-black shadow-xl shadow-orange-500/20 transition-all active:scale-95"
              >
                {loading ? 'Sending Request...' : 'Submit Request'}
                {!loading && <ChevronRight className="ml-2 w-6 h-6" />}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RequestCallback;
