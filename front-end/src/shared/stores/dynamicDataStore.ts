import { DynamicData } from './types';
import { create } from 'zustand';
import { produce } from 'immer';

type DynamicActions = {
  updateDynamicData: (data: Partial<DynamicData>) => void;
};

type DynamicDataStore = {
  data: DynamicData;
};

type DynamicStore = DynamicDataStore & DynamicActions;

export const useDynamicDataStore = create<DynamicStore>((set) => ({
  data: {
    state: {
      mining: false,
    },
    gpus: [],
    cpu: {
      temperature: 0,
      clockSpeed: 0,
      fanSpeed: 0,
      hashrate: {
        value: 0,
        measurement: '',
      },
      powerUsage: 0,
      algorithm: '',
      cryptocurrency: '',
      miner: {
        uuid: '',
        fullName: '',
      },
      minerUpTime: '',
      shares: {
        accepted: 0,
        rejected: 0,
      },
    },
    harddrive: {
      uuid: '',
      temperature: 0,
      capacity: 0,
      free: 0,
    },
    rams: [],
    calculations: {
      coinsValue: [],
      totalSharesAccepted: 0,
      totalSharesRejected: 0,
      workingAlgorithms: 0,
      workingMiners: 0,
      totalPower: 0,
      totalRam: 0,
    },
  },
  updateDynamicData: (data: Partial<DynamicData>) =>
    set((state) =>
      produce(state, (draft) => {
        // console.log(data)
        draft.data = { ...draft.data, ...data };
      })
    ),
}));