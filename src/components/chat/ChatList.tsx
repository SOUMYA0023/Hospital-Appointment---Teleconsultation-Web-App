import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  MessageSquare, 
  Video, 
  Phone, 
  MoreHorizontal,
  Search,
  Archive,
  Trash2
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  isActive: boolean;
  isOnline: boolean;
  avatarUrl?: string;
  type: 'doctor' | 'patient';
}

interface ChatListProps {
  chats: Chat[];
  activeChatId: string | null;
  onSelectChat: (chatId: string) => void;
  className?: string;
}

export function ChatList({ 
  chats, 
  activeChatId, 
  onSelectChat,
  className 
}: ChatListProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return format(date, 'h:mm a');
    } else if (diffInHours < 168) { // Less than 7 days
      return format(date, 'EEE');
    } else {
      return format(date, 'MMM d');
    }
  };

  const truncateMessage = (message: string, maxLength = 40) => {
    return message.length > maxLength ? message.substring(0, maxLength) + '...' : message;
  };

  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Header */}
      <div className="p-4 border-b">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Messages</h2>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        <div className="divide-y">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={cn(
                "flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors cursor-pointer",
                activeChatId === chat.id && "bg-primary/10 border-r-2 border-primary",
                !chat.isActive && "opacity-60"
              )}
              onClick={() => onSelectChat(chat.id)}
            >
              {/* Avatar */}
              <div className="relative flex-shrink-0">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-medium">
                    {getInitials(chat.name)}
                  </span>
                </div>
                {chat.isOnline && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
                )}
              </div>

              {/* Chat Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-medium text-foreground truncate">{chat.name}</h3>
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-muted-foreground">
                      {formatTime(chat.lastMessageTime)}
                    </span>
                    {chat.unreadCount > 0 && (
                      <span className="h-2 w-2 rounded-full bg-primary" />
                    )}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground truncate">
                    {truncateMessage(chat.lastMessage)}
                  </p>
                  {chat.unreadCount > 0 && (
                    <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                      {chat.unreadCount > 9 ? '9+' : chat.unreadCount}
                    </span>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Video className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Phone className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t flex gap-2">
        <Button variant="outline" size="sm" className="flex-1">
          <Archive className="h-4 w-4 mr-2" />
          Archive
        </Button>
        <Button variant="outline" size="sm" className="flex-1">
          <Trash2 className="h-4 w-4 mr-2" />
          Clear
        </Button>
      </div>
    </div>
  );
}

// Loading skeleton for chat list
export function ChatListSkeleton() {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="h-6 w-24 bg-muted rounded mb-4"></div>
        <div className="h-10 w-full bg-muted rounded"></div>
      </div>
      <div className="flex-1">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-3 p-4 border-b">
            <div className="h-12 w-12 rounded-full bg-muted"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 w-32 bg-muted rounded"></div>
              <div className="h-3 w-24 bg-muted rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}