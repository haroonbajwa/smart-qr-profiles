import axios from "axios";

const API = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/qr`,
});

export const getQrCodes = () => API.get("/");
export const getProfile = (id) => API.get(`/${id}/getProfile`);
export const createQrCode = (data) => API.post("/add", { data });
export const updateQrCode = (id, data) => API.put(`/${id}/update`, data);
export const deleteQrCode = (id) => API.delete(`/${id}/delete`);
