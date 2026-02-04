import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

function Navbar() {
  const navigate = useNavigate();
  const [name, setName] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    setName(localStorage.getItem("name"));
    setRole(localStorage.getItem("role"));
  }, []);

  const logout = async () => {
    await api.post("/auth/logout");

    localStorage.clear();

    setName(null);
    setRole(null);

    window.dispatchEvent(new Event("logout"));

    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-white/70 backdrop-blur-xl border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          {/* Brand */}
          <div className="flex items-center gap-3 group">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-9 transition-transform group-hover:scale-105"
            />

            <Link
              to="/"
              className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
            >
              Minify
            </Link>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-6">
            <Link
              to="/"
              className="relative text-sm font-medium text-gray-700 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-blue-500 after:to-purple-500 hover:after:w-full after:transition-all"
            >
              Home
            </Link>
            {role?.toUpperCase() === "ADMIN" && (
              <Link
                to="/admin"
                className="text-sm font-medium text-purple-600 hover:text-purple-800 transition"
              >
                Admin Dashboard
              </Link>
            )}

            {name ? (
              <>
                {/* User Pill */}
                <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border shadow-inner">
                  <span className="text-sm font-semibold">{name}</span>

                  <span className="text-[10px] uppercase tracking-wider text-gray-500">
                    {role}
                  </span>
                </div>

                <button
                  onClick={logout}
                  className="text-sm px-4 py-2 rounded-xl border hover:border-red-400 hover:text-red-600 hover:bg-red-50 transition-all"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-sm px-4 py-2 rounded-xl border hover:bg-gray-50 transition"
                >
                  Login
                </Link>

                {/* Glow CTA */}
                <Link
                  to="/signup"
                  className="relative text-sm font-semibold text-white px-6 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg hover:shadow-xl transition-all hover:scale-[1.03]"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
