import { useDynamicDataStore } from '@/shared/stores';
import { CSSProperties } from 'react';
import { useElementSize } from 'usehooks-ts';
import { useQuery } from 'react-query';
import { valueOrZero } from '@/shared/utils';
import { getCalculationsData } from '@/shared/api/getCalculationsData';
import st from './GpuList.module.scss';
import NaImage from '@/shared/components/NaImage';
import GpuListItem from './GpuListItem';
import CountBox from './CountBox';

export const GpuList = () => {
  const { data } = useQuery(['load calculations data'], getCalculationsData);
  const gpus = [...useDynamicDataStore((state) => state.data.gpus)].sort(
    (a, b) => a.id - b.id
  );
  const [gpuListRef, size] = useElementSize();

  return (
    <div
      className={st['gpu-list']}
      style={
        {
          '--gpu-list-width': `${size.width}px`,
          '--gpu-list-height': `${size.height}px`,
        } as CSSProperties
      }
    >
      <div ref={gpuListRef} className={st['gpu-list__list']}>
        <div className={st['gpu-list__list-header']}>
          <div className={st['gpu-list__list-header-counters']}>
            <CountBox
              label="GPUs"
              value={valueOrZero(data?.data.calculations.gpusCount)}
            />
            <CountBox
              label="Nvidia"
              value={valueOrZero(data?.data.calculations.gpusNvidia)}
              frameColor="#43C09B"
            />
            <CountBox
              label="AMD"
              value={valueOrZero(data?.data.calculations.gpusAmd)}
              frameColor="#FC4E4E"
            />
          </div>
          <div>Temp</div>
          <div>Fan</div>
          <div>Power</div>
          <div>Coin</div>
          <div>Accepted</div>
          <div>Rejected</div>
          <div>Hashrate</div>
        </div>
        <div className={st['gpu-list__grid']}>
          {gpus.length === 0 && (
            <NaImage className={st['gpu-list__na-image']} alt={true} />
          )}
          <div className={st['gpu-list__grid-body']}>
            {gpus.map((item) => (
              <GpuListItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
