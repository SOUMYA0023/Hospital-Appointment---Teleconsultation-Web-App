import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: Date;
  isOwnMessage: boolean;
  isSystem?: boolean;
  avatarUrl?: string;
  className?: string;
}

export function MessageBubble({
  id,
  senderId,
  senderName,
  text,
  timestamp,
  isOwnMessage,
  isSystem = false,
  avatarUrl,
  className
}: MessageBubbleProps) {
  if (isSystem) {
    return (
      <div className="flex justify-center my-4">
        <span className="text-xs bg-muted text-muted-foreground px-3 py-1 rounded-full uppercase tracking-wider">
          {text}
        </span>
      </div>
    );
  }

  return (
    <div 
      key={id} 
      className={cn(
        "flex w-full",
        isOwnMessage ? "justify-end" : "justify-start",
        className
      )}
    >
      {!isOwnMessage && (
        <div className="mr-2 flex-shrink-0">
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatarUrl} />
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              {senderName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      )}
      
      <div className={cn(
        "max-w-[80%] rounded-2xl px-4 py-2 text-sm",
        isOwnMessage 
          ? "bg-primary text-primary-foreground rounded-br-none" 
          : "bg-card border shadow-sm rounded-bl-none"
      )}>
        {!isOwnMessage && (
          <p className="text-[10px] text-muted-foreground mb-1 font-medium">
            {senderName}
          </p>
        )}
        <p className={cn(
          "whitespace-pre-wrap",
          isOwnMessage ? "text-primary-foreground" : "text-foreground"
        )}>
          {text}
        </p>
        <p className={cn(
          "text-[9px] mt-1 text-right",
          isOwnMessage ? "text-primary-foreground/70" : "text-muted-foreground"
        )}>
          {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
      
      {isOwnMessage && (
        <div className="ml-2 flex-shrink-0">
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatarUrl} />
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              {senderName.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </div>
      )}
    </div>
  );
}