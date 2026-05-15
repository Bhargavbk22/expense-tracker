import { useState } from "react";
import ExpenseForm from "../components/expenses/ExpenseForm.jsx";
import ExpenseTable from "../components/expenses/ExpenseTable.jsx";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input.jsx";
import Select from "../components/ui/Select.jsx";
import Skeleton from "../components/ui/Skeleton.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { useAsync } from "../hooks/useAsync.js";
import { expenseService } from "../services/expenseService.js";
import { expenseCategories, monthOptions } from "../utils/constants.js";

const Expenses = () => {
  const { showToast } = useToast();
  const [filters, setFilters] = useState({});
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const { data, loading, refetch } = useAsync(() => expenseService.list(filters), [JSON.stringify(filters)]);

  const save = async (payload) => {
    setSaving(true);
    try {
      editing ? await expenseService.update(editing._id, payload) : await expenseService.create(payload);
      showToast(editing ? "Expense updated" : "Expense added");
      setEditing(null);
      refetch();
    } catch (error) {
      showToast(error.message || "Could not save expense", "error");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    try {
      await expenseService.remove(id);
      showToast("Expense deleted");
      refetch();
    } catch (error) {
      showToast(error.message || "Could not delete expense", "error");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Expenses</h1>
        <p className="text-stone-500 dark:text-gray-400">Track and filter spending with clear categories.</p>
      </div>
      <ExpenseForm key={editing?._id || "new"} initialValue={editing} onSubmit={save} onCancel={editing ? () => setEditing(null) : null} loading={saving} />
      <div className="grid gap-3 rounded-lg border border-stone-200 bg-white p-4 shadow-soft dark:border-gray-800 dark:bg-gray-900 md:grid-cols-5">
        <Select label="Category" value={filters.category || ""} onChange={(e) => setFilters({ ...filters, category: e.target.value || undefined })}>
          <option value="">All</option>
          {expenseCategories.map((category) => <option key={category} value={category}>{category}</option>)}
        </Select>
        <Select label="Month" value={filters.month || ""} onChange={(e) => setFilters({ ...filters, month: e.target.value || undefined })}>
          <option value="">All</option>
          {monthOptions.map((month, index) => <option key={month} value={index + 1}>{month}</option>)}
        </Select>
        <Input label="Year" type="number" value={filters.year || ""} onChange={(e) => setFilters({ ...filters, year: e.target.value || undefined })} />
        <Input label="Min amount" type="number" value={filters.minAmount || ""} onChange={(e) => setFilters({ ...filters, minAmount: e.target.value || undefined })} />
        <Input label="Max amount" type="number" value={filters.maxAmount || ""} onChange={(e) => setFilters({ ...filters, maxAmount: e.target.value || undefined })} />
        <div className="md:col-span-5">
          <Button variant="secondary" onClick={() => setFilters({})}>Clear filters</Button>
        </div>
      </div>
      {loading ? <Skeleton className="h-72 w-full" /> : <ExpenseTable expenses={data || []} onEdit={setEditing} onDelete={remove} />}
    </div>
  );
};

export default Expenses;
