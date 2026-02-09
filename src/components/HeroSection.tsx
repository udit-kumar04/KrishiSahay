import { Leaf, MessageSquare, Camera, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

interface HeroSectionProps {
  onStart: () => void;
}

const HeroSection = ({ onStart }: HeroSectionProps) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
          <Leaf className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">AI-Powered Agricultural Assistant</span>
        </div>

        <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground leading-tight">
          Krishi<span className="text-primary">Sahay</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto leading-relaxed">
          Your intelligent farming companion. Get expert advice on crops, identify plant diseases from photos, 
          and learn about government schemes — in your own language.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button
            onClick={onStart}
            size="lg"
            className="gradient-primary text-primary-foreground text-base px-8 h-12 rounded-xl shadow-lg hover:opacity-90 transition-opacity"
          >
            <MessageSquare className="w-5 h-5 mr-2" />
            Start Chatting
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 max-w-lg mx-auto">
          {[
            { icon: MessageSquare, title: "Smart Q&A", desc: "Crop & pest queries" },
            { icon: Camera, title: "Photo Diagnosis", desc: "Identify diseases" },
            { icon: Globe, title: "Multi-language", desc: "Hindi, Hinglish & more" },
          ].map((f) => (
            <div key={f.title} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card/80 backdrop-blur-sm border border-border">
              <f.icon className="w-6 h-6 text-primary" />
              <span className="font-semibold text-sm text-foreground">{f.title}</span>
              <span className="text-xs text-muted-foreground">{f.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
