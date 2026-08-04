import NavLinks from "./NavLinks";
import { useState } from "react";
import MobileSidebar from "./MobileSidebar";
import { GiHamburgerMenu } from "react-icons/gi";
import { useMatches, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const matches = useMatches();
  const navigate = useNavigate();
  const { logout, logoutLoading } = useAuth();

  const lastMatch = matches[matches.length - 1];

  const title = lastMatch?.handle?.title || "مدیریت کافه";

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      <div>
        <div
          className={`absolute m-1 rounded top-0 left-0 right-0 z-50 flex justify-between p-4 ${!isOpen && "bg-coffee-dark"} text-end md:hidden `}
        >
          <h1
            className={`flex pt-1.5 text-2xl font-bold ${isOpen ? "text-coffee-light" : "text-coffee-light font-extrabold"}`}
          >
            {title}
          </h1>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative flex items-center justify-center w-10 h-10 justify-end-end"
          >
            {/* hamburger */}
            <GiHamburgerMenu
              className={`absolute text-coffee-light transition-all duration-300 w-8 h-8 
              ${isOpen ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"}
            `}
            />

            {/* close */}
            <span
              className={`absolute text-coffee-light transition-all duration-300 text-2xl mt-[5px]
            ${isOpen ? "opacity-100 rotate-0 scale-150" : "opacity-0 -rotate-90 scale-75"}
          `}
            >
              ✖
            </span>
          </button>
        </div>
      </div>

      <MobileSidebar
        isOpen={isOpen}
        logoutLoading={logoutLoading}
        onClose={() => setIsOpen(false)}
        onLogout={handleLogout}
      />

      <aside
        dir="rtl"
        className="hidden p-6 md:sticky md:h-screen md:w-48 md:flex-col md:flex text-coffee-light bg-coffee-dark "
      >
        <div>
          <h1 className="mb-8 text-2xl font-bold text-coffee-light">
            مدیریت کافه
          </h1>
          <nav className="flex flex-col space-y-4">
            <NavLinks />
          </nav>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          disabled={logoutLoading}
          className="w-full p-3 mt-auto text-right rounded hover:bg-coffee/80 disabled:cursor-not-allowed disabled:opacity-70"
        >
          🚪 خارج شدن
        </button>
      </aside>
    </>
  );
}

export default Sidebar;
