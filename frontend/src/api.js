import axios from "axios";

const api = axios.create({
  baseURL: "https://internshipterms-iii.onrender.com/api", 
});

export default api;
