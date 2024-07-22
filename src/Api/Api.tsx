import axios from "axios";
export const baseURL = "https://mediabrokers.lcisoft.it/api/v1";
export const emailLists = "/email-list";
export const emailTemplate = "/email-template";
export const emailEdit = "/update";
export const update = "/update";
export const CUSTOMERS = "/customers";
const token = localStorage.getItem("token");

export const axiosApi = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: "Bearer " + token,
  },
});

