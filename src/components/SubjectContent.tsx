
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Image, PlayCircle, Zap } from 'lucide-react';

interface SubjectContentProps {
  subject: string;
}

const SubjectContent: React.FC<SubjectContentProps> = ({ subject }) => {
  // Content mapping based on subject
  const contentData: Record<string, any> = {
    math: {
      title: "Mathematics",
      description: "Explore the world of numbers, patterns, and problem-solving",
      text: "Mathematics is the science of patterns and relationships. It provides a foundation for understanding everything from basic arithmetic to complex physics. Key areas include algebra, geometry, calculus, statistics, and number theory.",
      visual: "diagrams/equations showing the relationship between concepts",
      audio: "explanation of mathematical concepts with practical examples",
      interactive: "interactive problem-solving with step-by-step guidance"
    },
    science: {
      title: "Science",
      description: "Discover the natural world through observation and experimentation",
      text: "Science encompasses biology, chemistry, physics, and more. It helps us understand the natural world through systematic observation and experimentation, leading to testable explanations and predictions.",
      visual: "diagrams of the scientific method and experimental processes",
      audio: "explanations of scientific discoveries and their impact",
      interactive: "virtual labs and experiments to test scientific principles"
    },
    language: {
      title: "Language",
      description: "Master communication through grammar, vocabulary, and composition",
      text: "Language is the systematic use of words to communicate. Studying language involves grammar, vocabulary, syntax, and the art of effective communication through speaking and writing.",
      visual: "diagrams of sentence structure and language components",
      audio: "pronunciation guides and speech patterns",
      interactive: "interactive grammar exercises and writing prompts"
    },
    history: {
      title: "History",
      description: "Understand the past to gain insight into the present",
      text: "History is the study of past events, particularly human affairs. It helps us understand how societies have evolved, the causes and effects of major events, and patterns that might repeat in the future.",
      visual: "timelines and historical maps showing key events",
      audio: "narrative explanations of historical events and their significance",
      interactive: "historical scenarios with decision-making challenges"
    },
    arts: {
      title: "Arts",
      description: "Express creativity through visual, performing, and literary arts",
      text: "The arts encompass visual arts, music, dance, theater, and literature. They provide ways to express creativity, emotions, and ideas through various mediums and techniques.",
      visual: "examples of different art forms and techniques",
      audio: "explanations of musical concepts and art movements",
      interactive: "guided creative exercises in different artistic mediums"
    },
    technology: {
      title: "Technology",
      description: "Explore digital tools, programming, and computational thinking",
      text: "Technology involves the application of scientific knowledge for practical purposes. Modern technology focuses on digital tools, programming, artificial intelligence, and computational thinking.",
      visual: "diagrams of computer systems and programming concepts",
      audio: "explanations of technological concepts and their applications",
      interactive: "coding exercises and technology problem-solving scenarios"
    }
  };
  
  // Default content if subject is not in the map
  const content = contentData[subject] || {
    title: "Select a Subject",
    description: "Choose a subject from the brain map to start learning",
    text: "Click on any brain region to explore that subject area.",
    visual: "overview of different learning approaches",
    audio: "introduction to the learning platform",
    interactive: "tutorial on how to use the interactive features"
  };
  
  return (
    <Card className="w-full max-w-3xl mx-auto animate-fade-in-up">
      <CardHeader>
        <CardTitle>{content.title}</CardTitle>
        <CardDescription>{content.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="text" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="text" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              <span className="hidden sm:inline">Text</span>
            </TabsTrigger>
            <TabsTrigger value="visual" className="flex items-center gap-2">
              <Image className="h-4 w-4" />
              <span className="hidden sm:inline">Visual</span>
            </TabsTrigger>
            <TabsTrigger value="audio" className="flex items-center gap-2">
              <PlayCircle className="h-4 w-4" />
              <span className="hidden sm:inline">Audio</span>
            </TabsTrigger>
            <TabsTrigger value="interactive" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <span className="hidden sm:inline">Interactive</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="text" className="space-y-4">
            <div className="prose max-w-none">
              <p>{content.text}</p>
              <p>This text-based learning module provides comprehensive explanations of key concepts, definitions, and theories in {content.title}.</p>
            </div>
          </TabsContent>
          
          <TabsContent value="visual" className="space-y-4">
            <div className="prose max-w-none">
              <p>In the visual learning mode, you would see {content.visual}.</p>
              <p>Visual representations help to understand complex concepts through diagrams, charts, and illustrations that highlight relationships and processes.</p>
            </div>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Visual content placeholder for {content.title}</p>
            </div>
          </TabsContent>
          
          <TabsContent value="audio" className="space-y-4">
            <div className="prose max-w-none">
              <p>The audio learning mode would provide {content.audio}.</p>
              <p>Audio explanations offer an alternative way to absorb information, perfect for auditory learners or studying while on the go.</p>
            </div>
            <div className="h-24 bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Audio player placeholder for {content.title}</p>
            </div>
          </TabsContent>
          
          <TabsContent value="interactive" className="space-y-4">
            <div className="prose max-w-none">
              <p>The interactive learning mode would feature {content.interactive}.</p>
              <p>Interactive exercises promote active learning through hands-on activities, simulations, and problem-solving challenges.</p>
            </div>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">Interactive content placeholder for {content.title}</p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SubjectContent;
