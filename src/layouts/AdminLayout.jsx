//layouts/AdminLayout

//eslint-disable-next-line
import React from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser, resetStatus } from "../redux/slice/authSlice";
import Swal from "sweetalert2"; // Import SweetAlert2

const AdminLayout = ({ children }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda akan keluar dari panel admin.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, logout",
      cancelButtonText: "Batal",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logoutUser()).then(() => {
          dispatch(resetStatus());
          navigate("/");
          Swal.fire("Berhasil!", "Anda telah logout.", "success"); // Success message
        });
      } else {
        Swal.fire("Dibatalkan", "Anda masih berada di panel admin.", "info"); // Cancelled message
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-indigo-200 p-4 border-b border-gray-300">
        <div className="flex justify-end items-center mx-8">
          <button
            className="bg-indigo-500 text-white px-4 py-2 rounded text-sm"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="w-64 bg-indigo-800 text-white">
          <h1 className="text-2xl font-bold text-center mt-10">Admin Panel</h1>
          <div className="p-4 ml-4">
            <nav className="mt-4">
              <ul>
                <li className="py-2 px-4 text-white hover:bg-indigo-700 text-lg">
                  <Link to="/admin">Dashboard</Link>
                </li>
                <li className="py-2 px-4 text-white hover:bg-indigo-700 text-lg">
                  <Link to="/admin/banjir">Banjir Data</Link>
                </li>
              </ul>
            </nav>
          </div>
        </aside>

        <div className="flex-1 flex flex-col p-10">{children}</div>
      </div>
      <footer className="bg-indigo-800 text-white p-4 text-center">
        &copy; 2025 Batang Digital Creative - All rights reserved
      </footer>
    </div>
  );
};

AdminLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminLayout;
