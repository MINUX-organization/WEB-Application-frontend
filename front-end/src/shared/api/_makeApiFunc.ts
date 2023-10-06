import { getSessionId, setSessionId } from 'providers/AuthProvider'
import { RuntypeBase } from 'runtypes/lib/runtype'
import { backendUrlHttp } from '../constants'
import { toast } from 'react-toastify'
import axios, { AxiosResponse } from 'axios'
import * as rt from 'runtypes'

const axiosInstance = axios.create({
  baseURL: backendUrlHttp,
  params: {}
})

axiosInstance.interceptors.request.use(
  request => {
    request.headers.set('sessionId', getSessionId())
    return request
  },
  error => {
    toast.error(error.message)
  }
)

axiosInstance.interceptors.response.use(
  response => {
    if (response.status === 401) {
      setSessionId(null) // remove sessionId
    }
    return response
  },
  error => {
    console.log(error)
    toast.error(error.message)
  }
)

export const makeApiFunc = <Request, ResponseRuntype extends RuntypeBase<unknown>, Response = rt.Static<ResponseRuntype>>(method: 'GET' | 'POST' | 'DELETE', url: string, responseRuntype: ResponseRuntype ) => {
  return async (data: Request) => {
    try {
      const response =  await axiosInstance.request<Response, AxiosResponse<Response>, Request>({ method, url, data })
      responseRuntype.check(response.data)
      return response
    } catch (error: any) {
      console.log(error)
      toast.error(error.message)
      // if (axios.isAxiosError(e)) {
      //   if (e.code === '401') {
      //     setSessionId(null) // remove sessionId
      //   }
      // }
      throw error
    }
  }
}

