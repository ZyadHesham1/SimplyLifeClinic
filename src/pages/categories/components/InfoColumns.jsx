const InfoColumns = ({ columns, motive }) => {
  return (
    <div className="w-full py-16 bg-white">
      <div className="mx-auto max-w-screen-xl px-4">
        {/* Display the motive at the top */}


        {/* Render the columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {columns.map((column, index) => (
            <div key={index} className="p-6 bg-[var(--color-dark)] rounded-lg">
              <h3 className="text-xl font-semibold text-primary text-blue-50 mb-4">
                {column.title}
              </h3>
              <p className="text-[var(--secondary-iceblue)]">{column.content}</p>
            </div>
          ))}
        </div>
      </div>
      {motive && (
          <h3 className="text-xl font-semibold text-primary my-20 text-center ">
            {motive}
          </h3>
        )}
    </div>
  );
};

export default InfoColumns;