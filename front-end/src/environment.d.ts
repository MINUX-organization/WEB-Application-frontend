declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly REACT_APP_BACKEND_URL: string;
      readonly REACT_APP_BACKEND_WS_URL: string
    }
  }
}

export {}