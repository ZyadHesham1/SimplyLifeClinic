import { useTranslation } from 'react-i18next';

const CategoryHero = ({ title, text, image }) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.dir() === 'rtl';

  return (
    <div className="w-full bg-gray-50 py-12">
      <div className={`mx-auto max-w-screen-xl px-4 flex flex-col md:flex-row ${isRTL ? 'md:flex-row-reverse' : ''} gap-8 items-center`}>
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">{title}</h1>
          <p className="text-lg text-gray-600">{text}</p>
        </div>
        <div className="md:w-1/2">
          <img 
            src={image} 
            alt={title} 
            className="rounded-lg shadow-xl w-full max-w-2xl h-64 object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryHero;