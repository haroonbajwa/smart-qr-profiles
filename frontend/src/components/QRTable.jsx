import { deleteQrCode } from "../api/qrApi";

const QRTable = ({ qrCodes, refreshQrCodes }) => {
  const handleDelete = async (id) => {
    try {
      await deleteQrCode(id);
      refreshQrCodes();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <table className="w-full bg-white shadow rounded">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2">QR Code</th>
          <th className="p-2">Data</th>
          <th className="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {qrCodes.map((qr) => (
          <tr key={qr._id} className="border-b">
            <td className="p-2">
              <img src={qr.qr} alt="QR Code" className="w-16" />
            </td>
            <td className="p-2">{qr.data}</td>
            <td className="p-2">
              <button
                onClick={() => handleDelete(qr._id)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default QRTable;
