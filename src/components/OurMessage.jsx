import { useTranslation } from 'react-i18next';
import MessageColumn from './MessageColumn';

const OurMessage = () => {
  const { t } = useTranslation();
  const columns = t('message_section.columns', { returnObjects: true });

  return (
    <section className="w-full bg-linear-to-b from-white to-amber-50 py-16">
      <div className="mx-auto w-full max-w-screen-xl px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          {t('message_section.title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {columns.map((column, index) => (
            <MessageColumn
              key={index}
              title={column.title}
              text={column.text}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurMessage;
