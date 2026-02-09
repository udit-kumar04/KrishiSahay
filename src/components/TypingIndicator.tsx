const TypingIndicator = () => (
  <div className="flex gap-3 animate-fade-in-up">
    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
      <span className="text-sm">🌿</span>
    </div>
    <div className="chat-bubble-ai rounded-2xl px-4 py-3 flex items-center gap-1.5">
      <div className="w-2 h-2 rounded-full bg-primary typing-dot" />
      <div className="w-2 h-2 rounded-full bg-primary typing-dot" />
      <div className="w-2 h-2 rounded-full bg-primary typing-dot" />
    </div>
  </div>
);

export default TypingIndicator;
