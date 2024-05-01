import { PropsWithChildren, createContext, useContext, useState } from "react"; 
import { useDynamicDataStore } from "@/shared/stores"; 
import { useEffectOnce } from "usehooks-ts";
import { toast } from "react-toastify";
import { backendUrlWs } from "@/shared/constants";
import styles from './WebSocketProvider.module.scss'
import { Button } from "antd";

type WebSocketProviderContextType = {
  ws: WebSocket
}

const WebSocketProviderContext = createContext<WebSocketProviderContextType | null>(null)

export const useWebSocketProviderContext = () => {
  const context = useContext(WebSocketProviderContext)
  if (context === null) {
    throw new Error('useWebScoketProviderContext must be within <WebSocketProvider>')
  }
  return context;
}

export const WebSocketProvider = ({ children } : PropsWithChildren) => { 
  const updateDynamicData = useDynamicDataStore((state) => state.updateDynamicData);
  const [ws, setWs] = useState<WebSocket>(new WebSocket(backendUrlWs))
  const [connected, setConnected] = useState(true)

  const open = () => {
    ws.close()
    const lws = new WebSocket(backendUrlWs)
    lws.onerror = error => {
      setConnected(false)
      toast.error('Cannot connect to backend')
      console.error('WebSocket error:', error);
    }
    lws.onopen = event => {
      setConnected(true)
      console.log('WebSocket connection opened:', event);
      lws.send(JSON.stringify("Front"))
    }
    lws.onclose = event => {
      setConnected(false)
      console.log('WebSocket connection closed:', event);
    }
    lws.onmessage = event => {
      const data = JSON.parse(event.data) as Parameters<typeof updateDynamicData>[0];
      
      // FOR TESTING, DELETE THIS!
      data.gpus?.forEach((gpu) => {
        const algorithm = (gpu as any).algorithm;
        const cryptocurrency = (gpu as any).cryptocurrency;
        const hashrate = (gpu as any).hashrate;
        const shares = (gpu as any).shares;
        gpu.configs = [{ algorithm, cryptocurrency, hashrate, shares }]
      })
      // -------------------------
      
      updateDynamicData(data)
    }
    setWs(lws)
  }

  const close = () => {
    ws.close();
  }

  useEffectOnce(() => {
    open();
    return () => {
      close();
    };
  });

  return (
    <WebSocketProviderContext.Provider value={{ ws }}>
      {children}
      <div className={styles['connection-message'] + ' ' + (!connected ? styles['open'] : '')}>
        Backend not connected
        <Button type="primary" onClick={() => open()}>Reconnect</Button>
      </div>
    </WebSocketProviderContext.Provider>
  );
}
