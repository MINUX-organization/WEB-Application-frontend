import { getStaticCpu, getStaticGpus, getStaticHarddrives, getSettingsGpus, getGpuSetup } from "@/shared/api";
import { useStateObj } from "@/shared/lib";
import { TFullFilledFlightSheet } from "../api/getFullFilledFlightSheets";

export type TStateObj<T> = ReturnType<typeof useStateObj<T>>

export type TStaticCPU = Awaited<ReturnType<typeof getStaticCpu>>['data']
export type TStaticGPU = Awaited<ReturnType<typeof getStaticGpus>>['data']['gpus'][number]
export type TStaticHarddrive = Awaited<ReturnType<typeof getStaticHarddrives>>['data']['harddrives'][number]
export type TSettingsGpu = Awaited<ReturnType<typeof getSettingsGpus>>['data']['settingGpus'][number]
export type TGpuSetup = Awaited<ReturnType<typeof getGpuSetup>>['data']['gpuSetup']

export type TCryptocurrency = { id: number, name: string, fullName: string, algorithmId: number }
export type TPool = { id: number, host: string, port: number, cryptocurrencyId: number }
export type TWallet = { id: number, name: string, source: string, address: string, cryptocurrencyId: number }
export type TAlgorithm = { id: number, name: string }
export type TMiner = { id: number, name: string, fullName: string }
export type TFlightSheet = { id: number, name: string, cryptocurrency_id: number, wallet_id: number, miner_id: number, pool_id: number }

export type TWalletFilled = { id: number, name: string, source: string, address: string, cryptocurrency: TCryptocurrency }

export type TFlightSheetFilled = TFullFilledFlightSheet;

export type TFlightSheetConfig = Extract<TFullFilledFlightSheet, { type: 'GPU-MULTIPLE'}>['configs'][number]
export type TFlightSheetConfigInput = {
  [key in keyof Omit<TFlightSheetConfig, 'algorithm'>]: Omit<TFlightSheetConfig, 'algorithm'>[key] | null
}
