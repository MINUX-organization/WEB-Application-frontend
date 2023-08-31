import { store } from '@app';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider, theme, ThemeConfig } from 'antd';
import { FRoutes } from './FRoutes';
import { AuthProvider } from './AuthProvider';
import { QueryClient, QueryClientProvider } from 'react-query';
import { IconContext } from "react-icons";
import './index.scss';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

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
            <Provider store={store}>
              <ConfigProvider theme={ftheme}>
                <FRoutes /> 
                <ToastContainer />
              </ConfigProvider>
            </Provider>
          </AuthProvider>
        </QueryClientProvider>
      </IconContext.Provider>
    </BrowserRouter>
  );
}
