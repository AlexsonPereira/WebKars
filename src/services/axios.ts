import axios from "axios";

export const Instance = axios.create({
  baseURL: "https://web-kars-api.onrender.com",
  timeout: 15000,
});

export const kenzieKars = axios.create({
  baseURL: "https://kenzie-kars.herokuapp.com",
  timeout: 15000,
});
