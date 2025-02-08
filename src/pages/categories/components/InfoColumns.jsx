const InfoColumns = ({ columns }) => {
    return (
      <div className="w-full py-16 bg-white">
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {columns.map((column, index) => (
              <div key={index} className="p-6 bg-gray-50 rounded-lg">
                <h3 className="text-xl font-semibold text-primary mb-4">
                  {column.title}
                </h3>
                <p className="text-gray-600">{column.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };
  
  export default InfoColumns;