import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Wallet } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import Button from "../components/ui/Button.jsx";
import Input from "../components/ui/Input.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      await login(form);
      showToast("Welcome back");
      navigate("/");
    } catch (error) {
      showToast(error.message || "Login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-50 p-4 dark:bg-gray-950">
      <form onSubmit={submit} className="w-full max-w-md rounded-lg border border-stone-200 bg-white p-8 shadow-soft dark:border-gray-800 dark:bg-gray-900">
        <div className="mb-6 flex items-center gap-3">
          <span className="rounded-lg bg-teal-50 p-3 text-mint dark:bg-teal-950"><Wallet /></span>
          <div>
            <h1 className="text-2xl font-bold text-ink dark:text-white">Sign in</h1>
            <p className="text-sm text-stone-500 dark:text-gray-400">Use demo@example.com / password123 after seeding.</p>
          </div>
        </div>
        <div className="space-y-4">
          <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          <Input label="Password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          <Button type="submit" className="w-full" disabled={loading}>{loading ? "Signing in..." : "Login"}</Button>
        </div>
        <p className="mt-5 text-center text-sm text-stone-500 dark:text-gray-400">
          New here? <Link className="font-semibold text-mint" to="/register">Create an account</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
