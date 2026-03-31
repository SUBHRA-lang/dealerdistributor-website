import React, { useState } from 'react';
import { Phone, Mail, Package, MessageSquare, Ship, Users, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Textarea } from './ui/textarea';

const AskExpertSection = () => {
  const [formData, setFormData] = useState({
    type: 'franchise',
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
          looking: 'I am looking for Dealers',
          become: 'I want to become a Dealers'
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
          type: 'franchise',
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
    <section className="bg-[#2C3E95] py-12 lg:py-20 text-white overflow-hidden relative">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-24 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-black mb-4 tracking-tight">Ask Our Experts</h2>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">Get personalized guidance to scale your business across India</p>
        </div>

        <div className="flex flex-col gap-12 lg:gap-16">
          {/* Top Row - Three Pillars (Horizontal Alignment) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 flex items-center gap-4 border border-white/10 hover:bg-white/15 transition-all group">
              <div className="bg-orange-500 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">Dealers</h3>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 flex items-center gap-4 border border-white/10 hover:bg-white/15 transition-all group">
              <div className="bg-orange-500 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <Ship className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">Distributors</h3>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 flex items-center gap-4 border border-white/10 hover:bg-white/15 transition-all group">
              <div className="bg-orange-500 p-3 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                <Package className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">Brands</h3>
            </div>
          </div>

          {/* Bottom - Form Card (Full Width / Horizontal Optimization) */}
          <div className="w-full">
            <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 text-gray-900 shadow-2xl">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                  <h3 className="text-2xl lg:text-3xl font-black text-[#2C3E95] mb-2">What are you looking for?</h3>
                  <p className="text-gray-500 font-medium tracking-wide flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    Fast Track Your Business Growth
                  </p>
                </div>

                {/* Type Toggle in Header for space saving */}
                <div className="flex bg-gray-100 p-1.5 rounded-2xl gap-1">
                  {['franchise', 'distributor', 'brands'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => handleTypeChange(t)}
                      className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all capitalize ${formData.type === t
                          ? 'bg-white text-[#2C3E95] shadow-md border border-gray-100'
                          : 'text-gray-500 hover:text-gray-700 hover:bg-white/50'
                        }`}
                    >
                      {t === 'franchise' ? 'Dealers' : t}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* horizontal row 1: Role Selection */}
                <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100">
                  <p className="text-xs font-black text-[#2C3E95]/60 uppercase tracking-widest mb-4">I want to...</p>
                  <RadioGroup
                    value={formData.role}
                    onValueChange={handleRoleChange}
                    className="flex flex-col sm:flex-row gap-6 lg:gap-12"
                  >
                    <div className="flex items-center space-x-3 group cursor-pointer">
                      <RadioGroupItem value="looking" id="role-looking" className="w-5 h-5 border-blue-300 text-[#2C3E95]" />
                      <Label htmlFor="role-looking" className="text-base font-bold text-gray-700 cursor-pointer group-hover:text-[#2C3E95] transition-colors">{roleLabels.looking}</Label>
                    </div>
                    <div className="flex items-center space-x-3 group cursor-pointer">
                      <RadioGroupItem value="become" id="role-become" className="w-5 h-5 border-blue-300 text-[#2C3E95]" />
                      <Label htmlFor="role-become" className="text-base font-bold text-gray-700 cursor-pointer group-hover:text-[#2C3E95] transition-colors">{roleLabels.become}</Label>
                    </div>
                  </RadioGroup>
                </div>

                {/* horizontal row 2: Contact Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="rounded-xl border-gray-200 h-14 bg-gray-50/50 focus:bg-white transition-all shadow-sm"
                    />
                  </div>
                  <div className="md:col-span-1 flex gap-2">
                    <div className="w-28 shrink-0">
                      <select
                        className="w-full h-14 rounded-xl border border-gray-200 bg-gray-50/50 px-3 text-sm font-bold focus:bg-white transition-all shadow-sm"
                        value={formData.countryCode}
                        onChange={(e) => setFormData(prev => ({ ...prev, countryCode: e.target.value }))}
                      >
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+64">🇳🇿 +64</option>
                        <option value="+971">🇦🇪 +971</option>
                        <option value="+66">🇹🇭 +66</option>
                        <option value="+380">🇺🇦 +380</option>
                        <option value="+351">🇵🇹 +351</option>
                        <option value="+7">🇷🇺 +7</option>
                        <option value="+86">🇨🇳 +86</option>
                        <option value="+81">🇯🇵 +81</option>
                        <option value="+61">🇦🇺 +61</option>
                        <option value="+55">🇧🇷 +55</option>
                        <option value="+52">🇲🇽 +52</option>
                        <option value="+33">🇫🇷 +33</option>
                        <option value="+49">🇩🇪 +49</option>
                        <option value="+39">🇮🇹 +39</option>
                        <option value="+34">🇪🇸 +34</option>
                        <option value="+55">🇧🇷 +55</option>
                        <option value="+52">🇲🇽 +52</option>
                        <option value="+33">🇫🇷 +33</option>
                        <option value="+49">🇩🇪 +49</option>
                        <option value="+39">🇮🇹 +39</option>
                        <option value="+34">🇪🇸 +34</option>
                      </select>
                    </div>
                    <Input
                      type="tel"
                      name="mobile"
                      placeholder="Mobile Number"
                      value={formData.mobile}
                      onChange={handleChange}
                      required
                      className="flex-1 rounded-xl border-gray-200 h-14 bg-gray-50/50 focus:bg-white transition-all shadow-sm"
                    />
                  </div>
                  <div className="md:col-span-1">
                    <Input
                      type="text"
                      name="productName"
                      placeholder="Enter Product Name"
                      value={formData.productName}
                      onChange={handleChange}
                      required
                      className="rounded-xl border-gray-200 h-14 bg-gray-50/50 focus:bg-white transition-all shadow-sm"
                    />
                  </div>
                </div>

                {/* horizontal row 3: Requirement & Submit */}
                <div className="flex flex-col lg:flex-row gap-6 items-start">
                  <div className="flex-1 w-full">
                    <Textarea
                      name="requirement"
                      placeholder="Briefly describe your business requirement..."
                      value={formData.requirement}
                      onChange={handleChange}
                      required
                      className="rounded-xl border-gray-200 min-h-[100px] bg-gray-50/50 focus:bg-white transition-all shadow-sm resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full lg:w-auto px-12 h-[100px] bg-[#FF6B2C] hover:bg-[#e55a1f] text-white font-black rounded-xl transition-all text-xl shadow-xl hover:shadow-2xl active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex flex-col items-center justify-center gap-1 group"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-6 w-6 animate-spin" />
                        <span className="text-sm">Submitting...</span>
                      </>
                    ) : (
                      <>
                        <span>SUBMIT</span>
                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                      </>
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AskExpertSection;
