import React, { useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

const heroImages = [
  { src: '/assets/hero-slider/dealer.png', alt: 'Industrial Distribution' },
  { src: '/assets/hero-slider/meeting.png', alt: 'Business Meeting' },
  { src: '/assets/hero-slider/logistics.png', alt: 'Modern Logistics' }
];

const HeroSlider = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 40 });

  useEffect(() => {
    if (emblaApi) {
      const intervalId = setInterval(() => {
        emblaApi.scrollNext();
      }, 4000);
      return () => clearInterval(intervalId);
    }
  }, [emblaApi]);

  return (
    <div className="relative flex flex-col items-center my-4 lg:my-8">
      {/* Responsive circular slider — fluid, never overflows its column */}
      <div className="w-full aspect-square max-w-[310px] sm:max-w-[380px] md:max-w-[500px] lg:max-w-[580px] xl:max-w-[610px] mx-auto rounded-full bg-gradient-to-br from-[#4C3F91] to-[#2C3E95] flex items-center justify-center overflow-hidden shadow-2xl border-4 border-white">
        <div className="overflow-hidden w-full h-full" ref={emblaRef}>
          <div className="flex w-full h-full">
            {heroImages.map((image, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0 h-full relative">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Exclusive Brands badge */}
      <div className="mt-4 lg:mt-6">
        <div className="bg-white rounded-full px-6 py-3 shadow-lg border border-gray-100">
          <p className="text-sm font-semibold text-gray-900 text-center">Exclusive Brands</p>
          <p className="text-xs text-gray-600 text-center">Top Industry Players Trust DealerDistributors</p>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
