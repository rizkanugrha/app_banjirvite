import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBanjir } from "../../redux/slice/banjirSlice";
import DashboardLayout from "../../layouts/homepageLayout";

const Homepage = () => {
  const dispatch = useDispatch();
  const { data: banjirData, status, error } = useSelector((state) => state.banjir);

  useEffect(() => {
    dispatch(fetchBanjir());
  }, [dispatch]);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold">Dashboard Utama</h1>
      <p className="mt-4">Selamat datang di Sistem Informasi Pantauan Bencana By Rizka Nugraha.</p>

      {/* Contoh Tabel */}
      <div className="mt-6">
        <h2 className="text-lg font-semibold mb-4">Data Bencana Terkini</h2>
        <div className="overflow-x-auto">
          {status === "loading" && <p>Loading data...</p>}
          {status === "failed" && <p>Error: {error}</p>}
          {status === "succeeded" && (
            <table className="table-auto w-full bg-white shadow-lg rounded-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2">No</th>
                  <th className="px-4 py-2">Bencana</th>
                  <th className="px-4 py-2">Waktu</th>
                  <th className="px-4 py-2">Lokasi</th>
                  <th className="px-4 py-2">Penyebab</th>
                  <th className="px-4 py-2">Kronologi</th>
                  <th className="px-4 py-2">Pengungsi</th>
                </tr>
              </thead>
              <tbody>
                {banjirData.map((item, index) => (
                  <tr key={item._id} className="text-center">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{item.bencana}</td>
                    <td className="border px-4 py-2">
                      {new Date(item.waktu).toLocaleString()}
                    </td>
                    <td className="border px-4 py-2">{item.lokasi}</td>
                    <td className="border px-4 py-2">{item.penyebab}</td>
                    <td className="border px-4 py-2">{item.kronologi}</td>
                    <td className="border px-4 py-2">{item.pengungsi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Homepage;
