'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Send, 
  Video, 
  Phone, 
  MoreHorizontal, 
  Paperclip, 
  Smile,
  Loader2,
  MessageSquare
} from 'lucide-react';
import { MessageBubble } from './MessageBubble';
import { ChatList } from './ChatList';
import { useChat } from '@/hooks/use-chat';
import { cn } from '@/lib/utils';

interface ChatInterfaceProps {
  className?: string;
}

export function ChatInterface({ className }: ChatInterfaceProps) {
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, inputText, setInputText, sendMessage, isConnected, user } = useChat(activeChatId || 'default');

  // Mock chat data
  const mockChats = [
    {
      id: 'chat-1',
      name: 'Dr. Sarah Smith',
      lastMessage: 'Thank you for your message. I\'ll review your case.',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 5),
      unreadCount: 2,
      isActive: true,
      isOnline: true,
      type: 'doctor' as const
    },
    {
      id: 'chat-2',
      name: 'Dr. James Wilson',
      lastMessage: 'Your prescription has been sent to the pharmacy.',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 30),
      unreadCount: 0,
      isActive: true,
      isOnline: false,
      type: 'doctor' as const
    },
    {
      id: 'chat-3',
      name: 'Dr. Emily Johnson',
      lastMessage: 'Please come in for your follow-up appointment.',
      lastMessageTime: new Date(Date.now() - 1000 * 60 * 60 * 2),
      unreadCount: 1,
      isActive: true,
      isOnline: true,
      type: 'doctor' as const
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (inputText.trim() && activeChatId) {
      sendMessage();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const selectedChat = mockChats.find(chat => chat.id === activeChatId);

  return (
    <div className={cn("flex h-[calc(100vh-2rem)] rounded-lg border bg-background overflow-hidden", className)}>
      {/* Chat List Sidebar - Hidden on mobile when chat is open */}
      <div className={cn(
        "w-80 border-r flex flex-col bg-muted/10",
        "md:flex", // Always show on desktop
        isMobileSidebarOpen ? "absolute inset-y-0 left-0 z-20 w-80 bg-background" : "hidden"
      )}>
        <ChatList
          chats={mockChats}
          activeChatId={activeChatId}
          onSelectChat={(chatId) => {
            setActiveChatId(chatId);
            setIsMobileSidebarOpen(false);
          }}
        />
        
        {/* Mobile overlay */}
        {isMobileSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-10 md:hidden"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
        )}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {activeChatId ? (
          <>
            {/* Chat Header */}
            <CardHeader className="border-b p-4 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    onClick={() => setIsMobileSidebarOpen(true)}
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                  
                  <div>
                    <h2 className="font-semibold text-foreground">{selectedChat?.name}</h2>
                    <div className="flex items-center gap-2 text-sm">
                      <span className={cn(
                        "flex items-center gap-1",
                        selectedChat?.isOnline ? "text-green-600" : "text-muted-foreground"
                      )}>
                        <span className={cn(
                          "h-2 w-2 rounded-full",
                          selectedChat?.isOnline ? "bg-green-500" : "bg-gray-400"
                        )} />
                        {selectedChat?.isOnline ? 'Online' : 'Offline'}
                      </span>
                      {isConnected ? (
                        <span className="text-green-600">Connected</span>
                      ) : (
                        <span className="flex items-center gap-1 text-muted-foreground">
                          Connecting <Loader2 className="h-3 w-3 animate-spin" />
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>

            {/* Messages Area */}
            <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Send className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground mb-2">Start a conversation</h3>
                  <p className="text-muted-foreground max-w-sm">
                    Send a message to begin your consultation with {selectedChat?.name}
                  </p>
                </div>
              ) : (
                <>
                  {messages.map((msg) => (
                    <MessageBubble
                      key={msg.id}
                      id={msg.id}
                      senderId={msg.senderId}
                      senderName={msg.senderName}
                      text={msg.text}
                      timestamp={msg.timestamp}
                      isOwnMessage={msg.senderId === user?.id}
                      isSystem={msg.isSystem}
                    />
                  ))}
                  <div ref={messagesEndRef} />
                </>
              )}
            </CardContent>

            {/* Message Input */}
            <CardFooter className="border-t p-4 flex-shrink-0">
              <div className="flex w-full gap-2">
                <Button variant="ghost" size="icon" className="flex-shrink-0">
                  <Paperclip className="h-4 w-4" />
                </Button>
                
                <div className="flex-1 relative">
                  <Input
                    placeholder="Type your message..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={!isConnected}
                    className="pr-12"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => {/* Emoji picker functionality */}}
                  >
                    <Smile className="h-4 w-4" />
                  </Button>
                </div>
                
                <Button
                  size="icon"
                  className="flex-shrink-0"
                  onClick={handleSendMessage}
                  disabled={!isConnected || !inputText.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardFooter>
          </>
        ) : (
          /* No chat selected state */
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-6">
              <MessageSquare className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">Select a conversation</h3>
            <p className="text-muted-foreground max-w-md">
              Choose a doctor from the sidebar to start a secure consultation
            </p>
            
            {/* Mobile prompt */}
            <Button 
              className="mt-6 md:hidden"
              onClick={() => setIsMobileSidebarOpen(true)}
            >
              <MoreHorizontal className="h-4 w-4 mr-2" />
              Open Chat List
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}