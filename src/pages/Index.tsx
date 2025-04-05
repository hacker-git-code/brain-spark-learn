
import React, { useState } from 'react';
import Header from '@/components/Header';
import BrainMap from '@/components/BrainMap';
import ChatInterface from '@/components/ChatInterface';
import SubjectContent from '@/components/SubjectContent';
import { Brain } from 'lucide-react';

const Index = () => {
  const [activeSubject, setActiveSubject] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  const handleNodeClick = (subjectId: string) => {
    setActiveSubject(subjectId);
    // Optionally open chat when a node is clicked
    // setIsChatOpen(true);
  };
  
  const handleChatOpen = () => {
    setIsChatOpen(true);
  };
  
  const handleChatClose = () => {
    setIsChatOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onChatOpen={handleChatOpen} />
      
      <main className="flex-1 container py-8">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            Interactive <span className="text-primary">Educational</span> Experience
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            Explore subjects through an interactive brain map and learn in the way that works best for you.
          </p>
        </div>
        
        {/* Instructions */}
        <div className="text-center mb-10 flex items-center justify-center">
          <div className="inline-flex items-center gap-1 text-sm text-muted-foreground bg-secondary rounded-full px-4 py-1">
            <Brain className="h-4 w-4" />
            <span>Click on any brain region to explore that subject</span>
          </div>
        </div>
        
        {/* Brain Map */}
        <div className="mb-12">
          <BrainMap onNodeClick={handleNodeClick} />
        </div>
        
        {/* Subject Content */}
        {activeSubject && <SubjectContent subject={activeSubject} />}
        
        {/* AI Chat Interface */}
        <ChatInterface 
          isOpen={isChatOpen} 
          activeSubject={activeSubject}
          onClose={handleChatClose} 
        />
      </main>
      
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2025 BrainLearn. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Personalized learning for every mind
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
