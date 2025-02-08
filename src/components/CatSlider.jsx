import React from 'react';
import Slider from 'react-slick';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CatSlider = ({ titleKey, link }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';
  const categories = t('categories', { returnObjects: true });
  // // Text link data with translation keys
  // const textLinks = [
  //   {
  //     id: 1,
  //     titleKey: t('categories.depression.name'),
  //     link: '/category/depression',
  //   },
  //   {
  //     id: 2,
  //     titleKey: 'tests.title',
  //     link: '/tests',
  //   },
  //   {
  //     id: 3,
  //     titleKey: 'appointments.title',
  //     link: '/appointments',
  //   },
  //   // Add more links as needed
  // ];

  // Slider settings for a compact design
  const settings = {
    dots: false,
    infinite: true,
    speed: 3000, // Transition speed in milliseconds
    slidesToShow: 4, // Number of visible slides
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 5000, // Delay between slides
    cssEase: 'cubic-bezier(.21,.91,.08,.95)', // Smooth linear transition
    // cssEase: 'cubic-bezier(0,1.14,0,.85)', // Smooth linear transition
    rtl: isRTL, // Enable RTL mode if needed
    focusOnSelect:true,
    pauseOnHover: true,
    pauseOnFocus: true,
    // swipeToSlide: true,
    touchMove: true,
    touchThreshold: 100,
    waitForAnimate: false,
    preventInteractionOnTransition: true,
    draggable: true,
    // variableWidth: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  
  return (
    <div className='bg-[var(--secondary-mint)]' >
    <div className="mx-auto p-3 w-full max-w-screen-xl h-full overflow-hidden">
      <Slider {...settings}>
        {Object.values(categories).map((category) => {
          // Generate URL path from category name
          const categoryPath = `/category/${category.name.toLowerCase().replace(' ', '-')}`;
          
          return (
            <div key={category.name} className="px-2 h-full">
              <Link
                to={categoryPath}
                draggable={false}
                className="bg-gray-100 rounded-md p-2 w-full active:bg-gray-300 hover:bg-gray-200 hover:rounded-2xl transition-all duration-300 ease-out h-full flex items-center justify-center z-9 focus:ring-2 focus:ring-secondary focus:ring-opacity-50"
                onDragStart={(e) => e.preventDefault()}
              > 
                <div className="text-center">
                  <h3 className="text-lg font-bold text-primary">
                    {category.slidertitle} {/* Directly use translated name from JSON */}
                  </h3>
                </div>
              </Link>
            </div>
          );
        })}
      </Slider>
    </div>
    </div>
  );
};

export default CatSlider;