import * as rt from 'runtypes'
import { makeApiFunc } from "./_makeApiFunc"
import { getSessionId } from '@/providers/AuthProvider'

type TRequest = {}

const TResponseRuntype = rt.Record({
  username: rt.String
})

export const getUserInfo = async (arg: TRequest): Promise<{data: rt.Static<typeof TResponseRuntype>}> => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      if (getSessionId() === 'dummySessionId') {
        resolve({
          data: {
            username: 'minux'
          }
        })
      } else {
        reject({
          statusCode: '401',
          error: 'unauthorized access'
        })
      }
    }, 1000)
  })
}

// export const getUserInfo = makeApiFunc<TRequest, typeof TResponseRuntype>('GET', 'user/user-info', TResponseRuntype)
