import axios, { AxiosResponse } from 'axios';
import { Activity } from '../models/Activity';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useLocation } from 'react-router-dom';
import { router } from '../router/Routes';
import { store } from '../store/store';

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}
axios.defaults.baseURL = 'http://localhost:5000/api';


axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
}, (error: AxiosError) => {
    const { data, status, config } = error.response as AxiosResponse;
    switch (status) {
        case 400:
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                router.navigate('/not-found');
            }
            if (data.errors) {
                const arrayErrors = []
                for (const key in data.errors) {
                    arrayErrors.push(data.errors[key])
                }
                throw arrayErrors.flat();
            }
            else {
                toast.error(data);
            }
            break;
        case 401:
            toast.error("UnAuthorized Siiiiiir")
            break;
        case 403:
            toast.error("Why are you trying to check this ?? FORBIDDEN")
            break;
        case 404:
            router.navigate('/not-found')
            break;
        case 500:
            store.commonStore.setError(data);
            router.navigate("/server-error");
            break;

        default:
            break;
    }
    return Promise.reject(error);
})
//Below old way of doing it\\
// axios.interceptors.response.use( response=>{
//     return sleep(100).then(()=>{
//         return response;
//     }).catch((error)=>{
//         console.log(error);
//         return Promise.reject(error);  
//     })
// })
const responseBody = <T>(response: AxiosResponse<T>) => response.data;
const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Activities = {
    list: () => requests.get<Activity[]>('/activities'),
    details: (id: string) => requests.get<Activity>(`/activities/${id}`),
    create: (activity: Activity) => requests.post<void>('/activities/', activity),
    update: (activity: Activity) => requests.put<void>(`/activities/${activity.id}`, activity),
    delete: (id: string) => requests.del<void>(`/activities/${id}`)
}

const agent = {
    Activities
}

export default agent;