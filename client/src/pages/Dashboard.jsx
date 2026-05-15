import { AlertTriangle, Banknote, Download, Receipt, Wallet } from "lucide-react";
import CategoryPieChart from "../components/charts/CategoryPieChart.jsx";
import MonthlyBarChart from "../components/charts/MonthlyBarChart.jsx";
import RecentTransactions from "../components/dashboard/RecentTransactions.jsx";
import StatCard from "../components/dashboard/StatCard.jsx";
import Button from "../components/ui/Button.jsx";
import Skeleton from "../components/ui/Skeleton.jsx";
import { analyticsService } from "../services/analyticsService.js";
import { reportService } from "../services/reportService.js";
import { useAsync } from "../hooks/useAsync.js";
import { formatCurrency } from "../utils/formatters.js";
import { useToast } from "../context/ToastContext.jsx";

const now = new Date();
const params = { month: now.getMonth() + 1, year: now.getFullYear() };

const Dashboard = () => {
  const { showToast } = useToast();
  const { data: summary, loading } = useAsync(() => analyticsService.summary(params), []);
  const { data: monthly } = useAsync(() => analyticsService.monthly({ year: params.year }), []);

  const download = async () => {
    try {
      await reportService.monthly(params);
    } catch (error) {
      showToast(error.message || "Report download failed", "error");
    }
  };

  if (loading) {
    return <Skeleton className="h-[520px] w-full" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-stone-500 dark:text-gray-400">A focused view of this month’s cash flow.</p>
        </div>
        <Button variant="secondary" onClick={download}><Download className="h-4 w-4" /> Monthly PDF</Button>
      </div>

      {summary?.budgetExceeded && (
        <div className="flex items-center gap-3 rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100">
          <AlertTriangle className="h-5 w-5" />
          Expenses have exceeded your monthly budget.
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total income" value={formatCurrency(summary.totalIncome)} icon={Banknote} />
        <StatCard title="Total expenses" value={formatCurrency(summary.totalExpenses)} icon={Receipt} tone="coral" />
        <StatCard title="Remaining balance" value={formatCurrency(summary.balance)} icon={Wallet} tone="ink" />
        <StatCard title="Budget used" value={`${summary.budgetUsage}%`} icon={AlertTriangle} tone={summary.budgetExceeded ? "coral" : "amber"} footer={`Limit ${formatCurrency(summary.budget)}`} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-soft dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold">Income vs Expense</h2>
          <div className="h-80"><MonthlyBarChart data={monthly || []} /></div>
        </div>
        <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-soft dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold">Category split</h2>
          <div className="h-80"><CategoryPieChart data={summary.categorySummary || []} /></div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-soft dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-lg font-semibold">AI Suggestions</h2>
          <div className="mt-4 space-y-3">
            {summary.suggestions.map((item) => (
              <p key={item} className="rounded-lg bg-stone-50 p-3 text-sm dark:bg-gray-950">{item}</p>
            ))}
          </div>
        </div>
        <RecentTransactions transactions={summary.recentTransactions} />
      </div>
    </div>
  );
};

export default Dashboard;
