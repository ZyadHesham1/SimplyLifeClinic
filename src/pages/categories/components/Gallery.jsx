import React from 'react';

const Gallery = ({ title, images, isRTL }) => {
  return (
    <div className="w-full py-16 bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4">
        {/* Gallery Title */}
        <h2 className={`text-3xl font-bold text-primary mb-8 text-center ${isRTL ? 'rtl' : 'ltr'}`}>
          {title}
        </h2>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-lg">
              <img
                src={image.src}
                alt={image.alt || `Gallery Image ${index + 1}`}
                className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;