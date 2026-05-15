import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input.jsx";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    if (form.password.length < 6) {
      showToast("Password must be at least 6 characters", "error");
      return;
    }
    setLoading(true);
    try {
      await register(form);
      showToast("Account created");
      navigate("/");
    } catch (error) {
      showToast(error.message || "Registration failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-50 p-4 dark:bg-gray-950">
      <form onSubmit={submit} className="w-full max-w-md rounded-lg border border-stone-200 bg-white p-8 shadow-soft dark:border-gray-800 dark:bg-gray-900">
        <h1 className="text-2xl font-bold text-ink dark:text-white">Create account</h1>
        <p className="mt-1 text-sm text-stone-500 dark:text-gray-400">Start tracking income, spending, and budgets.</p>
        <div className="mt-6 space-y-4">
          <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <Input label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <Button type="submit" className="w-full" disabled={loading}>{loading ? "Creating..." : "Register"}</Button>
        </div>
        <p className="mt-5 text-center text-sm text-stone-500 dark:text-gray-400">
          Already registered? <Link className="font-semibold text-mint" to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
