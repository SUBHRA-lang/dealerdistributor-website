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
    <div className="relative flex flex-col items-center my-4 lg:my-6 lg:-translate-y-4">
      {/* Wide rectangular slider — full column width, height matches side cards */}
      <div className="w-full h-[200px] sm:h-[280px] md:h-[440px] lg:h-[min(48vh,480px)] xl:h-[560px] mx-auto rounded-xl overflow-hidden shadow-2xl">
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
    </div>
  );
};

export default HeroSlider;
