import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Badge } from './ui/badge';
import { useToast } from '../hooks/use-toast';
import { Loader2, Mail, Phone, Building2, MapPin, Package, Send } from 'lucide-react';

const ProposalModal = ({ isOpen, onOpenChange, inquiryData }) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: 'Distributor',
    package: '3 star package',
    role: 'I want to become a distributor',
    email: '',
    mobile: '',
    name: '',
    companyName: '',
    pincode: '',
    city: '',
    productName: inquiryData?.category || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8001/send_proposal.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: "Proposal Sent!",
          description: "Your proposal has been sent successfully. Our team will contact you soon.",
        });
        onOpenChange(false);
        // Reset form
        setFormData({
          type: 'Distributor',
          package: '3 star package',
          role: 'I want to become a distributor',
          email: '',
          mobile: '',
          name: '',
          companyName: '',
          pincode: '',
          city: '',
          productName: inquiryData?.category || ''
        });
      } else {
        throw new Error(data.detail || 'Failed to send proposal');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-0 border-none shadow-2xl bg-white rounded-2xl">
        {/* Banner Pattern */}
        <div className="h-2 bg-gradient-to-r from-[#FF6B2C] via-[#2C3E95] to-[#FF6B2C]" />
        
        <div className="p-8">
          <DialogHeader className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <Badge variant="outline" className="text-[#2C3E95] bg-blue-50 border-blue-100 px-3 py-1 rounded-full text-xs font-semibold">
                Inquiry: {inquiryData?.name || 'Inquiry'}
              </Badge>
              <div className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Send Proposal</div>
            </div>
            <DialogTitle className="text-3xl font-black text-gray-900 leading-tight">
              What are you <span className="text-[#FF6B2C]">looking ?</span>
            </DialogTitle>
            <DialogDescription className="text-gray-500 mt-2">
              Fill in the details below to send your business proposal.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Toggles: Distributor / Franchise */}
            <div className="grid grid-cols-2 gap-4">
              <div 
                onClick={() => handleSelectChange('type', 'Franchise')}
                className={`cursor-pointer p-4 rounded-xl border-2 transition-all text-center font-bold ${formData.type === 'Franchise' ? 'border-[#FF6B2C] bg-orange-50 text-[#FF6B2C]' : 'border-gray-100 bg-white text-gray-400 hover:border-gray-200'}`}
              >
                Dealers
              </div>
              <div 
                onClick={() => handleSelectChange('type', 'Distributor')}
                className={`cursor-pointer p-4 rounded-xl border-2 transition-all text-center font-bold ${formData.type === 'Distributor' ? 'border-[#2C3E95] bg-blue-50 text-[#2C3E95]' : 'border-gray-100 bg-white text-gray-400 hover:border-gray-200'}`}
              >
                Distributors
              </div>
            </div>

            {/* Service & Inquiry Type Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="space-y-2">
                <Label htmlFor="package" className="text-xs font-bold uppercase tracking-wider text-gray-500">Service Package</Label>
                <Select value={formData.package} onValueChange={(val) => handleSelectChange('package', val)}>
                  <SelectTrigger className="w-full bg-gray-50 border-gray-100 rounded-xl h-12 focus:ring-[#2C3E95]">
                    <SelectValue placeholder="Select Package" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl border-gray-100">
                    <SelectItem value="1 star package">1 Star Package</SelectItem>
                    <SelectItem value="2 star package">2 Star Package</SelectItem>
                    <SelectItem value="3 star package">3 Star Package</SelectItem>
                    <SelectItem value="4 star package">4 Star Package</SelectItem>
                    <SelectItem value="5 star package">5 Star Package</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label className="text-xs font-bold uppercase tracking-wider text-gray-500">Inquiry Type</Label>
                <RadioGroup 
                  value={formData.role} 
                  onValueChange={(val) => handleSelectChange('role', val)}
                  className="flex flex-col gap-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={`I am looking for ${formData.type.toLowerCase()}`} id="r1" className="text-[#2C3E95]" />
                    <Label htmlFor="r1" className="text-sm font-medium text-gray-700">Looking for {formData.type === 'Franchise' ? 'Dealers' : formData.type}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={`I want to become a ${formData.type.toLowerCase()}`} id="r2" className="text-[#2C3E95]" />
                    <Label htmlFor="r2" className="text-sm font-medium text-gray-700">Want to become {formData.type === 'Franchise' ? 'Dealers' : formData.type}</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            {/* Main Contact Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                  <Input 
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 h-12 bg-gray-50 border-gray-100 rounded-xl focus:ring-[#2C3E95]"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative flex items-center">
                  <span className="absolute left-3 text-sm font-bold text-gray-400 border-r pr-2">+91</span>
                  <Input 
                    name="mobile"
                    placeholder="Mobile Number"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="pl-14 h-12 bg-gray-50 border-gray-100 rounded-xl focus:ring-[#2C3E95]"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Input 
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="h-12 bg-gray-50 border-gray-100 rounded-xl focus:ring-[#2C3E95]"
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Building2 className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                  <Input 
                    name="companyName"
                    placeholder="Company Name"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="pl-10 h-12 bg-gray-50 border-gray-100 rounded-xl focus:ring-[#2C3E95]"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Input 
                  name="pincode"
                  placeholder="Pin Code"
                  value={formData.pincode}
                  onChange={handleChange}
                  className="h-12 bg-gray-50 border-gray-100 rounded-xl focus:ring-[#2C3E95]"
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                  <Input 
                    name="city"
                    placeholder="City Name"
                    value={formData.city}
                    onChange={handleChange}
                    className="pl-10 h-12 bg-gray-50 border-gray-100 rounded-xl focus:ring-[#2C3E95]"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Package className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
                <Input 
                  name="productName"
                  placeholder="Product Name"
                  value={formData.productName}
                  onChange={handleChange}
                  className="pl-10 h-12 bg-gray-50 border-gray-100 rounded-xl focus:ring-[#2C3E95]"
                  required
                />
              </div>
            </div>

            <DialogFooter className="pt-4 flex !flex-col gap-3">
              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-[#FF6B2C] hover:bg-[#e55a1f] text-white font-bold h-14 rounded-xl shadow-lg transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending Proposal...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Proposal
                  </>
                )}
              </Button>
              <p className="text-[10px] text-center text-gray-400">
                By clicking "Send Proposal", you agree to our terms and conditions.
              </p>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProposalModal;
