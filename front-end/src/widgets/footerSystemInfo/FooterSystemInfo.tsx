import { getSystemInfo } from '@/shared/api/getSystemInfo';
import { useQuery } from 'react-query'; 
import { InfoBlock } from './InfoBlock';
import styles from './footerSystemInfo.module.scss'
import _ from 'lodash'; 
import { useId } from 'react';
import { toast } from 'react-toastify';

export default function FooterSystemInfo() { 
  const id = useId();
    const {isFetching, data } = useQuery(['load system info data'], getSystemInfo, { onError: (err: any) => toast.error(`cannot get system info: ${err.message}`)}) 

    const fields = [
      {labels: ["MB", "CPU", "Disk", "Linux"], 
      values: [data?.data.systemInfo.motherboard, data?.data.systemInfo.cpu, data?.data.systemInfo.harddrive, data?.data.systemInfo.linux]},
      {labels: ["OpenCL", "CUDA", "Driver AMD", "Driver Nvidia"], 
      values: [data?.data.systemInfo.technologies.versions.opencl, data?.data.systemInfo.technologies.versions.cuda, data?.data.systemInfo.drivers.versions.nvidia, data?.data.systemInfo.drivers.versions.amd]},
      {labels: ["Local IP", "MAC-adress", "Minux Version"], 
      values: [data?.data.systemInfo.localIp, data?.data.systemInfo.macAddress, data?.data.systemInfo.minuxVersion]}
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