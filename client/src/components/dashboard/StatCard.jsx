const StatCard = ({ title, value, tone = "teal", icon: Icon, footer }) => {
  const tones = {
    teal: "bg-teal-50 text-mint dark:bg-teal-950 dark:text-teal-200",
    coral: "bg-red-50 text-coral dark:bg-red-950 dark:text-red-200",
    amber: "bg-amber-50 text-amber dark:bg-amber-950 dark:text-amber-200",
    ink: "bg-stone-100 text-ink dark:bg-gray-800 dark:text-white"
  };

  return (
    <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-soft dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-stone-500 dark:text-gray-400">{title}</p>
          <p className="mt-2 text-2xl font-bold">{value}</p>
        </div>
        {Icon && (
          <div className={`rounded-lg p-3 ${tones[tone]}`}>
            <Icon className="h-5 w-5" />
          </div>
        )}
      </div>
      {footer && <p className="mt-4 text-sm text-stone-500 dark:text-gray-400">{footer}</p>}
    </div>
  );
};

export default StatCard;
