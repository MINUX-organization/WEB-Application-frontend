import axios, { AxiosError } from "axios"; 
import { showNotificationError } from "./lib";
import { MotherboardStatic } from "@/shared/stores/types/motherboardStatic";

export const getMotherboardData = async () => { 
    const data: MotherboardStatic = await axios.get("http://localhost:8200/api/static-data/get-motherboard-data")
    .then((response) => response.data)
    .catch((error: AxiosError) => {
        showNotificationError(error)
    })

    return data;
} 