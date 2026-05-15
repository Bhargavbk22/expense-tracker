import { useState } from "react";
import { toInputDate } from "../../utils/formatters.js";
import Button from "../ui/Button.jsx";
import Input from "../ui/Input.jsx";

const initialState = { source: "", amount: "", date: toInputDate() };

const IncomeForm = ({ initialValue, onSubmit, onCancel, loading }) => {
  const [form, setForm] = useState(initialValue ? { ...initialValue, date: toInputDate(initialValue.date) } : initialState);

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const submit = (event) => {
    event.preventDefault();
    onSubmit({ ...form, amount: Number(form.amount) });
    if (!initialValue) setForm(initialState);
  };

  return (
    <form onSubmit={submit} className="grid gap-4 rounded-lg border border-stone-200 bg-white p-5 shadow-soft dark:border-gray-800 dark:bg-gray-900 md:grid-cols-3">
      <Input label="Source" name="source" value={form.source} onChange={handleChange} required />
      <Input label="Amount" name="amount" type="number" min="0" step="0.01" value={form.amount} onChange={handleChange} required />
      <Input label="Date" name="date" type="date" value={form.date} onChange={handleChange} required />
      <div className="flex gap-3 md:col-span-3">
        <Button type="submit" disabled={loading}>{initialValue ? "Update income" : "Add income"}</Button>
        {onCancel && <Button variant="secondary" onClick={onCancel}>Cancel</Button>}
      </div>
    </form>
  );
};

export default IncomeForm;
