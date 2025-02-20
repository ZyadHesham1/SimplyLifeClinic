import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import heroImg from '../assets/heroImg.jpg';  

const Hero = () => {
  const { t } = useTranslation();

  return (
    <div className="w-full bg-gradient-to-b from-[var(--color-accent)] to-white py-12 mt-2">
      <div className="mx-auto w-full max-w-screen-xl px-4">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Text Content - Left Column */}
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 rtl:text-right">
              {t('hero.title')}
            </h1>
            <p className="text-lg md:text-xl text-gray-600 rtl:text-right">
              {t('hero.subtitle')}
            </p>

            {/* List of 3 Items */}
            <ul className="space-y-4 text-left">
              <li className="flex items-center gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-black rounded-full flex items-center justify-center">
                  ✓
                </span>
                <span className="text-gray-700">{t('hero.list_item_1')}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-black rounded-full flex items-center justify-center">
                  ✓
                </span>
                <span className="text-gray-700">{t('hero.list_item_2')}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-primary text-black rounded-full flex items-center justify-center">
                  ✓
                </span>
                <span className="text-gray-700">{t('hero.list_item_3')}</span>
              </li>
            </ul>

            {/* Call-to-Action Buttons */}
            <div className="inline flex-col md:flex-row gap-4 justify-center md:justify-start bg-[var(--color-cream)] rounded-2xl p-2">
              <Link
                to="/appointments"
                className="bg-primary text-black px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors duration-300"
              >
                {t('hero.cta_primary')}
              </Link>
            </div>
          </div>

          {/* Image - Right Column */}
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <img
              src={heroImg} // Replace with your image path
              alt={t('hero.image_alt')}
              className="rounded-lg shadow-xl w-full max-w-md md:max-w-none h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
