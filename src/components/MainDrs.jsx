import { useTranslation } from 'react-i18next';
import DrCard from './DrCard';
import axios from 'axios'
import { useState } from 'react';

const MainDrs = () => {

  const [data, setData] = useState();

  const getData = async() =>{

    const response = await axios.get("http://localhost:5000/getData")
    setData(response.data)

  }

  const { t } = useTranslation();
  const doctors = t('doctors.list', { returnObjects: true });

  return (
    <section className="w-full bg-gray-50 py-16">
      <div className="mx-auto w-full max-w-screen-xl px-4">
        {/* Title aligned to right half */}
        <div className="flex justify-start mb-12">
          <div className="w-full md:w-1/2 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              {t('doctors.title')}
            </h2>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {doctors.map((doctor, index) => (
            <DrCard
              key={index}
              name={doctor.name}
              title={doctor.title}
              description={doctor.description}
              image={doctor.image}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainDrs;