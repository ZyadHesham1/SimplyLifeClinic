const MessageColumn = ({ title, text }) => {
  return (
    <div className="text-center p-4">
      <h3 className="text-xl font-semibold text-primary mb-4">
        {title}
      </h3>
      <p className="text-gray-600">
        {text}
      </p>
    </div>
  );
};

export default MessageColumn;