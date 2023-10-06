import { store } from '@/app/store';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider as AntDConfigProvider, theme, ThemeConfig } from 'antd';
import { FRoutes } from './FRoutes';
import { AuthProvider } from '../providers/AuthProvider';
import { QueryClient, QueryClientProvider } from 'react-query';
import { IconContext } from "react-icons";
import { ToastContainer } from 'react-toastify';
import { WebSocketProvider } from '../providers/WebSocketProvider';
import { CookiesProvider } from 'react-cookie';
import './index.scss';

const color = {
  primary: '#3C9EA5'
}

const ftheme: ThemeConfig = {
  algorithm: theme.darkAlgorithm,
  token: {
    colorPrimary: '#3C9EA5',
    borderRadius: 0,
  },
  components: {
    DatePicker: {
      colorBorder: color.primary,
      colorTextPlaceholder: 'rgba(255, 255, 255, 0.4862745098)',
      fontSize:  20
    },
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
      <CookiesProvider>
        <IconContext.Provider value={{ className: 'react-icon' }}>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <Provider store={store}>
                <AntDConfigProvider theme={ftheme}>
                  <WebSocketProvider>
                    <FRoutes /> 
                  </WebSocketProvider>
                  <ToastContainer position='bottom-left' />
                </AntDConfigProvider>
              </Provider>
            </AuthProvider>
          </QueryClientProvider>
        </IconContext.Provider>
      </CookiesProvider>
    </BrowserRouter>
  );
}
