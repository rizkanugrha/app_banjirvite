import React from "react";
import PropTypes from "prop-types";

const Modal = ({ isOpen, onClose, onSave, banjirData, setBanjirData }) => {
  if (!isOpen) return null;

  const handleInputChange = (e) => {
    setBanjirData({
      ...banjirData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!banjirData.bencana || !banjirData.lokasi) {
      alert("Nama bencana dan lokasi wajib diisi.");
      return;
    }

    // Konversi waktu ke format ISO sebelum dikirim ke backend
    const formattedBanjirData = {
      ...banjirData,
      waktu: new Date(banjirData.waktu).toISOString(),
    };

    onSave(formattedBanjirData);
  };


  const formatDateForInput = (isoDate) => {
    if (!isoDate) return ""; // Jika waktu kosong
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 max-w-md">
        <h2 className="text-xl mb-4">
          {banjirData._id ? "Edit Data" : "Tambah Data"} Bencana Banjir
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1">Bencana</label>
            <input
              type="text"
              name="bencana"
              value={banjirData.bencana || ""}
              onChange={handleInputChange}
              className="w-full border px-2 py-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Waktu</label>
            <input
              type="datetime-local"
              name="waktu"
              value={formatDateForInput(banjirData.waktu) || ""}
              onChange={handleInputChange}
              className="w-full border px-2 py-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Lokasi</label>
            <input
              type="text"
              name="lokasi"
              value={banjirData.lokasi || ""}
              onChange={handleInputChange}
              className="w-full border px-2 py-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Penyebab</label>
            <textarea
              name="penyebab"
              value={banjirData.penyebab || ""}
              onChange={handleInputChange}
              className="w-full border px-2 py-1"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Kronologi</label>
            <textarea
              name="kronologi"
              value={banjirData.kronologi || ""}
              onChange={handleInputChange}
              className="w-full border px-2 py-1"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Jumlah Pengungsi</label>
            <input
              type="number"
              name="pengungsi"
              value={banjirData.pengungsi || ""}
              onChange={handleInputChange}
              className="w-full border px-2 py-1"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            >
              Save
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  banjirData: PropTypes.shape({
    bencana: PropTypes.string,
    waktu: PropTypes.string,
    lokasi: PropTypes.string,
    penyebab: PropTypes.string,
    kronologi: PropTypes.string,
    pengungsi: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }).isRequired,
  setBanjirData: PropTypes.func.isRequired,
};

export default Modal;
