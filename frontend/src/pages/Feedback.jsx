import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Building2, Phone, Mail, FileText, Send, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { useToast } from '../hooks/use-toast';
import { contactAPI } from '../services/api';

const Feedback = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await contactAPI.submit({
        ...formData,
        // Ensure feedback uses a specific prefix or just normal contact
        subject: `[FEEDBACK] ${formData.subject}`
      });
      setLoading(false);
      setSubmitted(true);
      toast({
        title: "Feedback Submitted!",
        description: "Thank you for your valuable feedback. We appreciate your input.",
      });
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error",
        description: "Failed to submit feedback. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="max-w-md w-full text-center p-12 shadow-2xl border-none">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-12 h-12 text-green-600" />
          </div>
          <h2 className="text-3xl font-black text-gray-900 mb-4">Thank You!</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Your feedback has been successfully submitted. We use your suggestions to improve our services every day.
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
    <div className="min-h-screen bg-gray-50 py-20 px-4">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
        {/* Left Side Content */}
        <div className="lg:w-1/2 space-y-8">
          <div>
            <h1 className="text-5xl font-black text-[#2C3E95] mb-6 leading-tight">
              We Value Your <span className="text-orange-500">Feedback</span>
            </h1>
            <p className="text-xl text-gray-600">
              Help us improve your experience. Whether you have a suggestion, a compliment, or a concern, we're all ears.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <Card className="border-none shadow-sm bg-white p-6 rounded-2xl">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-bold mb-2">Email Us</h4>
              <p className="text-sm text-gray-500">query@dealerdistributors.com</p>
            </Card>
            <Card className="border-none shadow-sm bg-white p-6 rounded-2xl">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-bold mb-2">Call Us</h4>
              <p className="text-sm text-gray-500">+91 7603009254</p>
            </Card>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="lg:w-1/2 w-full">
          <Card className="border-none shadow-2xl rounded-3xl overflow-hidden bg-white">
            <CardContent className="p-8 md:p-12">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase text-gray-400 tracking-widest pl-1">Full Name</Label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#2C3E95] transition-colors" />
                      <Input name="name" value={formData.name} onChange={handleChange} required className="pl-12 py-6 rounded-xl border-gray-100 bg-gray-50" placeholder="John Doe" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase text-gray-400 tracking-widest pl-1">Company Name</Label>
                    <div className="relative group">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#2C3E95] transition-colors" />
                      <Input name="company" value={formData.company} onChange={handleChange} className="pl-12 py-6 rounded-xl border-gray-100 bg-gray-50" placeholder="Acme Corp" />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase text-gray-400 tracking-widest pl-1">Mobile Number</Label>
                    <div className="relative group">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#2C3E95] transition-colors" />
                      <Input name="phone" value={formData.phone} onChange={handleChange} required className="pl-12 py-6 rounded-xl border-gray-100 bg-gray-50" placeholder="98765 43210" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-black uppercase text-gray-400 tracking-widest pl-1">Email Address</Label>
                    <div className="relative group">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#2C3E95] transition-colors" />
                      <Input name="email" value={formData.email} onChange={handleChange} required type="email" className="pl-12 py-6 rounded-xl border-gray-100 bg-gray-50" placeholder="john@example.com" />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase text-gray-400 tracking-widest pl-1">Subject</Label>
                  <div className="relative group">
                    <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#2C3E95] transition-colors" />
                    <Input name="subject" value={formData.subject} onChange={handleChange} required className="pl-12 py-6 rounded-xl border-gray-100 bg-gray-50" placeholder="e.g. Website Experience" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs font-black uppercase text-gray-400 tracking-widest pl-1">Description</Label>
                  <Textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required 
                    className="min-h-[150px] rounded-xl border-gray-100 bg-gray-50 p-4 focus-visible:ring-[#2C3E95]" 
                    placeholder="Please tell us more about your feedback..."
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-[#FF6B2C] hover:bg-[#e55a1f] text-white py-8 rounded-xl text-lg font-black shadow-xl shadow-orange-500/10"
                >
                  {loading ? 'Submitting...' : 'Submit Feedback'}
                  {!loading && <Send className="ml-2 w-5 h-5" />}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
