
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from '@/lib/utils';
import { Brain, Send } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatInterfaceProps {
  isOpen: boolean;
  activeSubject?: string | null;
  onClose: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  isOpen, 
  activeSubject, 
  onClose 
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Initial greeting based on selected subject
  useEffect(() => {
    if (isOpen && activeSubject) {
      const subjectMessages: Record<string, string> = {
        math: "I'd be happy to help with Mathematics! From basic arithmetic to advanced calculus, what would you like to learn about?",
        science: "Ready to explore Science topics! Biology, chemistry, physics, or something else - what are you curious about?",
        language: "Let's dive into Language and literature! Grammar, writing tips, or literary analysis - how can I assist you?",
        history: "Fascinated by History? Ancient civilizations, world wars, cultural movements - what period interests you?",
        arts: "The Arts are such a rich domain! Music, visual arts, theater, or dance - what creative topic shall we discuss?",
        technology: "Technology questions? From programming to AI, digital trends to computer science - what would you like to know?"
      };
      
      const greeting = subjectMessages[activeSubject] || "Hello! I'm your BrainLearn AI assistant. What subject would you like to explore today?";
      
      setMessages([
        {
          id: Date.now().toString(),
          content: greeting,
          sender: 'ai',
          timestamp: new Date()
        }
      ]);
    }
  }, [isOpen, activeSubject]);
  
  // Scroll to bottom when messages update
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);
  
  // Focus on input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Simulate AI response
    setTimeout(() => {
      let aiResponse = "I'm currently a demo version of the BrainLearn AI assistant. In the full version, I'll provide detailed answers on any educational topic!";
      
      if (input.toLowerCase().includes('hello') || input.toLowerCase().includes('hi')) {
        aiResponse = "Hello there! How can I help with your learning journey today?";
      } else if (input.toLowerCase().includes('thank')) {
        aiResponse = "You're welcome! Feel free to ask more questions anytime.";
      } else if (activeSubject === 'math' && (
        input.toLowerCase().includes('algebra') || 
        input.toLowerCase().includes('equation') ||
        input.toLowerCase().includes('math')
      )) {
        aiResponse = "Great question about mathematics! In the full version, I'll provide step-by-step explanations for algebra problems, equation solving, calculus, and more.";
      } else if (activeSubject) {
        aiResponse = `That's an interesting question about ${activeSubject}! In the full version, I'll have extensive knowledge on this topic and can provide detailed explanations.`;
      }
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };
  
  if (!isOpen) return null;
  
  return (
    <Card className={cn(
      "fixed inset-x-0 bottom-0 mx-auto max-w-2xl h-[500px] z-50 shadow-lg rounded-t-xl rounded-b-none border-t-2 border-l-2 border-r-2",
      "transition-transform duration-300 transform",
      isOpen ? "translate-y-0" : "translate-y-full"
    )}>
      <div className="flex flex-col h-full">
        {/* Chat header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">
              BrainLearn AI Assistant
              {activeSubject && ` - ${activeSubject.charAt(0).toUpperCase() + activeSubject.slice(1)}`}
            </h3>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Minimize
          </Button>
        </div>
        
        {/* Messages area */}
        <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex w-max max-w-[80%] rounded-lg p-4",
                  message.sender === 'user'
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
        
        {/* Input area */}
        <form onSubmit={handleSubmit} className="border-t p-4">
          <div className="flex items-center space-x-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about learning..."
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default ChatInterface;
