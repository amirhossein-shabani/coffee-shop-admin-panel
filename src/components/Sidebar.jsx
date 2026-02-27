import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <aside
      dir="rtl"
      className="flex flex-col w-48 h-screen p-6  text-coffee-light bg-coffee-dark"
    >
      <div>
        <h1 className="mb-8 text-2xl font-bold text-coffee-light">
          مدیریت کافه
        </h1>
        <nav className="flex flex-col space-y-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              ` block p-3 rounded transition ${isActive ? "bg-coffee text-white font-bold" : "hover:bg-coffee/80"}`
            }
          >
            📊 داشبورد
          </NavLink>
          <NavLink
            to="/menu"
            className={({ isActive }) =>
              ` block p-3 rounded transition ${isActive ? "bg-coffee text-white font-bold" : "hover:bg-coffee/80"}`
            }
          >
            🍽️ منو
          </NavLink>
          {/* Orders route is not ready yet */}
          {/* <NavLink
              to="/orders"
              className={({ isActive }) =>
                ` block p-3 transition ${isActive ? "bg-blue-600 font-bold" : "hover:bg-gray-700"}`
              }
            >
              📦 Orders
            </NavLink> */}
          <NavLink
            to="/categories"
            className={({ isActive }) =>
              ` block p-3 rounded transition ${isActive ? "bg-coffee text-white font-bold" : "hover:bg-coffee/80"}`
            }
          >
            🗂️ کتگوری ها
          </NavLink>
          <NavLink
            to="/setting"
            className={({ isActive }) =>
              ` block p-3 rounded transition ${isActive ? "bg-coffee text-white font-bold" : "hover:bg-coffee/80"}`
            }
          >
            ⚙️ تنظیمات
          </NavLink>
          {/* <NavLink
            to="/users"
            className={({ isActive }) =>
              ` block p-3 rounded transition ${isActive ? "bg-coffee text-white font-bold" : "hover:bg-coffee/80"}`
            }
          >
            👥 کاربر ها
          </NavLink> */}
        </nav>
      </div>
      <button className="w-full p-3 mt-auto text-right rounded hover:bg-coffee/80">
        🚪 خارج شدن
      </button>
    </aside>
  );
}

export default Sidebar;
