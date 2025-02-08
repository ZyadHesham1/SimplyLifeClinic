import { useTranslation } from 'react-i18next';
import DrCard from '../../../components/DrCard';

const CategoryDoctors = ({ doctorIds }) => {
  const { t } = useTranslation();

  return (
    <div className="w-full py-16 bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          {t('CategoryDoctors.specialists_title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {doctorIds.map((doctorId) => {
            const doctor = t(`CategoryDoctors.${doctorId}`, { returnObjects: true });
            return <DrCard key={doctorId} {...doctor} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default CategoryDoctors;