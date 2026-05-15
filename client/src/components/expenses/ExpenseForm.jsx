import { useState } from "react";
import { expenseCategories } from "../../utils/constants.js";
import { toInputDate } from "../../utils/formatters.js";
import Button from "../ui/Button.jsx";
import Input from "../ui/Input.jsx";
import Select from "../ui/Select.jsx";

const initialState = { title: "", amount: "", category: "Food", date: toInputDate(), notes: "" };

const ExpenseForm = ({ initialValue, onSubmit, onCancel, loading }) => {
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
    <form onSubmit={submit} className="grid gap-4 rounded-lg border border-stone-200 bg-white p-5 shadow-soft dark:border-gray-800 dark:bg-gray-900 md:grid-cols-2">
      <Input label="Title" name="title" value={form.title} onChange={handleChange} required />
      <Input label="Amount" name="amount" type="number" min="0" step="0.01" value={form.amount} onChange={handleChange} required />
      <Select label="Category" name="category" value={form.category} onChange={handleChange}>
        {expenseCategories.map((category) => (
          <option key={category} value={category}>{category}</option>
        ))}
      </Select>
      <Input label="Date" name="date" type="date" value={form.date} onChange={handleChange} required />
      <label className="block md:col-span-2">
        <span className="mb-1.5 block text-sm font-medium text-stone-700 dark:text-gray-200">Notes</span>
        <textarea
          name="notes"
          value={form.notes || ""}
          onChange={handleChange}
          rows="3"
          className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-sm outline-none focus:border-mint focus:ring-2 focus:ring-teal-100 dark:border-gray-800 dark:bg-gray-900"
        />
      </label>
      <div className="flex gap-3 md:col-span-2">
        <Button type="submit" disabled={loading}>{initialValue ? "Update expense" : "Add expense"}</Button>
        {onCancel && <Button variant="secondary" onClick={onCancel}>Cancel</Button>}
      </div>
    </form>
  );
};

export default ExpenseForm;
