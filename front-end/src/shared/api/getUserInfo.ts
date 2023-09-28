import * as rt from 'runtypes'
import { _makeApiFunc } from "./_makeApiFunc"
import { getSessionId } from '@app/AuthProvider'

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

// export const getUserInfo = _makeApiFunc<TRequest, typeof TResponseRuntype>('GET', 'user/get-user-info', TResponseRuntype)
