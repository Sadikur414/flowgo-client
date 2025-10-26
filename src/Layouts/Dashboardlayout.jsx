import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
      {/* Sidebar / Topbar */}
      <aside className="bg-white shadow-md p-4 lg:w-64 w-full flex lg:flex-col flex-row justify-around lg:justify-start">
        <nav className="space-y-3 flex lg:flex-col flex-row gap-3 lg:gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm font-semibold transition ${
                isActive
                  ? "bg-[#CAEB66] text-black"
                  : "text-black hover:bg-[#CAEB66]/80"
              }`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/dashboard/myparcel"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm font-semibold transition ${
                isActive
                  ? "bg-[#CAEB66] text-black"
                  : "text-black hover:bg-[#CAEB66]/80"
              }`
            }
          >
            My Parcel
          </NavLink>

          <NavLink
            to="/dashboard/orders"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm font-semibold transition ${
                isActive
                  ? "bg-[#CAEB66] text-black"
                  : "text-black hover:bg-[#CAEB66]/80"
              }`
            }
          >
            Orders
          </NavLink>

          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-sm font-semibold transition ${
                isActive
                  ? "bg-[#CAEB66] text-black"
                  : "text-black hover:bg-[#CAEB66]/80"
              }`
            }
          >
            Profile
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
