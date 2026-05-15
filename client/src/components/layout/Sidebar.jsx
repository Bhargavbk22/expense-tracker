import { BarChart3, Home, LogOut, Menu, Moon, ReceiptText, Settings, Sun, WalletCards, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";
import Button from "../ui/Button.jsx";

const links = [
  { to: "/", label: "Dashboard", icon: Home },
  { to: "/expenses", label: "Expenses", icon: ReceiptText },
  { to: "/income", label: "Income", icon: WalletCards },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings }
];

const Sidebar = ({ open, onToggle }) => {
  const { logout, user } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <button
        className="fixed left-4 top-4 z-40 rounded-lg bg-white p-2 shadow-soft lg:hidden dark:bg-gray-900"
        onClick={onToggle}
        aria-label="Toggle navigation"
      >
        {open ? <X /> : <Menu />}
      </button>
      <aside
        className={`fixed inset-y-0 left-0 z-30 flex w-72 transform flex-col border-r border-stone-200 bg-white p-5 transition lg:translate-x-0 dark:border-gray-800 dark:bg-gray-950 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="mb-8">
          <div className="text-xl font-bold text-ink dark:text-white">Smart Expense</div>
          <p className="text-sm text-stone-500 dark:text-gray-400">{user?.email}</p>
        </div>

        <nav className="space-y-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={onToggle}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                  isActive
                    ? "bg-teal-50 text-mint dark:bg-teal-950 dark:text-teal-200"
                    : "text-stone-600 hover:bg-stone-100 dark:text-gray-300 dark:hover:bg-gray-900"
                }`
              }
            >
              <Icon className="h-5 w-5" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto space-y-3">
          <Button variant="secondary" className="w-full" onClick={toggleTheme}>
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </Button>
          <Button variant="ghost" className="w-full justify-start" onClick={logout}>
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
