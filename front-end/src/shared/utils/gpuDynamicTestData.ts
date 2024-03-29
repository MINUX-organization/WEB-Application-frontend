import { GpuDynamic } from "@/shared/stores/types/GpuDynamic";

export const gpuDynamicTestData: GpuDynamic[] = [
  {
    id: 1,
    uuid: "fsdk23324",
    temperature: 45,
    fullName: "Nvidia RTX 3060TI",
    fanSpeed: 60, 
    hashrate: {value: 123, measurement: 'H/s'},
    powerUsage: 170,
    algorithm: "Random X",
    cryptocurrency: "XMR",
    miner: {
      uuid: '123',
      fullName: 'lolminer'
    },
    minerUpTime: "2:00:00",
    shares: {
      accepted: 100,
      rejected: 6
    },
    memory: {
      reserved: 235,
      used: 7,
      free: 12045               
    },
    clocks: {
      core: 210, 
      memory: 405, 
    }
  }, 
  {
    id: 2,
    uuid: "fsdk23324",
    temperature: 45,
    fullName: "Nvidia RTX 3060TI",
    fanSpeed: 60, 
    hashrate: {value: 123, measurement: 'H/s'},
    powerUsage: 170,
    algorithm: "Random X",
    cryptocurrency: "XMR",
    miner: {
      uuid: '12312',
      fullName: 'lolminer'
    },
    minerUpTime: "2:00:00",
    shares: {
      accepted: 100,
      rejected: 6
    },
    memory: {
      reserved: 235,
      used: 7,
      free: 12045               
    },
    clocks: {
      core: 210, 
      memory: 405, 
    }
  }
]