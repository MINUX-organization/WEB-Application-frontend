import React, { useEffect } from "react"; 
import { webSocketClient } from "../classes/WebSockerClient";

const WsProvider = ({ children } : { children: React.ReactNode }) => {
    useEffect(() => {
        const connectWebSocket = async () => {
          try {
            await webSocketClient.connect('ws://localhost:8200');
            webSocketClient.onMessage((message) => {
              console.log('WebSocket message received:', message);
            });
            webSocketClient.sendMessage('Front') 
          } catch (error) {
            console.error('WebSocket connection failed:', error);
          }
        };
        connectWebSocket();
    
        return () => {
          webSocketClient.close();
        };
      }, []); 

    return (  
        <React.Fragment>
            {children}
        </React.Fragment>
    );
}
 
export default WsProvider;