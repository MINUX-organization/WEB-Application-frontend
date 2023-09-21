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
        {labels: ["MB", "CPU", "Disk", "System"], values: [data?.cpu, data?.cpu, data?.hd, data?.system]},
        {labels: ["OpenCL", "CUDA", "Driver", "Minux Ver."], values: [data?.openCl, data?.cuda, data?.driver, data?.minuxVer]},
        {labels: ["Local IP", "Global IP", "MAC-adress"], values: [data?.localIp, data?.globalIp, data?.macAdress]}
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