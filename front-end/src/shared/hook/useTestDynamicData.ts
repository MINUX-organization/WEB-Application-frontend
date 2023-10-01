import { DynamicData } from "@/shared/stores/types";


export const testDynamicData: DynamicData = {
    state: {
        mining: true
    },
    cpu: {
        temperature: 80,
        clockSpeed: 1000,
        fanSpeed: 100,
        hashrate: {
            value: 120,
            measurement: 'H/s'
          },
        powerUsage: 1.5,
        algorithm: 'Random X',
        cryptocurrency: 'XMR',
        miner: {uuid: "13124", fullName: 'lolminer'}, 
        minerUpTime: '2:33:22',
        shares: {
            accepted: 12,
            rejected: 15
        }
    },
    gpus: [{ 
            uuid: 'fsdkfj324',
                temperature: 45,
                fullName: 'Nvidia RTX 3080TI',
                fanSpeed: 60, 
                hashrate: {
                    value: 120,
                    measurement: 'H/s'
                  },
                powerUsage: 170,
                algorithm: 'Random X',
                cryptocurrency: 'XMR',
                miner: {uuid: '312', fullName: 'lolminer'},
                minerUpTime: '2:30:00',
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
                    memory: 405,
                    core: 555,
                }, 
        }, 
        {
            uuid: 'fsdkfj324',
                temperature: 45,
                fullName: 'Nvidia RTX 3080TI',
                fanSpeed: 60, 
                hashrate: {
                    value: 120,
                    measurement: 'H/s'
                  },
                powerUsage: 170,
                algorithm: 'Random X',
                cryptocurrency: 'XMR',
                miner: {uuid: '312', fullName: 'eeeee'},
                minerUpTime: '2:30:00',
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
                    memory: 405,
                    core: 555,
                }, 
    }],
    rams: [ 
            {
                uuid: '123',
                total: {
                    value: 1234,
                    measurement: 'Mb'
                },
                freeB: {
                    value: 1234,
                    measurement: "Mb"
                }
            }, 

        ],
    harddrive: { 
        uuid: 'rwerkj432',
        temperature: 25,
        capacity: 256, 
        free: 256 
    }, 
    calculations: {
        coinsValue: [
            { coin: "Raven", algorithm: "Kawpow", value: 120 },
            { coin: "Bitcoin", algorithm: "Kawpow", value: 150 }
    ],
        totalSharesAccepted: 125,
        totalSharesRejected: 200, 
        workingMiners: 2,
        workingAlgorithms: 2,
        totalPower: 123,
        totalRam: 8200
    }
}