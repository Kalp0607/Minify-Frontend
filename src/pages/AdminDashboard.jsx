import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [urls, setUrls] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const usersRes = await api.get("/admin/users");
      const urlsRes = await api.get("/admin/urls");

      setUsers(usersRes.data);
      setUrls(urlsRes.data);
    } catch {
      // Not admin → kick out
      navigate("/");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteUser = async (id) => {
    if (!confirm("Delete user and all URLs?")) return;
    await api.delete(`/admin/users/${id}`);
    fetchData();
  };

  const deleteURL = async (id) => {
    if (!confirm("Delete this URL?")) return;
    await api.delete(`/admin/urls/${id}`);
    fetchData();
  };

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-10">
        <h2 className="text-3xl font-bold mb-8">Admin Dashboard</h2>

        {/* USERS */}
        <div className="mb-12">
          <h3 className="text-xl font-semibold mb-4">Users</h3>

          <div className="space-y-3">
            {users.map((u) => (
              <div
                key={u._id}
                className="bg-white shadow rounded p-4 flex justify-between items-center"
              >
                <span>{u.email}</span>

                <button
                  onClick={() => deleteUser(u._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* URLS */}
        <div>
          <h3 className="text-xl font-semibold mb-4">All URLs</h3>

          <div className="space-y-3">
            {urls.map((u) => (
              <div
                key={u._id}
                className="bg-white shadow rounded p-4 flex justify-between items-center"
              >
                <span className="truncate max-w-md">{u.redirectURL}</span>

                <button
                  onClick={() => deleteURL(u._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded text-sm"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
