// Mock WebSocket provider for demonstration purposes
// In a real application, you would connect to an actual WebSocket server

export class WebSocketProvider {
  private listeners: ((data: any) => void)[] = [];
  private url: string;
  private connected = false;
  private mockInterval: NodeJS.Timeout | null = null;
  private mockReplies = [
    "Thank you for your message. I'll review your case.",
    "I've noted your concern. Let me check the records.",
    "That's an important question. Let me explain...",
    "I've updated your file with this information.",
    "Based on your symptoms, I recommend..."
  ];
  
  private mockTypingIndicators = [
    "Dr. is typing...",
    "Sending secure message...",
    "Encrypted transmission..."
  ];

  constructor(url: string) {
    this.url = url;
  }

  async connect(): Promise<void> {
    // Simulate connection delay
    return new Promise((resolve) => {
      setTimeout(() => {
        this.connected = true;
        console.log('Mock WebSocket connected to:', this.url);
        
        // Simulate receiving messages occasionally
        this.mockInterval = setInterval(() => {
          if (this.listeners.length > 0 && Math.random() > 0.7) { // 30% chance to receive a mock reply
            const mockMessage = {
              type: 'message',
              id: `mock-${Date.now()}`,
              senderId: 'doctor',
              senderName: 'Dr. Sarah Smith',
              text: this.mockReplies[Math.floor(Math.random() * this.mockReplies.length)],
              timestamp: new Date().toISOString()
            };
            this.listeners.forEach(listener => listener(mockMessage));
          }
        }, 5000); // Every 5 seconds
        
        resolve();
      }, 1000);
    });
  }

  send(data: any): boolean {
    if (this.connected) {
      console.log('Mock sending data:', data);
      
      // Simulate typing indicator
      const typingIndicator = {
        type: 'typing',
        senderName: data.senderName,
        message: this.mockTypingIndicators[Math.floor(Math.random() * this.mockTypingIndicators.length)]
      };
      
      // Send typing indicator immediately
      setTimeout(() => {
        this.listeners.forEach(listener => listener(typingIndicator));
      }, 300);
      
      return true;
    }
    return false;
  }

  subscribe(callback: (data: any) => void): () => void {
    this.listeners.push(callback);

    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(callback);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  disconnect(): void {
    this.connected = false;
    if (this.mockInterval) {
      clearInterval(this.mockInterval);
      this.mockInterval = null;
    }
    console.log('Mock WebSocket disconnected');
  }

  isConnected(): boolean {
    return this.connected;
  }
}

// Create a singleton instance for the app
let websocketProvider: WebSocketProvider | null = null;

export const getWebSocketProvider = (url: string): WebSocketProvider => {
  if (!websocketProvider) {
    websocketProvider = new WebSocketProvider(url);
  }
  return websocketProvider;
};