import { useEffect, useState } from "react";
import { getQrCodes } from "../api/qrApi";
import QRTable from "../components/QRTable";
import QRFormModal from "../components/QRForm";

const ManageQRs = () => {
  const [qrCodes, setQrCodes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const refreshQrCodes = async () => {
    try {
      const { data } = await getQrCodes();
      setQrCodes(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    refreshQrCodes();
  }, []);

  return (
    <div className="p-8 min-h-screen">
      <div className="mb-4 flex justify-between align-middle">
        <h1 className="text-2xl font-bold mb-4">QR Code Manager</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
        >
          Add QR Profile
        </button>
      </div>

      <QRFormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        refreshQrCodes={refreshQrCodes}
      />

      {/* QR Table */}
      <QRTable qrCodes={qrCodes} refreshQrCodes={refreshQrCodes} />
    </div>
  );
};

export default ManageQRs;
