import axios, { AxiosError } from "axios"; 
import { showNotificationError } from "./lib";
import { HdStatic } from "@shared/stores/types/hdStatic";

export const getHarddriveData = async () => { 
    const data: HdStatic = await axios.get("http://localhost:8000/static-data/harddrive")
    .then((response) => response.data)
    .catch((error: AxiosError) => {
        showNotificationError(error)
    })

    return data;
} 