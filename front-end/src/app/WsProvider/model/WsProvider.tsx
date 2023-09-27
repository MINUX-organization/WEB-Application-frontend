import React, { useEffect, useState } from "react"; 
import { webSocketClient } from "../classes/WebSocketClient";
import { useDynamicDataStore } from "@shared/stores"; 

const WsProvider = ({ children } : { children: React.ReactNode }) => { 
    const updateDynamicData = useDynamicDataStore((state) => state.updateDynamicData);

    useEffect(() => {
        const connectWebSocket = async () => {
          try {
            await webSocketClient.connect('ws://localhost:8200');
            webSocketClient.sendMessage('Front') 
          } catch (error) {
            console.error('WebSocket connection failed:', error);
          }
        }; 
        connectWebSocket();

        webSocketClient.onMessage(message => {
            updateDynamicData(JSON.parse(message.data))
        })
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