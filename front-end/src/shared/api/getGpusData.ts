import axios, { AxiosError } from "axios"; 
import { showNotificationError } from "./lib"; 
import { GpuStatic } from "@shared/stores/types/gpuStatic";

export const getGpusData = async () => { 
    const data: GpuStatic[] = await axios.get("http://localhost:8000/staticData/gpusData")
    .then((response) => response.data)
    .catch((error: AxiosError) => {
        showNotificationError(error)
    })

    return data;
} 