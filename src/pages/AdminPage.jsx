import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  logoutUser,
  getAllFeedbacks,
  updateFeedbackStatus,
  deleteFeedback,
} from "../db/api";
const AdminPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [feedbacks, setFeedbacks] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(1000);

  const loadData = async () => {
    try {
      setLoading(true);
      const { error, data } = await getAllFeedbacks(page, limit);
      if (error) throw error;
      setFeedbacks(data || []);
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
    } finally {
      setLoading(false);
    }
  };

  const nextPage = () => {
    if (feedbacks.length > limit) {
      setPage((prev) => prev + 1);
    }
  };
  const prevPage = () => {
    if (page != 1) {
      setPage((prev) => prev - 1);
    }
  };
  const handleLogout = () => {
    logoutUser();
  };

  const handleAcceptanceChange = async (id, value) => {
    const accepted = value === "accepted";
    try {
      const { error } = await updateFeedbackStatus(id, accepted);
      if (error) throw error;
      setFeedbacks((prev) =>
        prev.map((item) => (item.id === id ? { ...item, accepted } : item))
      );
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Gagal mengupdate status");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus data ini?")) return;
    try {
      const { error } = await deleteFeedback(id);
      if (error) throw error;
      setFeedbacks((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error deleting feedback:", err);
      alert("Gagal menghapus data");
    }
  };

  useEffect(() => {
    loadData();
  }, [page]);

  return (
    <main className="w-full overflow-y-scroll h-[calc(100vh-70px-88px)] lg:h-[calc(100vh-70px-52px)] no-scrollbar bg-background p-5 md:p-10">
      <header className="flex flex-col md:flex-row justify-between items-center mb-6 md:mb-10 border-b border-tertiary pb-5 gap-4 md:gap-0">
        <div className="flex gap-3 items-center">
          <img src="/img/icon.svg" className="w-[30px] md:w-10" alt="icon" />
          <h1 className="poppins-bold text-white text-2xl md:text-3xl text-center md:text-left">
            Admin <span className="text-primary">Dashboard</span>
          </h1>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 hover:cursor-pointer text-white poppins-medium px-6 py-2 rounded-lg hover:bg-red-700 transition-all w-full md:w-auto"
        >
          Logout
        </button>
      </header>
      <div className="mx-auto w-fit my-5 flex gap-3">
        <button
          onClick={prevPage}
          className="border w-20 text-white poppins-regular hover:text-black hover:bg-white hover:border-none hover:cursor-pointer py-1 px-2 text-xs rounded-lg"
        >
          PREVIEW
        </button>
        <h1 className="rounded-lg poppins-bold text-white size-10 flex items-center justify-center border">
          {page}
        </h1>
        <button
          onClick={nextPage}
          className="border w-20 text-white poppins-regular hover:text-black hover:bg-white hover:border-none hover:cursor-pointer py-1 px-2 text-xs rounded-lg"
        >
          NEXT
        </button>
      </div>
      {loading ? (
        <div className="flex flex-col justify-center items-center gap-4 mx-auto h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="text-white poppins-light animate-pulse">
            Memuat Data...
          </p>
        </div>
      ) : (
        <section className="bg-secondary rounded-xl shadow-lg border border-tertiary overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-light-secondary poppins-light min-w-[800px] md:min-w-full">
              <thead className="text-xs text-white uppercase bg-tertiary poppins-semibold">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 w-1/3">
                    Message
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Created At
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Accepted
                  </th>
                  <th scope="col" className="px-6 py-3 text-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {feedbacks.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-tertiary hover:bg-tertiary/20 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-white">
                      {item.id}
                    </td>
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.email || "-"}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 rounded text-xs text-white 
                                            ${
                                              item.category === "Bug"
                                                ? "bg-red-500"
                                                : item.category === "Feature"
                                                ? "bg-blue-500"
                                                : "bg-gray-500"
                                            }`}
                      >
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white">{item.message}</td>
                    <td className="px-6 py-4">
                      {new Date(item.created_at).toLocaleString()}
                    </td>
                    <td className="py-4 text-center">
                      <select
                        value={item.accepted ? "accepted" : "pending"}
                        onChange={(e) =>
                          handleAcceptanceChange(item.id, e.target.value)
                        }
                        className="bg-tertiary text-white poppins-light px-4 py-2 rounded-lg"
                      >
                        <option value="pending">Pending</option>
                        <option value="accepted">Accepted</option>
                      </select>
                    </td>
                    <td className="px-2 py-4 text-center">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="bg-red-600 text-white poppins-medium px-4 py-2 rounded-lg hover:bg-red-700 transition-all"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </main>
  );
};

export default AdminPage;
