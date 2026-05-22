const Input = ({ type = 'text', placeholder, value, onChange, className = '', ...props }) => {

  const isInvalid = props['aria-invalid'] === 'true' || /border-(red|#ef4444|red-500)/.test(className);

  const baseFocus = 'focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-200';

  const errorFocus = 'focus:outline-none focus:border-red-500 focus:ring-4 focus:ring-red-200';

  const combinedClassName = `${className} ${isInvalid ? errorFocus : baseFocus}`.trim();

  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={combinedClassName}
      {...props}
    />
  );
};

export default Input;