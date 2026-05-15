import { useEffect, useState } from "react";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input.jsx";
import Select from "../components/ui/Select.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { budgetService } from "../services/budgetService.js";
import { monthOptions } from "../utils/constants.js";

const Settings = () => {
  const now = new Date();
  const { showToast } = useToast();
  const [form, setForm] = useState({ monthlyLimit: "", month: now.getMonth() + 1, year: now.getFullYear() });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    budgetService.get({ month: form.month, year: form.year }).then((budget) => {
      setForm((current) => ({ ...current, monthlyLimit: budget?.monthlyLimit || "" }));
    });
  }, [form.month, form.year]);

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await budgetService.save({ ...form, monthlyLimit: Number(form.monthlyLimit), month: Number(form.month), year: Number(form.year) });
      showToast("Budget saved");
    } catch (error) {
      showToast(error.message || "Could not save budget", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-stone-500 dark:text-gray-400">Set monthly budget alerts and preferences.</p>
      </div>
      <form onSubmit={submit} className="grid gap-4 rounded-lg border border-stone-200 bg-white p-5 shadow-soft dark:border-gray-800 dark:bg-gray-900 md:grid-cols-3">
        <Input label="Monthly budget" type="number" min="0" value={form.monthlyLimit} onChange={(e) => setForm({ ...form, monthlyLimit: e.target.value })} required />
        <Select label="Month" value={form.month} onChange={(e) => setForm({ ...form, month: Number(e.target.value) })}>
          {monthOptions.map((item, index) => <option key={item} value={index + 1}>{item}</option>)}
        </Select>
        <Input label="Year" type="number" value={form.year} onChange={(e) => setForm({ ...form, year: Number(e.target.value) })} required />
        <div className="md:col-span-3">
          <Button type="submit" disabled={loading}>{loading ? "Saving..." : "Save budget"}</Button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
