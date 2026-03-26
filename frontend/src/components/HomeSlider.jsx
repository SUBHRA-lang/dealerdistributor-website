import React, { useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const banners = [
  {
    image: '/assets/banners/banner_tea.png',
    title: 'Start Your Tea Business Journey',
    subtitle: 'Partner with Golden Leaf Tea for premium blends and lucrative opportunities.',
    cta: 'Apply for Distributorship',
    link: '/distributors?category=food-beverage'
  },
  {
    image: '/assets/banners/banner_led.png',
    title: 'Smart LED Lighting Solutions',
    subtitle: 'Join Lumina Tech as a distributor and lead the future of industrial lighting.',
    cta: 'Explore Opportunities',
    link: '/distributors?category=electronics-electrical'
  },
  {
    image: '/assets/banners/banner_agri.png',
    title: 'Empowering Future Farming',
    subtitle: 'Invest in sustainable agriculture with Agri-Fusion Investments. Higher ROI + Profit.',
    cta: 'Join Agri-Network',
    link: '/distributors?category=agriculture'
  },
  {
    image: '/assets/banners/banner_electronics.png',
    title: 'Unleash the Power of Technology',
    subtitle: 'Become an authorized Elitech dealer and distribute high-end consumer electronics.',
    cta: 'Become a Dealer',
    link: '/distributors?category=consumer-electronics'
  }
];

export const HomeSlider = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      const intervalId = setInterval(() => {
        emblaApi.scrollNext();
      }, 5000); // Auto-play every 5 seconds
      return () => clearInterval(intervalId);
    }
  }, [emblaApi]);

  return (
    <div className="relative overflow-hidden group rounded-3xl shadow-2xl bg-white mb-12 mx-4">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {banners.map((banner, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 relative h-[168px] sm:h-[248px] md:h-[248px] lg:h-[348px]">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              {/* Overlay with Text content - matching DealerDistributors style */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent flex items-center px-6 sm:px-10 md:px-16 lg:px-24">
                <div className="max-w-xl text-white space-y-6">
                  <h2 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black leading-tight drop-shadow-lg">
                    {banner.title}
                  </h2>
                  <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 font-medium drop-shadow-md hidden sm:block">
                    {banner.subtitle}
                  </p>
                  <Link to={banner.link} className="inline-block pt-4">
                    <Button className="bg-[#FF6B2C] hover:bg-[#e55a1f] text-white py-3 px-6 sm:py-5 sm:px-8 lg:py-6 lg:px-10 rounded-full text-sm sm:text-base lg:text-lg font-black shadow-xl scale-100 hover:scale-105 transition-all">
                      {banner.cta}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons - Hidden by default, shown on hover */}
      <div className="absolute top-1/2 -translate-y-1/2 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="outline"
          size="icon"
          onClick={scrollPrev}
          className="rounded-full bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white hover:text-black w-12 h-12"
        >
          <ChevronLeft className="w-6 h-6" />
        </Button>
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="outline"
          size="icon"
          onClick={scrollNext}
          className="rounded-full bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white hover:text-black w-12 h-12"
        >
          <ChevronRight className="w-6 h-6" />
        </Button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {banners.map((_, index) => (
          <div
            key={index}
            className="w-3 h-3 rounded-full bg-white/30 backdrop-blur-sm cursor-pointer hover:bg-white/60 transition-colors"
            onClick={() => emblaApi && emblaApi.scrollTo(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeSlider;
