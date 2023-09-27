import axios, { AxiosError } from "axios"; 
import { showNotificationError } from "./lib";

export const getCpuFullName = async () => { 
    const data: string = await axios.get("http://localhost:8200/static-data/cpu-full-name")
    .then((response) => response.data)
    .catch((error: AxiosError) => {
        showNotificationError(error)
    })

    return data;
} 