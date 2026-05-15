const variants = {
  primary: "bg-mint text-white hover:bg-teal-800",
  secondary: "bg-white text-ink ring-1 ring-stone-200 hover:bg-stone-50 dark:bg-gray-900 dark:text-white dark:ring-gray-800",
  danger: "bg-coral text-white hover:bg-red-700",
  ghost: "text-ink hover:bg-stone-100 dark:text-white dark:hover:bg-gray-800"
};

const Button = ({ children, className = "", variant = "primary", type = "button", ...props }) => (
  <button
    type={type}
    className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default Button;
