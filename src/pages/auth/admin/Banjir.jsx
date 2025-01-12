import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../../../components/admin/Modal";
import Button from "../../../components/admin/Button";
import Table from "../../../components/admin/Table";
import {
  fetchBanjir,
  addBanjir,
  updateBanjir,
  deleteBanjir,
} from "../../../redux/slice/banjirSlice";

const Banjir = () => {
  const dispatch = useDispatch();
  const { data: banjirData, status, error } = useSelector((state) => state.banjir);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [banjirFormData, setBanjirFormData] = useState({
    bencana: "",
    waktu: "",
    lokasi: "",
    penyebab: "",
    kronologi: "",
    pengungsi: "",
  });
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    dispatch(fetchBanjir());
  }, [dispatch]);

  const saveBanjir = async () => {
    try {
      const formattedData = {
        ...banjirFormData,
        waktu: new Date(banjirFormData.waktu).toISOString(),
        pengungsi: Number(banjirFormData.pengungsi || 0),
      };

      if (isEdit) {
        await dispatch(updateBanjir({ id: banjirFormData._id, changes: formattedData })).unwrap();
        Swal.fire("Berhasil!", "Data berhasil diperbarui.", "success");
      } else {
        await dispatch(addBanjir(formattedData)).unwrap();
        Swal.fire("Berhasil!", "Data berhasil ditambahkan.", "success");
      }

      setIsModalOpen(false);
      setBanjirFormData({
        bencana: "",
        waktu: "",
        lokasi: "",
        penyebab: "",
        kronologi: "",
        pengungsi: "",
      });
    } catch (err) {
      Swal.fire("Error", error || "Terjadi kesalahan.", "error");
    }
  };

  const handleEditClick = (data) => {
    setBanjirFormData(data);
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const handleAddClick = () => {
    setIsEdit(false);
    setBanjirFormData({
      bencana: "",
      waktu: "",
      lokasi: "",
      penyebab: "",
      kronologi: "",
      pengungsi: "",
    });
    setIsModalOpen(true);
  };

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">Data Bencana Banjir</h1>
        <Button
          style="bg-green-500 text-white px-4 py-2 rounded"
          text="Tambah Data"
          onClick={handleAddClick}
        />
      </div>
      <Table
        banjir={banjirData}
        onEditClick={handleEditClick}
        onDeleteClick={(id) => dispatch(deleteBanjir(id))} // ID langsung diteruskan
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={saveBanjir}
        banjirData={banjirFormData}
        setBanjirData={setBanjirFormData}
      />
    </div>
  );
};

export default Banjir;
