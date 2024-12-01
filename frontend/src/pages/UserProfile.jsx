import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProfile } from "../api/qrApi";
import { Button } from "@headlessui/react";
import {
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/outline";

const UserProfile = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState({
    _id: "",
    qr: "",
    url: "",
    data: {
      name: "",
      email: "",
      phone: "",
      address: "",
      facebook: "",
      twitter: "",
      linkedin: "",
      instagram: "",
    },
  });

  useEffect(() => {
    getProfile(id).then((res) => {
      setUserData(res?.data || {});
    });
  }, [id]);

  return (
    <div className="max-w-3xl mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
      {/* Cover Section */}
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max"
          alt="Cover"
          className="h-40 w-full object-cover rounded-t-lg"
        />
        <div className="absolute inset-x-0 top-32">
          <div className="w-24 h-24 mx-auto border-4 border-white rounded-full overflow-hidden">
            <img
              src="https://via.placeholder.com/150"
              alt={userData.data.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* User Details */}
      <div className="text-center m-16 mb-4 px-6">
        <h2 className="text-xl font-bold">{userData.data.name || "N/A"}</h2>
        <p className="text-gray-500">
          <MapPinIcon className="inline-block w-5 h-5 mr-1 text-gray-400" />
          {userData.data.address || "Address not available"}
        </p>
      </div>

      {/* Contact Section */}
      <hr className="mt-4" />
      <div className="py-4 px-6 flex justify-between">
        <div className="w-1/2">
          <div className="flex items-center text-gray-700 mb-4">
            <PhoneIcon className="w-6 h-6 mr-2 text-gray-400" />
            <span>{userData.data.phone || "Phone not available"}</span>
          </div>
          <div className="flex items-center text-gray-700 mb-4">
            <EnvelopeIcon className="w-6 h-6 mr-2 text-gray-400" />
            <span>{userData.data.email || "Email not available"}</span>
          </div>
        </div>
        <div className="w-1/2 flex justify-end">
          <img
            src={`${process.env.REACT_APP_API_URL}/uploads/${userData.qr}`}
            alt={userData.data.name}
            className="w-36 h-36 border-4 border-white overflow-hidden"
          />
        </div>
      </div>
      <hr />

      {/* Social Media Links */}
      <div className="py-4 px-6">
        <h3 className="text-lg font-semibold mb-2">Social Media</h3>
        <div className="flex space-x-4">
          {userData.data.facebook && (
            <a
              href={userData.data.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center"
            >
              <GlobeAltIcon className="w-5 h-5 mr-1" /> Facebook
            </a>
          )}
          {userData.data.twitter && (
            <a
              href={userData.data.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline flex items-center"
            >
              <GlobeAltIcon className="w-5 h-5 mr-1" /> Twitter
            </a>
          )}
          {userData.data.linkedin && (
            <a
              href={userData.data.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 hover:underline flex items-center"
            >
              <GlobeAltIcon className="w-5 h-5 mr-1" /> LinkedIn
            </a>
          )}
          {userData.data.instagram && (
            <a
              href={userData.data.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-pink-500 hover:underline flex items-center"
            >
              <GlobeAltIcon className="w-5 h-5 mr-1" /> Instagram
            </a>
          )}
        </div>
      </div>

      {/* Follow Button */}
      <div className="px-6 py-4 text-center border-t border-gray-200">
        <Button className="bg-blue-600 text-white py-2 px-6 rounded-full hover:bg-blue-700">
          Follow
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
