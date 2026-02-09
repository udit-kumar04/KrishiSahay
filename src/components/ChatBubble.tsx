import ReactMarkdown from "react-markdown";
import { Leaf, User } from "lucide-react";
import { ChatMessage } from "@/lib/chat-service";

interface ChatBubbleProps {
  message: ChatMessage;
}

const ChatBubble = ({ message }: ChatBubbleProps) => {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex gap-3 animate-fade-in-up ${isUser ? "flex-row-reverse" : ""}`}
    >
      <div
        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? "gradient-primary" : "bg-secondary"
        }`}
      >
        {isUser ? (
          <User className="w-4 h-4 text-primary-foreground" />
        ) : (
          <Leaf className="w-4 h-4 text-secondary-foreground" />
        )}
      </div>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser ? "chat-bubble-user" : "chat-bubble-ai"
        }`}
      >
        {message.image && (
          <img
            src={message.image}
            alt="Uploaded plant"
            className="rounded-lg mb-2 max-h-48 object-cover"
          />
        )}
        <div className="prose prose-sm max-w-none text-foreground prose-headings:text-foreground prose-strong:text-foreground prose-p:text-foreground">
          <ReactMarkdown>{message.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
