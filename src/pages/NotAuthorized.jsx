import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function NotAuthorized() {
  const navigate = useNavigate();
  const { logout, logoutLoading } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  return (
    <main className="flex items-center justify-center min-h-screen p-6 bg-coffee-light/50">
      <section className="w-full max-w-md p-8 text-center bg-white rounded shadow">
        <h1 className="mb-4 text-2xl font-bold text-coffee-dark">
          Access denied
        </h1>
        <p className="mb-6 text-coffee-dark/80">
          اکانت شما اجازه دسترسی به این پنل مدیریت را ندارد.
        </p>
        <button
          type="button"
          onClick={handleLogout}
          disabled={logoutLoading}
          className="px-5 py-3 font-semibold transition rounded bg-coffee-dark text-coffee-light hover:bg-coffee disabled:cursor-not-allowed disabled:opacity-70"
        >
          {logoutLoading ? "درحال خروج..." : "خروج از حساب کاربری"}
        </button>
      </section>
    </main>
  );
}

export default NotAuthorized;
