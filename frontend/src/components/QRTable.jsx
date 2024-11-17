import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { deleteQrCode } from "../api/qrApi";

const QRTable = ({ qrCodes, refreshQrCodes }) => {
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this QR Code?"
    );
    if (!confirmed) return;

    try {
      await deleteQrCode(id);
      refreshQrCodes();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-lg border border-gray-200">
        <thead>
          <tr className="bg-gray-100 text-gray-600 text-sm uppercase font-semibold">
            <th className="py-4 px-6 border-b border-gray-200 text-center">
              QR Code
            </th>
            <th className="py-4 px-6 border-b border-gray-200 text-center">
              Data
            </th>
            <th className="py-4 px-6 border-b border-gray-200 text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-700 text-sm">
          {qrCodes.map((qr) => (
            <tr
              key={qr._id}
              className="hover:bg-gray-50 border-b border-gray-200 transition"
            >
              <td className="py-4 px-6 text-center">
                <img
                  src={qr.qr}
                  alt="QR Code"
                  className="w-20 h-20 mx-auto rounded-md shadow-sm"
                />
              </td>
              <td className="py-4 px-6 text-center">{qr.data}</td>
              <td>
                <div className="flex justify-center h-full gap-1">
                  <button
                    onClick={() => handleDelete(qr._id)}
                    className="flex items-center justify-center gap-2 px-2 py-2 bg-gray-700 text-white text-xs font-medium uppercase rounded hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-200"
                    aria-label={`Delete QR code for ${qr.data}`}
                  >
                    <EyeIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(qr._id)}
                    className="flex items-center justify-center gap-2 px-2 py-2 bg-blue-600 text-white text-xs font-medium uppercase rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-200"
                    aria-label={`Delete QR code for ${qr.data}`}
                  >
                    <PencilSquareIcon className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(qr._id)}
                    className="flex items-center justify-center gap-2 px-2 py-2 bg-red-500 text-white text-xs font-medium uppercase rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition duration-200"
                    aria-label={`Delete QR code for ${qr.data}`}
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QRTable;
