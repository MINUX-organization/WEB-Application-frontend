import { NavigateLink } from '@/shared/components';
import { useState } from 'react';
import './navBar.scss' 
import HoverList from './HoverList';

const classActive: string = 'nav-link'; 

const monitoringOptions = [
  { id: 1, text: 'Main Page', url: '/monitoring/mainpage' }, 
];
const settingsOptions = [
  { id: 1, text: 'Flight Sheet', url: '/settings/flightsheet'},  
  { id: 2, text: 'GPUs', url: '/settings/gpu' },
]; 
// const analyticsOptions = [
//   { id: 1, text: 'Main Page', url: '/mainpage' }, 
// ];
const systemOptions = [
  { id: 1, text: 'GPUs', url: '/system/gpus' }, 
  { id: 2, text: 'CPU', url: '/system/cpu' }, 
  { id: 3, text: 'Motherboard', url: '/system/motherboard' }, 
  { id: 4, text: 'RAM', url: '/system/ram' }, 
  { id: 5, text: 'Storage', url: '/system/storage' }, 
];

export default function NavBar() { 
  const [showOptionsMonitoring, setShowOptionsMonitoring] = useState(false); 
  const [showOptionsSettings, setShowOptionsSettings] = useState(false); 
  const [showOptionsAnalytics, setShowOptionsAnalytics] = useState(false); 
  const [showOptionsSystem, setShowOptionsSystem] = useState(false); 
  
  const handlerClickMonitoring = () => {
    setShowOptionsMonitoring(!showOptionsMonitoring)
  }



  const handlerClickSettings = () => {
    setShowOptionsSettings(!showOptionsSettings)
  }



  const handlerClickAnalytics = () => {
    setShowOptionsAnalytics(!showOptionsAnalytics)
  }



  const handlerClickSystem = () => {
    setShowOptionsSystem(!showOptionsSystem)
  }

  return (
    <div className='border-line-flex'>
      <div className='flex-conteiner-horizontal'> 

      <div onClick={handlerClickMonitoring} onMouseLeave={() => setShowOptionsMonitoring(false)}>
        <HoverList options={monitoringOptions} >
          <NavigateLink route='/monitoring' cancel={true} classActive={classActive} 
          notActive={showOptionsMonitoring ? 'not-active-click' : 'not-active'}
          text='Monitoring'/>
        </HoverList> 
      </div>
        
        <div onClick={handlerClickSettings} onMouseLeave={() => setShowOptionsSettings(false)}>
          <HoverList options={settingsOptions}>
            <NavigateLink route='/settings' cancel={true} classActive={classActive}
                            notActive={showOptionsSettings ? 'not-active-click' : 'not-active'} 
                             text='Settings' /> 
          </HoverList>
        </div>

        <div onClick={handlerClickAnalytics} onMouseLeave={() => setShowOptionsAnalytics(false)}>
          <HoverList>
            <NavigateLink route='/analytics' cancel={true} classActive={classActive}
                            notActive={showOptionsAnalytics ? 'not-active-click' : 'not-active'} 
                             text='Analytics' />
          </HoverList> 
        </div>

        <div onClick={handlerClickSystem} onMouseLeave={() => setShowOptionsSystem(false)}>
          <HoverList options={systemOptions}>
            <NavigateLink route='/system' cancel={true} classActive={classActive}
            notActive={showOptionsSystem ? 'not-active-click' : 'not-active'}
             text='System' />
          </HoverList> 
        </div>

        <div className='profile'>

        </div>
      </div>
    </div>
  )
}