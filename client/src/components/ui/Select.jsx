const Select = ({ label, children, className = "", ...props }) => (
  <label className="block">
    <span className="mb-1.5 block text-sm font-medium text-stone-700 dark:text-gray-200">{label}</span>
    <select
      className={`w-full rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-mint focus:ring-2 focus:ring-teal-100 dark:border-gray-800 dark:bg-gray-900 dark:text-white ${className}`}
      {...props}
    >
      {children}
    </select>
  </label>
);

export default Select;
