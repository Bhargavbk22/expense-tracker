import EmptyState from "../ui/EmptyState.jsx";
import { formatCurrency, formatDate } from "../../utils/formatters.js";

const RecentTransactions = ({ transactions = [] }) => (
  <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-soft dark:border-gray-800 dark:bg-gray-900">
    <h2 className="text-lg font-semibold">Recent Transactions</h2>
    <div className="mt-4 space-y-3">
      {!transactions.length ? (
        <EmptyState title="No transactions yet" description="Add income or expenses to populate your feed." />
      ) : (
        transactions.map((item) => (
          <div key={`${item.type}-${item._id}`} className="flex items-center justify-between rounded-lg bg-stone-50 p-3 dark:bg-gray-950">
            <div>
              <p className="font-medium">{item.label}</p>
              <p className="text-xs text-stone-500 dark:text-gray-400">{formatDate(item.date)}</p>
            </div>
            <span className={item.type === "income" ? "font-semibold text-mint" : "font-semibold text-coral"}>
              {item.type === "income" ? "+" : "-"}{formatCurrency(item.amount)}
            </span>
          </div>
        ))
      )}
    </div>
  </div>
);

export default RecentTransactions;
