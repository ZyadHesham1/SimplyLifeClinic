import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CategoryHero from './components/CategoryHero';
import InfoColumns from './components/InfoColumns';
import TestButton from './components/TestButton';
import CategoryDoctors from './components/CategoryDoctors';
import CatSlider from '../../components/CatSlider';
import Gallery from './components/Gallery'; // Import the Gallery component


const CategoryPage = () => {
  const { categoryId } = useParams();
  const { t, i18n } = useTranslation();
  
  // Get category data from translations
  const categoryData = t(`categories.${categoryId}`, { returnObjects: true });
  const infoColumns = t(`categories.${categoryId}.info_columns`, { returnObjects: true });
  const galleryData = t(`categories.${categoryId}.gallery`, { returnObjects: true }); // Get gallery data


  // Handle invalid category
  if (!categoryData.hero) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-bold text-red-600">
          {t('category_not_found')}
        </h1>
      </div>
    );
  }

  return (
    <>
    <CatSlider/>
    <div className="min-h-screen">
      {/* Hero Section */}
      <CategoryHero 
        title={categoryData.hero.title}
        text={categoryData.hero.text}
        image={categoryData.hero.image}
        isRTL={i18n.dir() === 'rtl'}
      />
      
      {/* Info Columns */}
      <InfoColumns columns={infoColumns} motive={categoryData.motive} />

      {/* Gallery Section */}
      {galleryData && galleryData.images && galleryData.images.length > 0 && (
          <Gallery
            title={galleryData.title}
            images={galleryData.images}
            isRTL={i18n.dir() === 'rtl'}
          />
        )}
      
      {/* Test Button */}
      {/* <TestButton category={categoryId} /> */}
      
      {/* Doctors List */}
      {/* <CategoryDoctors categoryId={categoryId} /> */}
    </div>
    </>
  );
};

export default CategoryPage;