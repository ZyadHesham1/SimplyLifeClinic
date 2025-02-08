import { useTranslation } from 'react-i18next';

const TestButton = ({ category }) => {
  const { t } = useTranslation();

  return (
    <div className="w-full py-12 bg-white text-center">
      <button className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-dark transition-colors">
        {t('take_test_button')} ({t(`categories.${category}.test_title`)})
      </button>
    </div>
  );
};

export default TestButton;