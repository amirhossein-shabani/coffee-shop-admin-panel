import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import PropTypes from "prop-types";

function Layout() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 min-h-screen p-6 pt-24 md:p-8 bg-coffee-light/50">
        <Outlet />
      </main>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
