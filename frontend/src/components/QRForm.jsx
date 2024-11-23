import { Dialog } from "@headlessui/react";
import { useState } from "react";
import { createQrCode } from "../api/qrApi";

const QRFormModal = ({ isOpen, onClose, refreshQrCodes }) => {
  const initialState = {
    name: "",
    email: "",
    phone: "",
    address: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    instagram: "",
  };

  const [formData, setFormData] = useState(initialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createQrCode(formData);
      refreshQrCodes();
      setFormData(initialState);
      onClose();
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-30"
        aria-hidden="true"
      />

      {/* Modal Panel */}
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-2xl bg-white rounded-lg p-6 overflow-y-auto max-h-[80vh]">
          <Dialog.Title className="text-lg font-semibold mb-4">
            Add QR Profile
          </Dialog.Title>
          <hr className="mb-5" />

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Personal Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="p-2 border rounded w-full"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="p-2 border rounded w-full"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="p-2 border rounded w-full"
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter address"
                  className="p-2 border rounded w-full"
                  rows="2"
                  required
                />
              </div>
            </div>

            {/* Social Media Links */}
            <h3 className="text-md font-semibold mt-4">Social Media Links</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium">Facebook</label>
                <input
                  type="url"
                  name="facebook"
                  value={formData.facebook}
                  onChange={handleChange}
                  placeholder="Enter Facebook profile URL"
                  className="p-2 border rounded w-full"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Twitter</label>
                <input
                  type="url"
                  name="twitter"
                  value={formData.twitter}
                  onChange={handleChange}
                  placeholder="Enter Twitter profile URL"
                  className="p-2 border rounded w-full"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">LinkedIn</label>
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="Enter LinkedIn profile URL"
                  className="p-2 border rounded w-full"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium">Instagram</label>
                <input
                  type="url"
                  name="instagram"
                  value={formData.instagram}
                  onChange={handleChange}
                  placeholder="Enter Instagram profile URL"
                  className="p-2 border rounded w-full"
                />
              </div>
            </div>

            <hr className="mt-5" />
            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Generate QR Code
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default QRFormModal;
