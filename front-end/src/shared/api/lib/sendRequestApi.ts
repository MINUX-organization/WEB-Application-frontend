import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface RequestParams {
  url: string,
  method: Method,
  data?: any,
  params?: any,
  headers?: any,
  successMsg: string
}

export async function sendRequestApi({ url, 
    method, 
    data, 
    params, 
    headers, 
    successMsg = 'Операция успешно выполнена!'}: RequestParams): Promise<any> {
  const config: AxiosRequestConfig = {
    url,
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (data) {
    config.data = data;
  }

  if (params) {
    config.params = params;
  }

  try {
    const response: AxiosResponse = await axios(config);

    if (response.status === 200) {
        return response.data;
    } else if (response.status === 201) { 
        toast.success(successMsg, {
            position: toast.POSITION.BOTTOM_LEFT,
        });
    } else { 
        toast.error(`Код: ${response.status}\nОшибка: ${response.statusText}`, {
            position: toast.POSITION.BOTTOM_LEFT,
        });
    }
  } catch (error: any) { 
        toast.error(`Ошибка: ${error.message}`, { 
          position: toast.POSITION.BOTTOM_LEFT, 
        });
  }
}