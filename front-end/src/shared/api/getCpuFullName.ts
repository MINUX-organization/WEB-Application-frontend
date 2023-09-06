import axios, { AxiosError } from "axios"; 
import { showNotificationError } from "./lib";

export const getCpuFullName = async () => { 
    const data: string = await axios.get("http://localhost:8000/staticData/cpuFullName")
    .then((response) => response.data)
    .catch((error: AxiosError) => {
        showNotificationError(error)
    })

    return data;
} 