import axios, { AxiosError } from "axios"; 
import { showNotificationError } from "./lib";
import { HarddriveStatic } from "@/shared/stores/types/HarddriveStatic";

export const getHarddriveData = async () => { 
  const data: HarddriveStatic = await axios.get("http://localhost:8200/api/static-data/get-harddrives-data")
  .then((response) => response.data)
  .catch((error: AxiosError) => {
    showNotificationError(error)
  })

  return data;
}