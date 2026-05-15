const Skeleton = ({ className = "" }) => (
  <div className={`animate-pulse rounded-lg bg-stone-200 dark:bg-gray-800 ${className}`} />
);

export default Skeleton;
