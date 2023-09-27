import axios, { AxiosError } from "axios";
import { showNotificationError } from "./lib";
import { CpuStatic } from "@shared/stores/types/cpuStatic";

export const getCpuData = async () => { 
    const data: CpuStatic = await axios.get("http://localhost:8200/api/static-data/get-cpu-data")
    .then((response) => response.data)
    .catch((error: AxiosError) => {
        showNotificationError(error)
    })

    return data;
} 