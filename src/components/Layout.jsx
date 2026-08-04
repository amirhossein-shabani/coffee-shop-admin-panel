import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

function Layout() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6 pt-24 md:p-8 bg-coffee-light/50">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
