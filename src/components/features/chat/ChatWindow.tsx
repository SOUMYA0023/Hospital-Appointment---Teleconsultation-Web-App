"use client"

import { useChat, Message } from "@/hooks/use-chat"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, Send } from "lucide-react"
import { cn } from "@/lib/utils"
// import { ScrollArea } from "@/components/ui/scroll-area" // Optional, using div overflow for now

interface ChatWindowProps {
    chatId: string
    title: string
}

export function ChatWindow({ chatId, title }: ChatWindowProps) {
    const { messages, inputText, setInputText, sendMessage, isConnected, user } = useChat(chatId)

    return (
        <Card className="h-[600px] flex flex-col shadow-lg border-primary/20">
            <CardHeader className="border-b px-6 py-4 bg-primary/5">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Avatar>
                            <AvatarFallback className="bg-primary text-primary-foreground">
                                {title.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                        </Avatar>
                        {isConnected && <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />}
                    </div>
                    <div>
                        <CardTitle className="text-base">{title}</CardTitle>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                            {isConnected ? <span className="text-green-600">Connected</span> : <span className="flex items-center gap-1">Connecting <Loader2 className="h-3 w-3 animate-spin" /></span>}
                        </p>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/10">
                {messages.map((msg) => {
                    if (msg.isSystem) {
                        return (
                            <div key={msg.id} className="flex justify-center my-4">
                                <span className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full uppercase tracking-wider">
                                    {msg.text}
                                </span>
                            </div>
                        )
                    }

                    const isMe = msg.senderId === user?.id
                    return (
                        <div key={msg.id} className={cn("flex w-full", isMe ? "justify-end" : "justify-start")}>
                            <div className={cn(
                                "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
                                isMe ? "bg-primary text-primary-foreground rounded-br-none" : "bg-card border shadow-sm rounded-bl-none"
                            )}>
                                {!isMe && <p className="text-[10px] text-muted-foreground mb-1">{msg.senderName}</p>}
                                <p>{msg.text}</p>
                                <p className={cn("text-[9px] mt-1 text-right", isMe ? "text-primary-foreground/70" : "text-muted-foreground")}>
                                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </CardContent>

            <CardFooter className="p-4 border-t bg-background">
                <form
                    className="flex w-full gap-2"
                    onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
                >
                    <Input
                        placeholder="Type your message..."
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        disabled={!isConnected}
                        className="flex-1"
                    />
                    <Button type="submit" size="icon" disabled={!isConnected || !inputText.trim()}>
                        <Send className="h-4 w-4" />
                    </Button>
                </form>
            </CardFooter>
        </Card>
    )
}
