const DrCard = ({ name, title, description, image }) => {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 text-center transform-gpu transition-all duration-150 hover:rounded-2xl hover:scale-105 hover:shadow-2xl origin-center ease-in-out">
        {/* Rounded Doctor Image */}
        <div className="mb-6 flex justify-center">
          <img
            src={image}
            alt={`Dr. ${name}`}
            className="w-32 h-32 rounded-4xl object-cover border-4 border-primary"
          />
        </div>
        
        {/* Doctor Details */}
        <h3 className="text-xl font-bold text-gray-900 mb-2">{name}</h3>
        <p className="text-primary font-medium mb-4">{title}</p>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    );
  };
  
  export default DrCard;