import { NavLink } from "react-router-dom";

function NavLinks() {
  return (
    <>
      <NavLink
        to="/"
        className={({ isActive }) =>
          ` block p-3 rounded transition-transform duration-200 ${isActive ? "bg-coffee text-white font-bold scale-[1.02]" : "hover:bg-coffee/70"}`
        }
      >
        📊 داشبورد
      </NavLink>
      <NavLink
        to="/menu"
        className={({ isActive }) =>
          ` block p-3 rounded transition-transform duration-200 ${isActive ? "bg-coffee text-white font-bold scale-[1.02]" : "hover:bg-coffee/70"}`
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
          ` block p-3 rounded transition-transform duration-200 ${isActive ? "bg-coffee text-white font-bold scale-[1.02]" : "hover:bg-coffee/70"}`
        }
      >
        🗂️ کتگوری ها
      </NavLink>
      <NavLink
        to="/setting"
        className={({ isActive }) =>
          ` block p-3 rounded transition-transform duration-200  ${isActive ? "bg-coffee text-white font-bold scale-[1.02]" : "hover:bg-coffee/70"}`
        }
      >
        ⚙️ تنظیمات
      </NavLink>
      {/* <NavLink
            to="/users"
            className={({ isActive }) =>
              ` block p-3 rounded transition ${isActive ? "bg-coffee text-white font-bold scale-[1.02]" : "hover:bg-coffee/80"}`
            }
          >
            👥 کاربر ها
          </NavLink> */}
    </>
  );
}

export default NavLinks;
