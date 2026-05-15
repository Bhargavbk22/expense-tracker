import { useState } from "react";
import CategoryPieChart from "../components/charts/CategoryPieChart.jsx";
import MonthlyBarChart from "../components/charts/MonthlyBarChart.jsx";
import Select from "../components/ui/Select.jsx";
import Skeleton from "../components/ui/Skeleton.jsx";
import { useAsync } from "../hooks/useAsync.js";
import { analyticsService } from "../services/analyticsService.js";
import { monthOptions } from "../utils/constants.js";

const Analytics = () => {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth() + 1);
  const { data: monthly, loading: monthlyLoading } = useAsync(() => analyticsService.monthly({ year }), [year]);
  const { data: categories, loading: categoryLoading } = useAsync(() => analyticsService.categories({ month, year }), [month, year]);
  const { data: summary } = useAsync(() => analyticsService.summary({ month, year }), [month, year]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-stone-500 dark:text-gray-400">Monthly, category, comparison, and yearly views.</p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:w-80">
          <Select label="Month" value={month} onChange={(e) => setMonth(Number(e.target.value))}>
            {monthOptions.map((item, index) => <option key={item} value={index + 1}>{item}</option>)}
          </Select>
          <Select label="Year" value={year} onChange={(e) => setYear(Number(e.target.value))}>
            {[year - 2, year - 1, year, year + 1].map((item) => <option key={item} value={item}>{item}</option>)}
          </Select>
        </div>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-soft dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold">Yearly income vs expenses</h2>
          <div className="h-96">{monthlyLoading ? <Skeleton className="h-full" /> : <MonthlyBarChart data={monthly || []} />}</div>
        </div>
        <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-soft dark:border-gray-800 dark:bg-gray-900">
          <h2 className="mb-4 text-lg font-semibold">Category spending</h2>
          <div className="h-96">{categoryLoading ? <Skeleton className="h-full" /> : <CategoryPieChart data={categories || []} />}</div>
        </div>
      </div>
      <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-soft dark:border-gray-800 dark:bg-gray-900">
        <h2 className="text-lg font-semibold">Spending signals</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {(summary?.suggestions || []).map((suggestion) => (
            <div key={suggestion} className="rounded-lg bg-stone-50 p-4 text-sm dark:bg-gray-950">{suggestion}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
