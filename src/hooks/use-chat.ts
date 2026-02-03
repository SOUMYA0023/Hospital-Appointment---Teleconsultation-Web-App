"use client"

import { useState, useEffect, useRef } from "react"
import { useAuth } from "@/features/auth/auth-context"

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

    // Simulate connection delay
    useEffect(() => {
        const timer = setTimeout(() => setIsConnected(true), 1500)

        // Add initial system message
        setMessages([
            {
                id: "sys-1",
                senderId: "system",
                senderName: "System",
                text: "consultation session started. All messages are encrypted.",
                timestamp: new Date(),
                isSystem: true
            }
        ])

        return () => clearTimeout(timer)
    }, [chatId])

    const sendMessage = () => {
        if (!inputText.trim() || !user) return

        const newMessage: Message = {
            id: Date.now().toString(),
            senderId: user.id,
            senderName: user.name,
            text: inputText,
            timestamp: new Date(),
        }

        setMessages((prev) => [...prev, newMessage])
        setInputText("")

        // Mock auto-reply
        setTimeout(() => {
            const reply: Message = {
                id: (Date.now() + 1).toString(),
                senderId: "other",
                senderName: user.role === "patient" ? "Dr. Sarah Smith" : "John Doe",
                text: "I received your message. Let me check that for you.",
                timestamp: new Date()
            }
            setMessages((prev) => [...prev, reply])
        }, 2000)
    }

    return {
        messages,
        inputText,
        setInputText,
        sendMessage,
        isConnected,
        user
    }
}
