import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios';
import { toast } from 'react-toastify'; 

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
  successMsg = 'Operation successfully completed!'}: RequestParams): Promise<any> {
  const config: AxiosRequestConfig = {
  url,
  method,
  headers: {
    'Content-Type': '@/application/json',
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
    toast.success(successMsg);
  } else { 
    toast.error(`Code: ${response.status}\nError: ${response.statusText}`);
  }
  } catch (error: any) { 
    toast.error(`Error: ${error.message}`);
  }
}