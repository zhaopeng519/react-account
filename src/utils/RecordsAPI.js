import axios from "axios";

export const api =
  process.env.REACT_APP_RECORDS_API_URL ||
  "http://5bd9c81a0bab79001346a054.mockapi.io/api/v1/records";

export const getAll = () => axios.get(`${api}/api/v1/records`);

export const create = body => axios.post(`${api}/api/v1/records`, body);

export const update = (id,body) => axios.put(`${api}/api/v1/records/${id}`, body);

export const remove = (id) => axios.delete(`${api}/api/v1/records/${id}`);