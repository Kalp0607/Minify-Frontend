import { useState } from "react";
import api from "../services/api";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await api.post("/auth/signup", { name, email, password });
      navigate("/login");
    } catch (err) {
      if (err.response) {
        setError(err.response.data?.message || "Signup failed");
      } else {
        setError("Server not reachable");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4">
        <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-10 w-[380px] border">
          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Create account
            </h2>

            <p className="text-gray-500 mt-1">Get started in seconds</p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-xl mb-5 text-center">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              className="w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              disabled={loading}
              className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-60 disabled:hover:scale-100"
            >
              {loading ? "Creating..." : "Create account"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-sm text-gray-500 mt-6 text-center">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
