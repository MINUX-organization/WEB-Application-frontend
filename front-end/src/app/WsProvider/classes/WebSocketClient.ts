class WebSocketClient {
    private socket: WebSocket | null = null;
  
    connect(url: string): Promise<Event> {
      return new Promise((resolve, reject) => {
        this.socket = new WebSocket(url);
        this.socket.onerror = (error) => {
          console.error('WebSocket error:', error);
          reject(error);
        };
        this.socket.onopen = (ev: Event) => {
          console.log('WebSocket connection opened:', ev);
          resolve(ev);
        };
        this.socket.onclose = (ev: CloseEvent) => {
          console.log('WebSocket connection closed:', ev);
        };
      });
    }
  
    onMessage(handler: (message: MessageEvent) => void): void {
      if (this.socket) {
        this.socket.onmessage = handler;
      }
    }
  
    sendMessage(message: any): void {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify(message));
      }
    }
  
    close(): void {
      if (this.socket) {
        this.socket.close();
      }
    }
  }
  
  export const webSocketClient = new WebSocketClient();