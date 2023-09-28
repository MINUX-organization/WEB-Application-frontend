import { getSystemInfo } from '@shared/api/getSystemInfo';
import { useQuery } from 'react-query'; 
import { InfoBlock } from './InfoBlock';
import styles from './footerSystemInfo.module.scss'
import _ from 'lodash'; 
import { useId } from 'react';

export default function FooterSystemInfo() { 
  const id = useId();
    const {isFetching, data } = useQuery(['load system info data'], getSystemInfo) 

    const fields = [
        {labels: ["MB", "CPU", "Disk", "Linux"], 
        values: [data?.systemInfo.motherboard, data?.systemInfo.cpu, data?.systemInfo.harddrive, data?.systemInfo.linux]},
        {labels: ["OpenCL", "CUDA", "Driver Nvidia", "Driver AMD"], 
        values: [data?.systemInfo.technologies.versions.opencl, data?.systemInfo.technologies.versions.cuda, data?.systemInfo.drivers.versions.nvidia, data?.systemInfo.drivers.versions.amd]},
        {labels: ["Local IP", "MAC-adress", "Minux Version"], 
        values: [data?.systemInfo.localIp, data?.systemInfo.macAddress, data?.systemInfo.minuxVersion]}
    ] 

    return (
    <div className={styles['footer-system-info']}>
      <div className={styles['footer-grid']}> 
        {_.map(fields, (item, index) => (
            <InfoBlock key={id + index} labels={item.labels} values={item.values} isFetching={isFetching}/>
          ))}
      </div>
    </div>
  );
}