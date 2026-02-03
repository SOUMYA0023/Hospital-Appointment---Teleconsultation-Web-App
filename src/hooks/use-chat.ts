"use client"

import { useState, useEffect, useRef } from "react"
import { useAuth } from "@/features/auth/auth-context"
import { getWebSocketProvider } from "@/lib/websocket-provider";

export interface Message {
    id: string
    senderId: string
    senderName: string
    text: string
    timestamp: Date
    isSystem?: boolean
}

export function useChat(chatId: string) {
    const { user } = useAuth()
    const [messages, setMessages] = useState<Message[]>([])
    const [inputText, setInputText] = useState("")
    const [isConnected, setIsConnected] = useState(false)
    const [wsProvider, setWsProvider] = useState<any>(null);
    
    useEffect(() => {
        // Initialize WebSocket connection
        const wsUrl = `${process.env.NEXT_PUBLIC_WEBSOCKET_URL || 'ws://localhost:8080'}/chat/${chatId}`;
        const provider = getWebSocketProvider(wsUrl);
        
        setWsProvider(provider);
        
        // Connect to WebSocket
        const connect = async () => {
            try {
                await provider.connect();
                setIsConnected(true);
                
                // Add initial system message
                setMessages([
                    {
                        id: "sys-1",
                        senderId: "system",
                        senderName: "System",
                        text: "Consultation session started. All messages are encrypted.",
                        timestamp: new Date(),
                        isSystem: true
                    }
                ]);
                
                // Subscribe to messages
                const unsubscribe = provider.subscribe((data) => {
                    if (data.type === 'message') {
                        const newMessage: Message = {
                            id: data.id,
                            senderId: data.senderId,
                            senderName: data.senderName,
                            text: data.text,
                            timestamp: new Date(data.timestamp),
                        };
                        setMessages(prev => [...prev, newMessage]);
                    } else if (data.type === 'system') {
                        const systemMessage: Message = {
                            id: `sys-${Date.now()}`,
                            senderId: "system",
                            senderName: "System",
                            text: data.message,
                            timestamp: new Date(),
                            isSystem: true
                        };
                        setMessages(prev => [...prev, systemMessage]);
                    } else if (data.type === 'typing') {
                        // Handle typing indicators if needed
                        console.log(data.message);
                    }
                });
                
                return unsubscribe;
            } catch (error) {
                console.error('Failed to connect to WebSocket:', error);
            }
        };
        
        connect();
        
        // Cleanup on unmount
        return () => {
            if (provider) {
                provider.disconnect();
            }
        };
    }, [chatId]);

    const sendMessage = () => {
        if (!inputText.trim() || !user || !wsProvider) return;

        const newMessage: Message = {
            id: Date.now().toString(),
            senderId: user.id,
            senderName: user.name,
            text: inputText,
            timestamp: new Date(),
        };

        // Optimistically add the message to the UI
        setMessages((prev) => [...prev, newMessage]);
        setInputText("");
        
        // Send the message via WebSocket
        wsProvider.send({
            type: 'message',
            id: newMessage.id,
            chatId,
            senderId: user.id,
            senderName: user.name,
            text: inputText,
            timestamp: newMessage.timestamp.toISOString()
        });
    };

    return {
        messages,
        inputText,
        setInputText,
        sendMessage,
        isConnected,
        user
    };
}
