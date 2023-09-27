import axios, { AxiosError } from "axios"; 
import { SystemInfo } from "@shared/stores/types/systemInfo";
import { showNotificationError } from "./lib";

export const getSystemInfo = async () => { 
    const data: SystemInfo = await axios.get("http://localhost:8200/api/static-data/get-system-info-data")
    .then((response) => response.data)
    .catch((error: AxiosError) => {
        showNotificationError(error)
    })

    return data;
} 