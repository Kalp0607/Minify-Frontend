import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [url, setUrl] = useState("");
  const [urls, setUrls] = useState([]);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showCopied, setShowCopied] = useState(false);

  const navigate = useNavigate();

  const fetchUrls = async () => {
    try {
      const res = await api.get("/url/user");
      setUrls(res.data);
    } catch {
      setUrls([]);
    }
  };
  useEffect(() => {
    const onLogout = () => {
      setUrls([]);
      setUrl("");
    };

    window.addEventListener("logout", onLogout);

    return () => window.removeEventListener("logout", onLogout);
  }, []);

  useEffect(() => {
    if (localStorage.getItem("name")) {
      fetchUrls();
    } else {
      setUrls([]);
    }
  }, []);

  const handleCreate = async () => {
    if (!url) return;

    try {
      await api.post("/url", { redirectURL: url });
      setUrl("");
      fetchUrls();
    } catch {
      setShowLoginPrompt(true);
    }
  };

  const copyLink = (shortId) => {
    navigator.clipboard.writeText(
      `https://minify-backend-hlll.onrender.com/${shortId}`,
    );
    setShowCopied(true);

    setTimeout(() => {
      setShowCopied(false);
    }, 2000);
  };

  return (
    <>
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Short links. Share faster.
          </h1>

          <p className="text-gray-500 text-lg">
            Generate beautiful, lightning-fast links in seconds.
          </p>
        </div>

        {/* Generator */}
        <div className="bg-white/70 backdrop-blur-xl shadow-xl rounded-2xl p-6 flex gap-4 mb-16 border">
          <input
            className="flex-1 bg-transparent border rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Paste your long URL here..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <button
            onClick={handleCreate}
            className="px-10 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all"
          >
            Generate
          </button>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {["Paste URL", "Generate", "Share"].map((s, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-8 text-center shadow hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <h3 className="font-semibold text-lg mb-2">{s}</h3>
              <p className="text-sm text-gray-500">Simple. Instant. Secure.</p>
            </div>
          ))}
        </div>

        {/* Links */}
        <div className="grid md:grid-cols-2 gap-8">
          {urls.map((u) => (
            <div
              key={u._id}
              className="bg-white rounded-2xl p-6 shadow hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <p className="text-xs text-gray-400 truncate mb-2">
                {u.redirectURL}
              </p>

              <a
                href={`https://minify-backend-hlll.onrender.com/${u.shortId}`}
                target="_blank"
                rel="noreferrer"
                className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
              >
                https://minify-backend-hlll.onrender.com/{u.shortId}
              </a>

              <div className="flex justify-between items-center mt-4">
                <span className="text-xs text-gray-500">
                  {u.visitHistory?.length || 0} clicks
                </span>

                <button
                  onClick={() => copyLink(u.shortId)}
                  className="text-sm px-4 py-1.5 rounded-lg border hover:bg-gray-50 transition"
                >
                  Copy
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Login Modal */}
        {showLoginPrompt && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur flex items-center justify-center">
            <div className="bg-white rounded-2xl p-8 w-[340px] text-center shadow-xl">
              <h3 className="text-xl font-semibold mb-2">Login required</h3>

              <p className="text-gray-500 mb-6">
                Please login to generate links.
              </p>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setShowLoginPrompt(false)}
                  className="px-4 py-2 rounded-lg border hover:bg-gray-50 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={() => navigate("/login")}
                  className="px-5 py-2 rounded-lg text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow hover:shadow-lg transition"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Copy Toast */}
        {showCopied && (
          <div className="fixed top-8 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-2 rounded-xl shadow-xl animate-bounce">
            Link copied to clipboard ✅
          </div>
        )}
      </main>
    </>
  );
}

export default Dashboard;
