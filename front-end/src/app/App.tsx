 import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider, theme, ThemeConfig } from 'antd';
import { FRoutes } from './FRoutes';
import { AuthProvider } from './AuthProvider';
import { QueryClient, QueryClientProvider } from 'react-query';
import { IconContext } from "react-icons";
import './index.scss'; 
import { ToastContainer } from 'react-toastify';
import WsProvider from './WsProvider/model/WsProvider';

const color = {
  primary: '#3C9EA5'
}

const ftheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: { colorPrimary: '#3C9EA5', borderRadius: 0 },
  components: {
    DatePicker: {
      colorBorder: color.primary,
      colorTextPlaceholder: 'rgba(255, 255, 255, 0.4862745098)',
      fontSize:  20
    }
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false
    }
  }
})

export function App() {
  return (
    <BrowserRouter>
      <IconContext.Provider value={{ className: 'react-icon' }}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider> 
              <ConfigProvider theme={ftheme}>
                <WsProvider>
                  <FRoutes /> 
                </WsProvider>
                <ToastContainer />
              </ConfigProvider> 
          </AuthProvider>
        </QueryClientProvider>
      </IconContext.Provider>
    </BrowserRouter>
  );
}
