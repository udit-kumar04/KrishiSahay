import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import ChatInterface from "@/components/ChatInterface";

const Index = () => {
  const [showChat, setShowChat] = useState(false);

  if (showChat) {
    return (
      <div className="h-screen flex flex-col bg-background">
        <ChatInterface />
      </div>
    );
  }

  return <HeroSection onStart={() => setShowChat(true)} />;
};

export default Index;
