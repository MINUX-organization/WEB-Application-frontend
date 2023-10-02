import { DynamicData, DynamicDataRunType } from './types';
import { create } from 'zustand';
import { produce } from 'immer';
import { toast } from 'react-toastify';

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
    harddrives: [{
      uuid: '',
      temperature: 0,
      capacity: 0,
      free: {
        value: 324,
        measurement: 'MeAsurementUnit'
      }
    }],
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
    set((state) => {
      try {
        DynamicDataRunType.check(data)
        return produce(state, (draft) => {
          draft.data = { ...draft.data, ...data };
        })
      } catch (e: any) {
        toast.error((e.message ?? JSON.stringify(e)).slice(0, 100) + '... for more info see console', { position: toast.POSITION.BOTTOM_LEFT })
        console.log(e.message ?? JSON.stringify(e))
      }
      return state
    }),
}));
