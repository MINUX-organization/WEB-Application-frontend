import axios, { AxiosError } from "axios"; 
import { SystemInfo } from "@shared/stores/types/systemInfo";
import { showNotificationError } from "./lib";

export const getSystemInfo = async () => { 
    const data: SystemInfo = await axios.get("http://localhost:8000/static-data/system-info")
    .then((response) => response.data)
    .catch((error: AxiosError) => {
        showNotificationError(error)
    })

    return data;
} 