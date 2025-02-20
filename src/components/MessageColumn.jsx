const MessageColumn = ({ title, text }) => {
  return (
    <div className="text-center p-4 bg-[var(--color-accent)] rounded-2xl">
      <h3 className="text-xl font-semibold text-primary mb-4">
        {title}
      </h3>
      <p className="text-[var(--color-cream)] text-l">
        {text}
      </p>
    </div>
  );
};

export default MessageColumn;