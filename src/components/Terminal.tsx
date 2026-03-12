import { useState, useRef, useEffect } from 'react';
import { X, Terminal as TerminalIcon } from 'lucide-react';

interface Command {
  input: string;
  output: string;
}

const commands: Record<string, string> = {
  help: `Available commands:
  • help        - Show this help message
  • about       - Learn about Wajeeh
  • skills      - View technical skills
  • projects    - List projects
  • contact     - Get contact information
  • experience  - View work experience
  • services    - List services offered
  • clear       - Clear terminal`,
  
  about: `Name: Wajeeh Ul Hassan
Role: Web Developer | Android Developer | Automation Specialist
Location: Available Worldwide
Status: Open to Work

A passionate developer crafting digital experiences with expertise in 
web development, mobile applications, and intelligent automation systems.`,
  
  skills: `Technical Skills:

Frontend:
  • HTML/CSS     ████████████████████ 95%
  • JavaScript   ███████████████████░ 88%
  • React        ██████████████████░░ 85%

Development:
  • Android      █████████████████░░░ 82%
  • APIs         ███████████████████░ 88%
  • Git          ███████████████████░ 85%

Automation:
  • n8n          ████████████████████ 90%
  • Workflows    ███████████████████░ 87%
  • AI Tools     █████████████████░░░ 80%`,
  
  projects: `Featured Projects:

1. E-Commerce Platform
   Full-featured online store with payment integration
   
2. Task Management App
   Collaborative project management tool
   
3. AI Chat Assistant
   Intelligent chatbot with NLP capabilities
   
4. Portfolio Website
   Modern responsive portfolio with animations

Type 'projects' on the main site to see more details.`,
  
  contact: `Contact Information:

Email:    wajeeh@example.com
GitHub:   github.com/wajeeh
LinkedIn: linkedin.com/in/wajeeh

Availability: Open to new opportunities
Response Time: Within 24 hours`,
  
  experience: `Experience Timeline:

2021 - Started Programming Journey
       Learned web development fundamentals

2022 - Android Development
       Built native Android applications

2023 - Automation & n8n
       Created intelligent workflows

2024 - Currently Pursuing Graduation
       Working on real-world projects`,
  
  services: `Services Offered:

• Web Development
  Modern, responsive web applications

• Android App Development
  Native mobile applications

• n8n Automation Agents
  Intelligent workflow automation

• Custom Automation Tools
  Bespoke automation solutions

Contact for pricing and availability.`,
  
  clear: 'CLEAR',
};

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Terminal({ isOpen, onClose }: TerminalProps) {
  const [commandHistory, setCommandHistory] = useState<Command[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    // Scroll to bottom on new commands
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  const executeCommand = (input: string) => {
    const trimmedInput = input.trim().toLowerCase();
    
    if (trimmedInput === 'clear') {
      setCommandHistory([]);
      return;
    }

    const output = commands[trimmedInput] || `Command not found: ${input}\nType 'help' for available commands.`;
    
    setCommandHistory((prev) => [...prev, { input, output }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentInput.trim()) return;
    
    executeCommand(currentInput);
    setCurrentInput('');
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const inputs = commandHistory.map((c) => c.input);
      if (historyIndex < inputs.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCurrentInput(inputs[inputs.length - 1 - newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        const inputs = commandHistory.map((c) => c.input);
        setCurrentInput(inputs[inputs.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setCurrentInput('');
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-3xl bg-[#0a0a0a] rounded-xl overflow-hidden border border-white/10 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#1a1a1a] border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ef4444]" />
              <div className="w-3 h-3 rounded-full bg-[#f59e0b]" />
              <div className="w-3 h-3 rounded-full bg-[#10b981]" />
            </div>
            <div className="flex items-center gap-2 ml-4">
              <TerminalIcon className="w-4 h-4 text-white/50" />
              <span className="text-sm text-white/70 font-mono">wajeeh@portfolio:~</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/50 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Terminal Content */}
        <div
          ref={terminalRef}
          className="h-96 overflow-y-auto p-4 font-mono text-sm"
        >
          {/* Welcome Message */}
          <div className="mb-4">
            <p className="text-[#10b981]">
              Welcome to Wajeeh's Portfolio Terminal v1.0
            </p>
            <p className="text-white/50">
              Type 'help' to see available commands. Press ESC to close.
            </p>
          </div>

          {/* Command History */}
          {commandHistory.map((command, index) => (
            <div key={index} className="mb-4">
              <div className="flex items-center gap-2 text-white/70">
                <span className="text-[#2467ec]">➜</span>
                <span className="text-[#8b5cf6]">~</span>
                <span>{command.input}</span>
              </div>
              <div className="mt-1 text-white/80 whitespace-pre-line">
                {command.output}
              </div>
            </div>
          ))}

          {/* Input Line */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <span className="text-[#2467ec]">➜</span>
            <span className="text-[#8b5cf6]">~</span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-white outline-none font-mono"
              placeholder="Type a command..."
              autoFocus
            />
            <span className="terminal-cursor w-2 h-5 bg-white/70" />
          </form>
        </div>
      </div>
    </div>
  );
}
