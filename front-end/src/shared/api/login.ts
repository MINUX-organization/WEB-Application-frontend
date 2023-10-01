import { makeApiFunc } from "./_makeApiFunc"
import * as rt from 'runtypes'

type TRequest = {
  name: string
  password: string
}

const TResponseRuntype = rt.Record({
  sessionId: rt.Union(rt.String, rt.Null)
})

export const login = async (arg: TRequest): Promise<{data: rt.Static<typeof TResponseRuntype>}> => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      if (arg.name === 'minux' && arg.password === 'minux') {
        resolve({
          data: {
            sessionId: 'dummySessionId'
          }
        })
      } else {
        reject({
          statusCode: '401',
          error: 'wrong credentials'
        })
      }
    }, 1000)
  })
}

// export const login = _makeApiFunc<TRequest, typeof TResponseRuntype>('POST', 'user/login', TResponseRuntype)
