import { Edit2, Trash2 } from "lucide-react";
import EmptyState from "../ui/EmptyState.jsx";
import { formatCurrency, formatDate } from "../../utils/formatters.js";

const ExpenseTable = ({ expenses = [], onEdit, onDelete }) => {
  if (!expenses.length) {
    return <EmptyState title="No expenses found" description="Your filtered expense list is empty." />;
  }

  return (
    <div className="overflow-hidden rounded-lg border border-stone-200 bg-white shadow-soft dark:border-gray-800 dark:bg-gray-900">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-stone-100 text-xs uppercase text-stone-500 dark:bg-gray-950 dark:text-gray-400">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Notes</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 dark:divide-gray-800">
            {expenses.map((expense) => (
              <tr key={expense._id}>
                <td className="px-4 py-3 font-medium">{expense.title}</td>
                <td className="px-4 py-3">{expense.category}</td>
                <td className="px-4 py-3">{formatDate(expense.date)}</td>
                <td className="px-4 py-3 font-semibold text-coral">{formatCurrency(expense.amount)}</td>
                <td className="max-w-64 truncate px-4 py-3 text-stone-500 dark:text-gray-400">{expense.notes || "-"}</td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    <button className="rounded-lg p-2 hover:bg-stone-100 dark:hover:bg-gray-800" onClick={() => onEdit(expense)} aria-label="Edit expense">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button className="rounded-lg p-2 text-coral hover:bg-red-50 dark:hover:bg-red-950" onClick={() => onDelete(expense._id)} aria-label="Delete expense">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseTable;
