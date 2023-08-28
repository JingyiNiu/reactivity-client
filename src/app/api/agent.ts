import axios, { AxiosResponse } from 'axios';
import { Activity } from '../models/activity';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

const instance = axios.create({
    baseURL: 'http://localhost:5000/api',
    timeout: 5000,
  });

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

instance.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error)
    }
})

const requests = {
    get: <T>(url: string) => instance.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => instance.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => instance.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => instance.delete<T>(url).then(responseBody)
}

const Activities = {
    list: () => requests.get<Activity[]>(`/activities`),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => requests.post<void>(`/activities`, activity),
    update: (activity: Activity) => requests.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.del<void>(`/activities/${id}`)
}

const agent = {
    Activities
}

export default agent;