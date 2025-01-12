import PropTypes from "prop-types";
import Button from "../admin/Button";

const Table = ({ banjir, onEditClick, onDeleteClick }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="px-4 py-2">No</th>
            <th className="px-4 py-2">Bencana</th>
            <th className="px-4 py-2">Waktu</th>
            <th className="px-4 py-2">Lokasi</th>
            <th className="px-4 py-2">Penyebab</th>
            <th className="px-4 py-2">Kronologi</th>
            <th className="px-4 py-2">Pengungsi</th>
            <th className="px-4 py-2">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {banjir.length > 0 ? (
            banjir.map((data, index) => (
              <tr key={data._id} className={index % 2 === 0 ? "bg-gray-100" : ""}>
                <td className="border px-4 py-2 text-center">{index + 1}</td>
                <td className="border px-4 py-2 text-center">{data.bencana || "-"}</td>
                <td className="border px-4 py-2 text-center">
                  {new Date(data.waktu).toLocaleString() || "-"}
                </td>

                <td className="border px-4 py-2 text-center">{data.lokasi || "-"}</td>
                <td className="border px-4 py-2 text-center">{data.penyebab || "-"}</td>
                <td className="border px-4 py-2 text-center">{data.kronologi || "-"}</td>
                <td className="border px-4 py-2 text-center">{data.pengungsi || "-"}</td>
                <td className="border px-4 py-2 text-center flex justify-center gap-2">
                  <Button
                    style="text-white bg-yellow-500"
                    text="Edit"
                    onClick={() => onEditClick(data)}
                  />
                  <Button
                    style="text-white bg-red-500"
                    text="Delete"
                    onClick={() => onDeleteClick(data._id)} // Ubah ke _id
                  />

                </td>

              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={8}
                className="text-center py-4 text-gray-500 font-semibold"
              >
                Tidak ada data bencana banjir.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  banjir: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Ganti id dengan _id
      bencana: PropTypes.string.isRequired,
      waktu: PropTypes.string.isRequired,
      lokasi: PropTypes.string.isRequired,
      penyebab: PropTypes.string,
      kronologi: PropTypes.string,
      pengungsi: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    })
  ).isRequired,
  onEditClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
};


export default Table;
