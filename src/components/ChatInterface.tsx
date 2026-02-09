import { useState, useRef, useEffect, useCallback } from "react";
import { Send, ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import ChatBubble from "@/components/ChatBubble";
import TypingIndicator from "@/components/TypingIndicator";
import LanguageSelector from "@/components/LanguageSelector";
import { ChatMessage, streamChat } from "@/lib/chat-service";
import { QUICK_PROMPTS, TOPIC_CARDS, LanguageCode } from "@/lib/constants";

const ChatInterface = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<LanguageCode>("auto");
  const [pendingImage, setPendingImage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be under 5MB");
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setPendingImage(reader.result as string);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const sendMessage = async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText && !pendingImage) return;

    const userMsg: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: messageText || "Please analyze this plant image for any diseases or issues.",
      image: pendingImage || undefined,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setPendingImage(null);
    setIsLoading(true);

    // Build API messages
    const apiMessages = [...messages, userMsg].map((m) => {
      if (m.image) {
        return {
          role: m.role,
          content: [
            { type: "text" as const, text: m.content },
            { type: "image_url" as const, image_url: { url: m.image } },
          ],
        };
      }
      return { role: m.role, content: m.content };
    });

    let assistantSoFar = "";
    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant") {
          return prev.map((m, i) =>
            i === prev.length - 1 ? { ...m, content: assistantSoFar } : m
          );
        }
        return [...prev, { id: crypto.randomUUID(), role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      await streamChat({
        messages: apiMessages,
        language,
        onDelta: upsertAssistant,
        onDone: () => setIsLoading(false),
        onError: (msg) => {
          toast.error(msg);
          setIsLoading(false);
        },
      });
    } catch {
      toast.error("Failed to get response. Please try again.");
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
        <div className="flex items-center gap-2">
          <span className="text-xl">🌾</span>
          <h2 className="font-display text-lg font-bold text-foreground">KrishiSahay</h2>
        </div>
        <LanguageSelector value={language} onChange={setLanguage} />
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-6 py-8">
            <div className="text-center space-y-2">
              <p className="text-2xl">🌱</p>
              <h3 className="font-display text-xl font-bold text-foreground">
                Your AI-Powered Agricultural Companion
              </h3>
              <p className="text-sm text-muted-foreground max-w-md">
                Get instant answers about crops, pests, fertilizers, & government schemes — even in low-connectivity environments.
              </p>
            </div>

            <div className="w-full max-w-lg">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 text-center">How Can We Help?</p>
              <div className="grid grid-cols-2 gap-2">
                {TOPIC_CARDS.map((t) => (
                  <button
                    key={t.title}
                    onClick={() => sendMessage(t.prompt)}
                    className="text-left p-3 rounded-xl border border-border bg-card hover:bg-muted transition-colors"
                  >
                    <span className="text-lg">{t.emoji}</span>
                    <p className="font-semibold text-sm text-foreground mt-1">{t.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{t.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full max-w-lg">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 text-center">Quick Questions</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {QUICK_PROMPTS.map((p) => (
                  <button
                    key={p.text}
                    onClick={() => sendMessage(p.text)}
                    className="text-left px-3 py-2.5 rounded-xl border border-border bg-card hover:bg-muted transition-colors text-sm"
                  >
                    <span className="mr-2">{p.emoji}</span>
                    {p.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}

        {isLoading && messages[messages.length - 1]?.role === "user" && (
          <TypingIndicator />
        )}
      </div>

      {/* Image preview */}
      {pendingImage && (
        <div className="px-4 py-2 border-t border-border bg-card">
          <div className="relative inline-block">
            <img src={pendingImage} alt="Upload preview" className="h-16 rounded-lg object-cover" />
            <button
              onClick={() => setPendingImage(null)}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center"
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-border bg-card">
        <div className="flex gap-2 items-end">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          <Button
            variant="outline"
            size="icon"
            className="flex-shrink-0 h-10 w-10"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
          >
            <ImagePlus className="h-4 w-4" />
          </Button>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about crops, pests, schemes... (type in any language)"
            className="min-h-[40px] max-h-[120px] resize-none bg-background"
            rows={1}
          />
          <Button
            onClick={() => sendMessage()}
            disabled={isLoading && !input.trim() && !pendingImage}
            className="flex-shrink-0 h-10 w-10 gradient-primary text-primary-foreground"
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
