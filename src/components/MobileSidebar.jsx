import NavLinks from "./NavLinks";

function MobileSidebar({ isOpen, logoutLoading, onClose, onLogout }) {
  return (
    <>
      {/* backdrop */}
      <div
        onClick={onClose}
        className={`fixed inset-0 z-20 bg-black/50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* sidebar */}
      <aside
        className={`
          fixed top-0 left-0 right-0 z-30 m-1 rounded 
          px-6 pt-20 pb-10
          bg-coffee-dark/90 text-coffee-light
          md:hidden

          transition-all duration-[600ms] ease-in-out

          ${
            isOpen
              ? "translate-y-0 opacity-100 "
              : "-translate-y-[80%] opacity-0 pointer-events-none"
          }
        `}
      >
        <NavLinks onClose={onClose} />
        <button
          type="button"
          onClick={onLogout}
          disabled={logoutLoading}
          className="w-full p-3 mt-6 text-right rounded disabled:cursor-not-allowed disabled:opacity-70 "
        >
          خارج شدن
        </button>
      </aside>
    </>
  );
}

export default MobileSidebar;
