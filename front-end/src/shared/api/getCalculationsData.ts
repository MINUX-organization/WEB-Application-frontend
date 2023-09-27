import axios, { AxiosError } from "axios"; 
import { showNotificationError } from "./lib";
import { CalculationsStatic } from "@shared/stores/types/calculationsStatic";

export const getCalculationsData = async () => { 
    const data: CalculationsStatic = await axios.get("http://localhost:8200/api/static-data/get-calculations-data")
    .then((response) => response.data)
    .catch((error: AxiosError) => {
        showNotificationError(error)
    })

    return data;
}