import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";

import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();
  console.log(user)

  const handleLogout = () => {
    logOut()
      .then(result => {
        Swal.fire({
          title: "Logged Out!",
          text: "You have successfully logged out.",
          icon: "success",
          confirmButtonText: "OK",
          timer: 2000,
          timerProgressBar: true,
        });
        console.log(result)
      })
      .catch(err => {
        console.error(err)
      })
  }

  const entryOutButton = user ? (
    <>
      <button
        onClick={handleLogout}
        className="btn bg-[#CAEB66] text-black hover:bg-[#B4D54E]"
      >
        Logout
      </button>
    </>
  ) : (
    <>
      <NavLink to="/login" className="btn btn-ghost mr-2">
        Login
      </NavLink>
      <NavLink
        to="/register"
        className="btn bg-[#CAEB66] text-black hover:bg-[#B4D54E]"
      >
        Register
      </NavLink>
    </>
  );

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-[#CAEB66] text-black font-semibold rounded-md px-3 py-2 transition-all duration-200"
              : "px-3 py-2 rounded-md hover:bg-[#f3f3f3] transition-all duration-200"
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/addparcel"
          className={({ isActive }) =>
            isActive
              ? "bg-[#CAEB66] text-black font-semibold rounded-md px-3 py-2 transition-all duration-200"
              : "px-3 py-2 rounded-md hover:bg-[#f3f3f3] transition-all duration-200"
          }
        >
          Add Parcel
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/coverage"
          className={({ isActive }) =>
            isActive
              ? "bg-[#CAEB66] text-black font-semibold rounded-md px-3 py-2 transition-all duration-200"
              : "px-3 py-2 rounded-md hover:bg-[#f3f3f3] transition-all duration-200"
          }
        >
          Coverage
        </NavLink>
      </li>

      {user?.email && (
        <li>
          <NavLink
            to="/dashboard/myparcel"
            className={({ isActive }) =>
              isActive
                ? "bg-[#CAEB66] text-black font-semibold rounded-md px-3 py-2 transition-all duration-200"
                : "px-3 py-2 rounded-md hover:bg-[#f3f3f3] transition-all duration-200"
            }
          >
            Dashboard
          </NavLink>
        </li>
      )}

      <li>
        <NavLink
          to="/beARider"
          className={({ isActive }) =>
            isActive
              ? "bg-[#CAEB66] text-black font-semibold rounded-md px-3 py-2 transition-all duration-200"
              : "px-3 py-2 rounded-md hover:bg-[#f3f3f3] transition-all duration-200"
          }
        >
          Be a Rider
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/services"
          className={({ isActive }) =>
            isActive
              ? "bg-[#CAEB66] text-black font-semibold rounded-md px-3 py-2 transition-all duration-200"
              : "px-3 py-2 rounded-md hover:bg-[#f3f3f3] transition-all duration-200"
          }
        >
          Services
        </NavLink>
      </li>



      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive
              ? "bg-[#CAEB66] text-black font-semibold rounded-md px-3 py-2 transition-all duration-200"
              : "px-3 py-2 rounded-md hover:bg-[#f3f3f3] transition-all duration-200"
          }
        >
          About Us
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      {/* Left: Logo */}
      <div className="navbar-start">
        <NavLink to="/" className="flex items-end gap-2">
          <img src={logo} alt="Logo" className="h-10" />
          <p className="text-3xl font-bold">Goflow</p>
        </NavLink>
      </div>

      {/* Middle: Nav Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>

      {/* Right: Buttons */}
      <div className="navbar-end">{entryOutButton}</div>

      {/* Mobile Menu */}
      <div className="dropdown dropdown-end lg:hidden">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
          {navLinks}
          <div className="mt-2 flex flex-col gap-2">{entryOutButton}</div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
