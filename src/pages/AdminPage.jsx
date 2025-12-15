import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  logoutUser,
  getFeedbacks,
  updateFeedbackStatus,
  deleteFeedback,
  countFeedbacks,
  getAllFeedbacks,
} from "../db/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const AdminPage = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(1000);
  const [inputPage, setInputPage] = useState(1);
  const [loadingExport, setLoadingExport] = useState(false);
  const { data: total } = useQuery({
    queryKey: ["count"],
    queryFn: countFeedbacks,
  });
  const {
    data: feedbacks = [],
    isError: errorFeedbacks,
    isLoading: loading,
  } = useQuery({
    queryKey: ["feedbacks", page, limit],
    queryFn: () => getFeedbacks(page, limit),
  });

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

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, accepted }) => updateFeedbackStatus(id, accepted),
    onSuccess: () => {
      queryClient.invalidateQueries(["feedbacks"]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteFeedback,
    onSuccess: () => {
      queryClient.invalidateQueries(["feedbacks"]);
      queryClient.invalidateQueries(["count"]);
    },
  });

  const exportToJSON = async () => {
    setLoadingExport(true);
    let allFeedbacks = await getAllFeedbacks();
    const jsonData = JSON.stringify(allFeedbacks, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();
    setLoadingExport(false);
    URL.revokeObjectURL(url);
    allFeedbacks = [];
  };

  return (
    <main className="w-full overflow-y-scroll h-[calc(100vh-70px-88px)] lg:h-[calc(100vh-70px-52px)] no-scrollbar bg-background p-5 md:p-10">
      <header className="flex justify-between items-center mb-6 md:mb-10 border-b border-tertiary pb-5 gap-4 md:gap-0 relative">
        <div className="flex gap-3 items-center">
          <h1 className="poppins-bold text-white text-2xl md:text-3xl text-center md:text-left">
            Admin <span className="text-primary">Dashboard</span>
          </h1>
        </div>
        <ContextMenu onRemove={handleLogout} />
      </header>
      <div className="mx-auto w-fit my-5 flex gap-3">
        <button
          id="prev"
          onClick={prevPage}
          className="border w-20 text-white poppins-regular hover:text-black hover:bg-white hover:border-none hover:cursor-pointer py-1 px-2 text-xs rounded-lg"
        >
          PREVIEW
        </button>
        <h1 className="rounded-lg poppins-bold text-white size-10 flex items-center justify-center border">
          <form
            onSubmit={(e) => {
              const inputSelectPage = Number(inputPage);
              e.preventDefault();
              if (inputSelectPage < 1) {
                setPage(1);
              } else if (inputSelectPage > Math.ceil(total / limit)) {
                setPage(Math.ceil(total / limit));
                setInputPage(Math.ceil(total / limit));
              } else {
                setPage(inputSelectPage);
              }
            }}
          >
            <input
              className="size-10 text-center focus:outline-none"
              type="number"
              value={inputPage}
              onChange={(e) => setInputPage(e.target.value)}
            />
          </form>
        </h1>
        <button
          onClick={nextPage}
          className="border w-20 text-white poppins-regular hover:text-black hover:bg-white hover:border-none hover:cursor-pointer py-1 px-2 text-xs rounded-lg"
        >
          NEXT
        </button>
      </div>
      <p className="text-white poppins-bold text-lg">Total Feedback: {total}</p>
      <button
        onClick={exportToJSON}
        className="bg-red-600 text-white px-4 py-2 rounded-lg poppins-bold text-sm my-2 hover:cursor-pointer hover:bg-red-400"
      >
        {loadingExport ? "Please wait..." : "EXPORT TO JSON"}
      </button>
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
                      <div
                        className={`px-2 py-1 rounded text-xs w-20 text-center text-white 
                                            ${
                                              item.category === "Bug"
                                                ? "bg-red-500"
                                                : item.category === "Feature"
                                                ? "bg-blue-500"
                                                : "bg-gray-500"
                                            }`}
                      >
                        {item.category}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white">{item.message}</td>
                    <td className="px-6 py-4">
                      {new Date(item.created_at).toLocaleString()}
                    </td>
                    <td className="py-4 text-center">
                      <select
                        value={item.accepted ? "accepted" : "pending"}
                        onChange={(e) =>
                          updateStatusMutation.mutate({
                            id: item.id,
                            accepted: e.target.value === "accepted",
                          })
                        }
                        className="bg-tertiary text-white poppins-light px-4 py-2 rounded-lg"
                      >
                        <option value="pending">Pending</option>
                        <option value="accepted">Accepted</option>
                      </select>
                    </td>
                    <td className="px-2 py-4 text-center">
                      <button
                        onClick={() => {
                          if (
                            confirm("Apakah kamu yakin ingin menghapus data?")
                          ) {
                            deleteMutation.mutate(item.id);
                          }
                        }}
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

const ContextMenu = ({ onRemove }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        type="button"
        aria-label="context menu"
        className="inline-flex items-center bg-transparent transition hover:opacity-75 text-white hover:cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          aria-hidden="true"
          fill="currentColor"
          className="w-8 h-8"
        >
          <path
            fillRule="evenodd"
            d="M4.5 12a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zm6 0a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div
          className="absolute top-8 right-0 flex w-fit min-w-24 flex-col divide-y divide-outline overflow-hidden rounded-lg border-outline bg-red-600 hover:brightness-75 hover:cursor-pointer z-10"
          onClick={onRemove}
        >
          <ul className="flex flex-col py-1.5" role="none">
            <li
              className="flex poppins-regular items-center gap-2 bg-surface-alt px-2 text-sm text-white"
              role="menuitem"
              tabIndex="0"
            >
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="1em"
                height="1em"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7.99994 10 6 11.9999l1.99994 2M11 5v14m-7 0h16c.5523 0 1-.4477 1-1V6c0-.55228-.4477-1-1-1H4c-.55228 0-1 .44772-1 1v12c0 .5523.44772 1 1 1Z"
                />
              </svg>
              LOGOUT
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
