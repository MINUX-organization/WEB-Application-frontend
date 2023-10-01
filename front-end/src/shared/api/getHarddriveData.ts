import axios, { AxiosError } from "axios"; 
import { showNotificationError } from "./lib";
import { HdStatic } from "@/shared/stores/types/hdStatic";

export const getHarddriveData = async () => { 
    const data: HdStatic = await axios.get("http://localhost:8200/api/static-data/get-harddrives-data")
    .then((response) => response.data)
    .catch((error: AxiosError) => {
        showNotificationError(error)
    })

    return data;
} 