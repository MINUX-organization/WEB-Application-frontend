// import axios, { AxiosError } from "axios"; 
// import { showNotificationError } from "./lib";
// import { MotherboardStatic } from "@/shared/stores/types/MotherboardStatic";

// export const getMotherboardData = async () => { 
//   const data: MotherboardStatic = await axios.get("http://localhost:8200/api/static-data/get-motherboard-data")
//   .then((response) => response.data)
//   .catch((error: AxiosError) => {
//     showNotificationError(error)
//   })

//   return data;
// }

import * as rt from 'runtypes'
import { makeApiFunc } from "./_makeApiFunc";

type Request = {}

const ResponseRuntype = rt.Record({
  motherboard: rt.Record({
    information: rt.Record({
      manufacturer: rt.String,
      productName: rt.String,
      serialNumber: rt.String
    }),
    slots: rt.Record({
      sata: rt.Number,
      pci: rt.Number,
      ram: rt.Record({
        type: rt.String,
        maximumSpeed: rt.Number,
        maximumCapacity: rt.Number
      })
    })
  })
})

export const getMotherboardData = makeApiFunc<Request, typeof ResponseRuntype>("GET", 'static-data/get-motherboard-data', ResponseRuntype)
