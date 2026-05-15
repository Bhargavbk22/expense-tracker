import { useState } from "react";
import IncomeForm from "../components/income/IncomeForm.jsx";
import IncomeTable from "../components/income/IncomeTable.jsx";
import Skeleton from "../components/ui/Skeleton.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { useAsync } from "../hooks/useAsync.js";
import { incomeService } from "../services/incomeService.js";

const Income = () => {
  const { showToast } = useToast();
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const { data, loading, refetch } = useAsync(() => incomeService.list(), []);

  const save = async (payload) => {
    setSaving(true);
    try {
      editing ? await incomeService.update(editing._id, payload) : await incomeService.create(payload);
      showToast(editing ? "Income updated" : "Income added");
      setEditing(null);
      refetch();
    } catch (error) {
      showToast(error.message || "Could not save income", "error");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (id) => {
    try {
      await incomeService.remove(id);
      showToast("Income deleted");
      refetch();
    } catch (error) {
      showToast(error.message || "Could not delete income", "error");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Income</h1>
        <p className="text-stone-500 dark:text-gray-400">Manage all income sources in one place.</p>
      </div>
      <IncomeForm key={editing?._id || "new"} initialValue={editing} onSubmit={save} onCancel={editing ? () => setEditing(null) : null} loading={saving} />
      {loading ? <Skeleton className="h-72 w-full" /> : <IncomeTable income={data || []} onEdit={setEditing} onDelete={remove} />}
    </div>
  );
};

export default Income;
