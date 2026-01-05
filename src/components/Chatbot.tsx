import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { chatWithGroq, isGroqAvailable } from '@/lib/groq-api';
import { formatKnowledgeBase } from '@/lib/knowledge-base';
import { getRuleBasedResponse, shouldUseRuleBased } from '@/lib/chatbot-config';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: "Hello🍺! I'm here to help with questions about our hours, menu, events, reservations, or anything else. What can I help you with today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const reducedMotion = useReducedMotion();

  // Sample questions to show before conversation starts
  const sampleQuestions = [
    "Do you have any events tonight?",
    "What beers do you have on tap?",
    "How do I make a reservation?",
  ];

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
    }
  }, [messages, isOpen, reducedMotion]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Mark as read when chat opens
  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
    }
  }, [isOpen]);

  const handleSendMessage = async (message: string) => {
    if (!message.trim() || isTyping) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: message.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      let response: string;
      const knowledgeBase = formatKnowledgeBase();

      // Check if we should use rule-based or AI
      const useRuleBased = shouldUseRuleBased(message) || !isGroqAvailable();

      if (useRuleBased) {
        // Use rule-based response
        const ruleResponse = getRuleBasedResponse(message);
        response = ruleResponse.response;
        
        // Handle actions (scroll, call, email)
        if (ruleResponse.action) {
          setTimeout(() => {
            if (ruleResponse.action?.type === 'scroll') {
              const element = document.querySelector(ruleResponse.action.value);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setIsOpen(false);
              }
            } else if (ruleResponse.action?.type === 'call') {
              window.location.href = `tel:${ruleResponse.action.value}`;
            } else if (ruleResponse.action?.type === 'email') {
              window.location.href = `mailto:${ruleResponse.action.value}`;
            }
          }, 500);
        }
      } else {
        // Use Groq API
        const conversationHistory: Array<{ role: 'user' | 'assistant'; content: string }> = 
          messages
            .filter(m => m.role !== 'assistant' || m.id !== 'welcome')
            .map(m => ({ role: m.role, content: m.content }))
            .slice(-10); // Keep last 10 messages for context

        response = await chatWithGroq(
          [...conversationHistory, { role: 'user', content: message.trim() }],
          knowledgeBase
        );
      }

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      
      // Fallback to rule-based response on error
      const fallbackResponse = getRuleBasedResponse(message);
      const errorMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: `${fallbackResponse.response}\n\n(Note: AI service temporarily unavailable, but I can still help with basic questions!)`,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      handleSendMessage(inputValue);
    }
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setHasUnread(false);
    }
  };

  const handleSampleQuestionClick = (question: string) => {
    setInputValue(question);
    // Focus the input after setting the value
    setTimeout(() => {
      inputRef.current?.focus();
    }, 50);
  };

  // Check if we should show sample questions (only welcome message exists)
  const showSampleQuestions = messages.length === 1 && messages[0].id === 'welcome';

  // Show unread badge when message received while closed
  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage.role === 'assistant' && lastMessage.id !== 'welcome') {
        setHasUnread(true);
      }
    }
  }, [messages, isOpen]);

  return (
    <>
      {/* Floating Chat Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-[9999]"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 200, damping: 20 }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={handleToggle}
            size="lg"
            className="h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 relative"
            aria-label="Open chat"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6" />
                </motion.div>
              ) : (
                <motion.div
                  key="open"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <MessageCircle className="h-6 w-6" />
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Unread Badge */}
            {hasUnread && !isOpen && (
              <motion.div
                className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 15 }}
              >
                <span className="text-xs font-bold text-white">!</span>
              </motion.div>
            )}
          </Button>
        </motion.div>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-24 right-6 z-[9998] w-[90vw] max-w-md h-[600px] max-h-[80vh] bg-background border border-border rounded-lg shadow-2xl flex flex-col overflow-hidden"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className="bg-primary/10 border-b border-border p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-primary/20 p-2 rounded-lg">
                  <Bot className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Golden Barrel Assistant</h3>
                  <p className="text-xs text-muted-foreground">
                    {isGroqAvailable() ? (
                      <span className="flex items-center gap-1">
                        <Sparkles className="h-3 w-3" />
                        AI Powered
                      </span>
                    ) : (
                      'Online'
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`flex items-start space-x-3 ${
                    message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-primary/20 text-primary'
                    }`}
                  >
                    {message.role === 'user' ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <Bot className="h-4 w-4" />
                    )}
                  </div>
                  <div
                    className={`flex-1 rounded-lg p-3 max-w-[80%] ${
                      message.role === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background border border-border text-foreground'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Sample Question Bubbles */}
              {showSampleQuestions && (
                <motion.div
                  className="flex flex-wrap gap-2 mt-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  {sampleQuestions.map((question, index) => (
                    <motion.button
                      key={index}
                      onClick={() => handleSampleQuestionClick(question)}
                      className="px-3 py-2 text-xs lg:text-sm bg-background border border-border rounded-full text-foreground hover:bg-primary/10 hover:border-primary/50 transition-colors duration-200 text-left"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.05, duration: 0.2 }}
                    >
                      {question}
                    </motion.button>
                  ))}
                </motion.div>
              )}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  className="flex items-start space-x-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="bg-background border border-border rounded-lg p-3">
                    <div className="flex space-x-1">
                      <motion.div
                        className="w-2 h-2 bg-primary rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-primary rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-primary rounded-full"
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="border-t border-border p-4 bg-background">
              <div className="flex space-x-2">
                <Input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-background border-border"
                  disabled={isTyping}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!inputValue.trim() || isTyping}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                  Powered by AI 
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;

