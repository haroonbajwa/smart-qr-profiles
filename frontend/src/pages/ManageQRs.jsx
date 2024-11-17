import { useEffect, useState } from "react";
import { getQrCodes } from "../api/qrApi";
import QRForm from "../components/QRForm";
import QRTable from "../components/QRTable";

const ManageQRs = () => {
  const [qrCodes, setQrCodes] = useState([]);

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
      <h1 className="text-2xl font-bold mb-4">QR Code Manager</h1>
      <div className="mb-8">
        <QRForm refreshQrCodes={refreshQrCodes} />
      </div>
      <QRTable qrCodes={qrCodes} refreshQrCodes={refreshQrCodes} />
    </div>
  );
};

export default ManageQRs;
