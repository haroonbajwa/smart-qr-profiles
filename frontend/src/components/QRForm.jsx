import { useState } from "react";
import { createQrCode } from "../api/qrApi";

const QRForm = ({ refreshQrCodes }) => {
  const [data, setData] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createQrCode(data);
      refreshQrCodes();
      setData("");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 p-4 bg-white shadow rounded"
    >
      <input
        type="text"
        value={data}
        onChange={(e) => setData(e.target.value)}
        placeholder="Enter profile data"
        className="p-2 border rounded"
        required
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Generate QR Code
      </button>
    </form>
  );
};

export default QRForm;
