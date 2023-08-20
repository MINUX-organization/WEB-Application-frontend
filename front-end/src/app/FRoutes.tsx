import { Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from '@widgets/Layout';
import { UserLayout } from '@widgets/UserLayout';
import * as pages from '@pages'
import { useDispatch } from 'react-redux'
import { dynamicDataAction } from 'shared/store/storeData'
import { staticDataAction } from 'shared/store/storeData'
import { testDynamicData } from 'shared/hook'
import { testStaticData } from 'shared/hook/useTestStatic'

export const FRoutes = () => {

  //TODO: ws provider
  const dispatch = useDispatch();

  //Test Data
  dispatch(dynamicDataAction.updateDynamicData(testDynamicData))
  dispatch(staticDataAction.updateStaticData(testStaticData))
  //Test Data

  return (
    <Routes> 
      <Route path='/' element={<Navigate to='/monitoring'/>}/>
      <Route path="/" element={<Layout />}>
        <Route path='monitoring' element={<pages.Monitoring/>}/>
        <Route path='settings-flight-sheet' element={<pages.settings.FlightSheet />} />
        <Route path='settings-gpu' element={<pages.settings.GPU />} />
        <Route path='analytics' element={<pages.Analytics />}/>
        <Route path='system-gpus' element={<pages.system.GPUs />}/>
        <Route path='system-cpu' element={<pages.system.CPU />}/>
        <Route path='system-motherboard' element={<pages.system.Motherboard />} />
        <Route path='system-ram' element={<pages.system.RAM />} />
        <Route path='system-storage' element={<pages.system.Storage />} />
        <Route path='user' element={<UserLayout />}>
          <Route path='profile' element={<pages.user.Profile />} />
          <Route path='wallets' element={<pages.user.Wallets />} />
          <Route path='crypto-pool' element={<pages.user.CryptoPool />} />
          <Route path='vpn-proxy' element={<pages.user.VPNProxy />} />
          <Route path='feedback' element={<pages.Feedback />} />
        </Route>
        <Route path='logout' element={<pages.Logout />} />
        <Route path='*' element={<Navigate to='/monitoring'/>}/>
      </Route>  
    </Routes>
  )
}
