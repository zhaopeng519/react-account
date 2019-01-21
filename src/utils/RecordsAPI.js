import axios from "axios";

export const api =
  process.env.REACT_APP_RECORDS_API_URL ||
  "http://5bd9c81a0bab79001346a054.mockapi.io/api/v1/records";

export const getAll = () => axios.get(`${api}/api/v1/records`);

export const create = body => axios.post(`${api}/api/v1/records`, body);