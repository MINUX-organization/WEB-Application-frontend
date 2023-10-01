import { PropsWithChildren, createContext, useContext, useState } from "react"; 
import { useDynamicDataStore } from "@/shared/stores"; 
import { backendUrlWs } from "@/shared/constants";
import { useEffectOnce } from "usehooks-ts";

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
      console.error('WebSocket error:', error);
    }
    lws.onopen = event => {
      console.log('WebSocket connection opened:', event);
      lws.send("Front")
    }
    lws.onclose = event => {
      console.log('WebSocket connection closed:', event);
    }
    lws.onmessage = event => {
      // TODO validate event.data
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
