import { Edit2, Trash2 } from "lucide-react";
import EmptyState from "../ui/EmptyState.jsx";
import { formatCurrency, formatDate } from "../../utils/formatters.js";

const IncomeTable = ({ income = [], onEdit, onDelete }) => {
  if (!income.length) {
    return <EmptyState title="No income found" description="Add a salary, freelance payment, dividend, or other source." />;
  }

  return (
    <div className="overflow-hidden rounded-lg border border-stone-200 bg-white shadow-soft dark:border-gray-800 dark:bg-gray-900">
      <table className="w-full text-left text-sm">
        <thead className="bg-stone-100 text-xs uppercase text-stone-500 dark:bg-gray-950 dark:text-gray-400">
          <tr>
            <th className="px-4 py-3">Source</th>
            <th className="px-4 py-3">Date</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100 dark:divide-gray-800">
          {income.map((item) => (
            <tr key={item._id}>
              <td className="px-4 py-3 font-medium">{item.source}</td>
              <td className="px-4 py-3">{formatDate(item.date)}</td>
              <td className="px-4 py-3 font-semibold text-mint">{formatCurrency(item.amount)}</td>
              <td className="px-4 py-3">
                <div className="flex justify-end gap-2">
                  <button className="rounded-lg p-2 hover:bg-stone-100 dark:hover:bg-gray-800" onClick={() => onEdit(item)} aria-label="Edit income">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button className="rounded-lg p-2 text-coral hover:bg-red-50 dark:hover:bg-red-950" onClick={() => onDelete(item._id)} aria-label="Delete income">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncomeTable;
