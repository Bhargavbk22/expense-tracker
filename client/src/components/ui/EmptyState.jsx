import { Inbox } from "lucide-react";

const EmptyState = ({ title = "No data yet", description = "Create your first entry to see it here." }) => (
  <div className="flex min-h-48 flex-col items-center justify-center rounded-lg border border-dashed border-stone-300 bg-white p-8 text-center dark:border-gray-800 dark:bg-gray-900">
    <Inbox className="mb-3 h-10 w-10 text-stone-400" />
    <h3 className="text-base font-semibold text-ink dark:text-white">{title}</h3>
    <p className="mt-1 max-w-sm text-sm text-stone-500 dark:text-gray-400">{description}</p>
  </div>
);

export default EmptyState;
