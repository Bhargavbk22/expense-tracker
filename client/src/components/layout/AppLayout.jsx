import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";

const AppLayout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-stone-50 text-ink dark:bg-gray-950 dark:text-white">
      <Sidebar open={open} onToggle={() => setOpen((value) => !value)} />
      <main className="min-h-screen px-4 pb-10 pt-20 lg:ml-72 lg:px-8 lg:pt-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
