import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

const botResponses: Record<string, string> = {
  default: "Hi! I'm Wajeeh's AI assistant. I can help you learn about his skills, projects, and experience. What would you like to know?",
  skills: "Wajeeh is skilled in Web Development (React, Next.js, TypeScript), Android Development (Kotlin), and Automation (n8n, workflow automation). He also has experience with Git, APIs, and various databases.",
  projects: "Wajeeh has worked on various projects including E-Commerce Platforms, Task Management Apps, AI Chat Assistants, and Portfolio Websites. Check out the Projects section for more details!",
  experience: "Wajeeh has 3+ years of experience in software development, working on web applications, mobile apps, and automation systems. He's currently pursuing his graduation while working on freelance projects.",
  contact: "You can contact Wajeeh through the Contact section on this website, or reach out via email at wajeeh@example.com. He's always open to new opportunities!",
  services: "Wajeeh offers Web Development, Android App Development, n8n Automation Agents, and Custom Automation Tools. Each service is tailored to meet your specific needs.",
  hello: "Hello! Welcome to Wajeeh's portfolio. How can I assist you today?",
  hi: "Hi there! I'm here to help you learn more about Wajeeh. What would you like to know?",
  help: "I can tell you about Wajeeh's skills, projects, experience, services, or how to contact him. Just ask!",
};

function getBotResponse(input: string): string {
  const lowerInput = input.toLowerCase();
  
  for (const [key, response] of Object.entries(botResponses)) {
    if (lowerInput.includes(key)) {
      return response;
    }
  }
  
  return "I'm not sure about that. You can ask me about Wajeeh's skills, projects, experience, services, or how to contact him.";
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: botResponses.default,
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botMessage: Message = {
        id: messages.length + 2,
        text: getBotResponse(input),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 ${
          isOpen
            ? 'bg-white/10 rotate-90'
            : 'bg-[#2467ec] hover:bg-[#1a5ad1] animate-glow'
        }`}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 z-40 w-80 md:w-96 transition-all duration-500 ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        <div className="glass-strong rounded-3xl overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="bg-[#2467ec] p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="font-semibold text-white">AI Assistant</h4>
              <p className="text-xs text-white/70">Always here to help</p>
            </div>
          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-2 ${
                  message.sender === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.sender === 'bot'
                      ? 'bg-[#2467ec]/20'
                      : 'bg-white/10'
                  }`}
                >
                  {message.sender === 'bot' ? (
                    <Bot className="w-4 h-4 text-[#2467ec]" />
                  ) : (
                    <User className="w-4 h-4 text-white/70" />
                  )}
                </div>
                <div
                  className={`max-w-[75%] p-3 rounded-2xl text-sm ${
                    message.sender === 'bot'
                      ? 'bg-white/5 text-white/90 rounded-tl-none'
                      : 'bg-[#2467ec] text-white rounded-tr-none'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-2">
                <div className="w-8 h-8 rounded-full bg-[#2467ec]/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-[#2467ec]" />
                </div>
                <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-white/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/10">
            <div className="flex gap-2">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type a message..."
                className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-[#2467ec]"
              />
              <Button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="bg-[#2467ec] hover:bg-[#1a5ad1] text-white px-3"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
