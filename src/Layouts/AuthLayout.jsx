import { NavLink, Outlet } from "react-router";
import authimg from "../assets/authImage.png";
import logo from "../assets/logo.png";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      {/* ---------- Logo ---------- */}
      <header className="flex items-center gap-2 px-10 py-6">
        <NavLink
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition"
        >
          <img src={logo} alt="Logo" className="h-10" />
          <h1 className="text-3xl font-bold text-primary">Goflow</h1>
        </NavLink>
      </header>

      {/* ---------- Main Content ---------- */}
      <main className="flex-grow flex flex-col lg:flex-row-reverse items-center justify-center px-6 lg:px-20 gap-10">
        {/* Image Section */}
        <div className="text-center lg:text-left max-w-sm">
          <img
            src={authimg}
            alt="Authentication Illustration"
            className="rounded-2xl shadow-2xl w-full"
          />
        </div>

        {/* Form / Outlet Section */}
        <div className="card bg-base-100 w-full max-w-sm shadow-xl border border-base-300">
          <div className="card-body">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthLayout;
