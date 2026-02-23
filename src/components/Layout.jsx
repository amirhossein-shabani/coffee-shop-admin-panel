import Sidebar from "./Sidebar";
import PropTypes from "prop-types";

function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 min-h-screen p-8 bg-coffee-light/50">
        {children}
      </main>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
