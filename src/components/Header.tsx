
import React from 'react';
import { Button } from "@/components/ui/button";
import { Brain, MessageCircle } from 'lucide-react';

interface HeaderProps {
  onChatOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ onChatOpen }) => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl">BrainLearn</span>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            size="sm" 
            className="hidden md:flex gap-2"
            onClick={onChatOpen}
          >
            <MessageCircle className="h-4 w-4" />
            Ask AI Assistant
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            className="md:hidden"
            onClick={onChatOpen}
          >
            <MessageCircle className="h-5 w-5" />
            <span className="sr-only">Ask AI Assistant</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
