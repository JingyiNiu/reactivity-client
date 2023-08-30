import axios, { AxiosError, AxiosResponse } from "axios";
import { Activity } from "../models/activity";
import { router } from "../router/Routes";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 5000,
});

instance.interceptors.response.use(
  async (response) => {
    await sleep(500);
    return response;
  },
  (error: AxiosError) => {
    const { data } = error.response as AxiosResponse;
    if (data.errors) {
      const modalStateErrors = [];
      for (const key in data.errors) {
        if (data.errors[key]) {
          modalStateErrors.push(data.errors[key]);
        }
      }
      const customError = new Error("Request failed with errors");
      customError.message = modalStateErrors.flat().join(", ");
      throw customError;
    }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
  get: <T>(url: string) => instance.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}) => instance.post<T>(url, body).then(responseBody),
  put: <T>(url: string, body: {}) => instance.put<T>(url, body).then(responseBody),
  del: <T>(url: string) => instance.delete<T>(url).then(responseBody),
};

const Activities = {
  list: () => requests.get<Activity[]>(`/activities`),
  details: (id: string) => requests.get<Activity>(`/activities/${id}`),
  create: (activity: Activity) => requests.post<void>(`/activities`, activity),
  update: (activity: Activity) => requests.put<void>(`/activities/${activity.id}`, activity),
  delete: (id: string) => requests.del<void>(`/activities/${id}`),
};

const agent = {
  Activities,
};

export default agent;
