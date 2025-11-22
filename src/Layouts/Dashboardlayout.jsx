import { NavLink, Outlet } from "react-router-dom";
import {
  FaHome,
  FaBoxOpen,
  FaCreditCard,
  FaMapMarkerAlt,
  FaClock,
  FaUserCheck,
  FaUserShield,
  FaMotorcycle,
} from "react-icons/fa";
import useUserRole from "../hooks/useUserRole";

const DashboardLayout = () => {
  const { role, roleLoading } = useUserRole();
  console.log(role)

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-2 px-3 py-2 rounded-md text-sm font-semibold transition ${isActive ? "bg-[#CAEB66] text-black" : "text-black hover:bg-[#CAEB66]/80"
    }`;

  if (roleLoading) {
    return <p className="text-center mt-10">Loading role...</p>; // show while fetching role
  }

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-100">
      {/* Sidebar / Topbar */}
      <aside className="bg-white shadow-md p-4 lg:w-64 w-full flex lg:flex-col flex-row justify-around lg:justify-start">
        <nav className="space-y-3 flex lg:flex-col flex-row gap-3 lg:gap-4">
          <NavLink to="/" className={linkClasses}>
            <FaHome size={16} />
            Home
          </NavLink>

          <NavLink to="/dashboard/myparcel" className={linkClasses}>
            <FaBoxOpen size={16} />
            My Parcel
          </NavLink>

          <NavLink to="/dashboard/paymentHistory" className={linkClasses}>
            <FaCreditCard size={16} />
            Payment History
          </NavLink>

          <NavLink to="/dashboard/tracking" className={linkClasses}>
            <FaMapMarkerAlt size={16} />
            Tracking
          </NavLink>

          {/* Admin-only links */}
          {role === "admin" && (
            <>
              <NavLink to="/dashboard/pendingRiders" className={linkClasses}>
                <FaClock size={16} />
                Pending Riders
              </NavLink>

              <NavLink to="/dashboard/activeRiders" className={linkClasses}>
                <FaUserCheck size={16} />
                Active Riders
              </NavLink>

              <NavLink to="/dashboard/assignRider" className={linkClasses}>
                <FaMotorcycle size={16} />
                Assign Rider
              </NavLink>


              <NavLink to="/dashboard/makeAdmin" className={linkClasses}>
                <FaUserShield size={16} />
                Make Admin
              </NavLink>
            </>
          )}
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
