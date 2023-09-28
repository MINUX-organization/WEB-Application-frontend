import { getSessionId, setSessionId } from '@app/AuthProvider'
import axios, { AxiosResponse } from 'axios'
import { RuntypeBase } from 'runtypes/lib/runtype'
import * as rt from 'runtypes'

if (process.env.REACT_APP_BACKEND_URL === undefined) {
  throw new Error('REACT_APP_BACKEND_URL is undefined, you should provide it inside ".env" file')
}

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
})

axiosInstance.interceptors.request.use(request => {
  request.headers.set('sessionId', getSessionId())
  return request
})

export const _makeApiFunc = <Request, ResponseRuntype extends RuntypeBase<unknown>>(method: 'GET' | 'POST', url: string, responseRuntype: ResponseRuntype ) => {
  type Response = rt.Static<ResponseRuntype>
  return async (data: Request) => {
    try {
      const response =  await axiosInstance.request<Response, AxiosResponse<Response>, Request>({
        method,
        url,
        data,
      })
      responseRuntype.check(response.data)
      return response
    } catch (e: any) {
      if (axios.isAxiosError(e)) {
        if (e.code === '401') {
          setSessionId(null)
        }
      }
      throw e
    }
  }
}
