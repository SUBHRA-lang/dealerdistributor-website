import React, { useState } from 'react';
import { CheckCircle2, MapPin, ArrowRight } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { distributorInquiries } from '../data/mock-data';
import ProposalModal from './ProposalModal';

const DistributorInquiries = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  const handleSendProposal = (inquiry) => {
    setSelectedInquiry(inquiry);
    setIsModalOpen(true);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Discover Distributors' Inquiries</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {distributorInquiries.map((inquiry) => (
            <Card key={inquiry.id} className="group hover:shadow-2xl transition-all duration-300 border-gray-100 flex flex-col h-full relative overflow-hidden">
              <CardContent className="p-6 flex flex-col h-full">
                {/* Header: Initial + Category + Verification */}
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-[#2C3E95] font-bold text-xl shadow-inner">
                      {inquiry.initial}
                    </div>
                    <Badge 
                      variant="outline" 
                      className="border-none font-medium px-3 py-1 rounded-full text-xs"
                      style={{ backgroundColor: inquiry.categoryColor, color: '#444' }}
                    >
                      {inquiry.category}
                    </Badge>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-green-500 fill-green-50" title="Verified Lead" />
                </div>

                {/* Business Info */}
                <div className="mb-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-1 group-hover:text-[#2C3E95] transition-colors">
                    {inquiry.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                    <MapPin className="w-3.5 h-3.5" />
                    {inquiry.location}
                  </div>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4 mb-5 pb-5 border-b border-dashed border-gray-100 mt-auto">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1">Investment</p>
                    <p className="text-xs font-bold text-gray-800">{inquiry.investment}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-1">Experience</p>
                    <p className="text-xs font-bold text-gray-800">{inquiry.experience}</p>
                  </div>
                </div>

                {/* Description Snippet */}
                <p className="text-xs text-gray-600 line-clamp-2 italic mb-6">
                  "{inquiry.description}"
                </p>

                {/* Action Button */}
                <Button 
                  onClick={() => handleSendProposal(inquiry)}
                  className="w-full bg-[#F35B04] hover:bg-[#d94d03] text-white font-bold rounded-full py-6 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 group-hover:scale-[1.02]"
                >
                  Send Proposal
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </CardContent>
              
              {/* Date Badge */}
              <div className="absolute top-2 right-12 text-[9px] font-semibold text-gray-300 pointer-events-none">
                {inquiry.date}
              </div>
            </Card>
          ))}
        </div>
      </div>

      <ProposalModal 
        isOpen={isModalOpen} 
        onOpenChange={setIsModalOpen} 
        inquiryData={selectedInquiry}
      />
    </section>
  );
};

export default DistributorInquiries;
