import { useTranslation } from 'react-i18next';
import DrCard from '../../../components/DrCard';

const CategoryDoctors = ({ categoryId }) => {
  const { t } = useTranslation();

  // Get all doctors from JSON
  const doctors = t('doctors.list', { returnObjects: true });

  // Filter doctors who have this category in their "categories" array
  const filteredDoctors = Object.values(doctors).filter((doctor) =>
    doctor.categories?.includes(categoryId)
  );

  return (
    <div className="w-full py-16 bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t('CategoryDoctors.specialists_title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredDoctors.map((doctor) => (
            <DrCard key={doctor.name} {...doctor} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryDoctors;
