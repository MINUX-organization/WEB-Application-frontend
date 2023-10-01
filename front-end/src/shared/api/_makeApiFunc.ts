import { getSessionId, setSessionId } from 'providers/AuthProvider'
import axios, { AxiosResponse } from 'axios'
import { RuntypeBase } from 'runtypes/lib/runtype'
import * as rt from 'runtypes'
import { backendUrlHttp } from '../constants'

const axiosInstance = axios.create({
  baseURL: backendUrlHttp
})

axiosInstance.interceptors.request.use(request => {
  request.headers.set('sessionId', getSessionId())
  return request
})

axiosInstance.interceptors.response.use(response => {
  if (response.status === 401) {
    setSessionId(null) // remove sessionId
  }
  return response
})

export const makeApiFunc = <Request, ResponseRuntype extends RuntypeBase<unknown>, Response = rt.Static<ResponseRuntype>>(method: 'GET' | 'POST', url: string, responseRuntype: ResponseRuntype ) => {
  return async (data: Request) => {
    try {
      const response =  await axiosInstance.request<Response, AxiosResponse<Response>, Request>({ method, url, data })
      responseRuntype.check(response.data)
      return response
    } catch (e: any) {
      // if (axios.isAxiosError(e)) {
      //   if (e.code === '401') {
      //     setSessionId(null) // remove sessionId
      //   }
      // }
      throw e
    }
  }
}

