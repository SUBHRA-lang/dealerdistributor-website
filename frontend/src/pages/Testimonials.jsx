import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { testimonials, videoTestimonials } from '../data/mock-data';

const Testimonials = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Success Stories
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover how DealerDistributors has helped businesses across India expand their reach and achieve their growth goals.
          </p>
        </div>

        {/* Video Testimonials Section */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-[#2C3E95] mb-8 pb-2 border-b-2 border-[#2C3E95] inline-block">
            Video Testimonials
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videoTestimonials.map((video) => (
              <div key={video.id} className="group">
                <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                  <div className="relative aspect-video">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${video.youtubeId}`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-4 bg-white">
                    <h3 className="font-semibold text-gray-900">{video.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Text Testimonials Section */}
        <section>
          <h2 className="text-2xl font-bold text-[#2C3E95] mb-8 pb-2 border-b-2 border-[#2C3E95] inline-block">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="hover:shadow-lg transition-all duration-300 border-none bg-white">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-[#2C3E95]/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 leading-tight">{testimonial.name}</h4>
                      <p className="text-sm text-[#2C3E95] font-medium">{testimonial.designation}</p>
                    </div>
                  </div>
                  <div className="relative">
                    <span className="absolute -top-4 -left-2 text-6xl text-gray-200 pointer-events-none font-serif">"</span>
                    <p className="text-gray-700 relative z-10 leading-relaxed italic">
                      {testimonial.testimonial}
                    </p>
                    <p className="mt-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      {testimonial.company}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Testimonials;
