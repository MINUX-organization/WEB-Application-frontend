import { PropsWithChildren, createContext, useContext, useState } from "react"; 
import { useDynamicDataStore } from "@/shared/stores"; 
import { useEffectOnce } from "usehooks-ts";
import { toast } from "react-toastify";
import { backendUrlWs } from "@/shared/constants";

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

  useEffectOnce(() => {
    const lws = new WebSocket(backendUrlWs)
    lws.onerror = error => {
      toast.error('Cannot connect to backend')
      console.error('WebSocket error:', error);
    }
    lws.onopen = event => {
      console.log('WebSocket connection opened:', event);
      lws.send(JSON.stringify("Front"))
    }
    lws.onclose = event => {
      console.log('WebSocket connection closed:', event);
    }
    lws.onmessage = event => {
      // TODO validate event.data
      // console.log(event)
      updateDynamicData(JSON.parse(event.data))
    }
    setWs(lws)
    
    return () => {
      ws.close();
    };
  });

  return (
    <WebSocketProviderContext.Provider value={{ ws }}>
      {children}
    </WebSocketProviderContext.Provider>
  );
}
