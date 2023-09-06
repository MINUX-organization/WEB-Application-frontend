import axios, { AxiosError } from "axios";
import { showNotificationError } from "./lib";
import { CpuStatic } from "@shared/stores/types/cpuStatic";

export const getCpuData = async () => { 
    const data: CpuStatic = await axios.get("http://localhost:8000/staticData/cpuData")
    .then((response) => response.data)
    .catch((error: AxiosError) => {
        showNotificationError(error)
    })

    return data;
} 