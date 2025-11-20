'use client';
import { useState, useEffect, useCallback, useRef, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Context } from '../context/context';

const MainAi: React.FC = () => {
  const context = useContext(Context);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [mounted, setMounted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  if (!context) return null;
  
  const { onSent, setInput, input, showResult, recentPrompt, resultData, loading } = context;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll to bottom when new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [resultData, loading, showResult]);

  const handleSubmit = useCallback(() => {
    const currentInput = inputRef.current?.value.trim() || input.trim();
    if (!currentInput) return;
    
    onSent(currentInput);
    if (inputRef.current) inputRef.current.value = '';
  }, [onSent, input]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSubmit();
  }, [handleSubmit]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  }, [setInput]);

  const toggleWidget = useCallback(() => {
    setIsHidden(!isHidden);
  }, [isHidden]);

  const toggleExpand = useCallback(() => {
    setIsExpanded(!isExpanded);
  }, [isExpanded]);

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const widgetVariants: any = {
    hidden: { 
      scale: 0.8, 
      opacity: 0,
      x: -50,
      y: 50
    },
    visible: { 
      scale: 1, 
      opacity: 1,
      x: 0,
      y: 0,
      transition: { type: "spring" as any, stiffness: 400, damping: 25 }
    }
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  if (!mounted) {
    return (
      <button 
        className="fixed bottom-5 left-5 w-12 h-12 bg-orange-600 rounded-full shadow-lg z-40"
        aria-label="AI Assistant"
      />
    );
  }

  return (
    <>
      <AnimatePresence>
        {!isHidden && (
          <motion.div
            className="fixed inset-0 bg-black/30 z-40"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={toggleWidget}
          />
        )}
      </AnimatePresence>

      {/* Always positioned at bottom left */}
      <div className="fixed md:bottom-5 bottom-5 md:left-5 left-1 z-50">
        {isHidden ? (
          <motion.button
            className="w-12 h-12 bg-gradient-to-br from-orange-600 to-orange-600 rounded-full shadow-lg flex items-center justify-center relative group"
            onClick={toggleWidget}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            aria-label="Open AI Assistant"
            initial={{ scale: 1 }}
            animate={{ scale: 1 }}
          >
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center text-orange-600 font-bold text-sm">
              Ask
            </div>
            
            {/* Animated ping effect */}
            <div className="absolute inset-0 rounded-full bg-orange-600 animate-ping opacity-20" />
            
            {/* Tooltip */}
            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
              Ask AI Assistant
            </div>
          </motion.button>
        ) : (
          <motion.div
            className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 flex flex-col"
            style={{
              width: isExpanded ? '90vw' : 'min(90vw, 400px)',
              maxWidth: isExpanded ? '1200px' : '400px',
              height: isExpanded ? '80vh' : '500px',
            }}
            variants={widgetVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-600 to-orange-600 px-4 py-3 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AI</span>
                </div>
                <span className="text-white font-medium text-sm">AI Assistant</span>
              </div>
              
              <div className="flex items-center gap-1">
                <button
                  className="w-7 h-7 text-white/80 hover:text-white transition-colors flex items-center justify-center"
                  onClick={toggleExpand}
                  aria-label={isExpanded ? "Minimize" : "Expand"}
                >
                  {isExpanded ? '−' : '+'}
                </button>
                <button
                  className="w-7 h-7 text-white/80 hover:text-white transition-colors flex items-center justify-center"
                  onClick={toggleWidget}
                  aria-label="Close"
                >
                  ×
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4">
              {showResult ? (
                <div className="space-y-4">
                  {/* User Message */}
                  {recentPrompt && recentPrompt !== 'hello' && (
                    <div className="flex gap-3 items-start">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-orange-600 font-bold text-sm">U</span>
                      </div>
                      <div className="bg-gray-100 rounded-lg px-3 py-2 max-w-[80%]">
                        <p className="text-gray-800 text-sm">{recentPrompt}</p>
                      </div>
                    </div>
                  )}
                  
                  {/* AI Response */}
                  <div className="flex gap-3 items-start">
                    <div className="w-8 h-8 bg-orange-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">AI</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      {loading ? (
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-2 h-2 bg-orange-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                      ) : (
                        <div 
                          className="prose prose-sm max-w-none text-gray-800"
                          dangerouslySetInnerHTML={{ __html: resultData }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* Welcome Message */
                <div className="h-full flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto">
                      <span className="text-orange-600 font-bold text-lg">AI</span>
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-800 font-medium text-lg">
                        How can I help you today?
                      </p>
                      <p className="text-gray-500 text-sm">
                        Ask me anything - I'm here to help!
                      </p>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-100 flex-shrink-0">
              <div className="relative flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className="w-full px-4 py-3 pr-12 bg-gray-50 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white text-sm border border-gray-200 transition-all"
                  aria-label="Type your message"
                />
                <button
                  className="absolute right-2 w-8 h-8 bg-orange-600 text-white rounded-lg flex items-center justify-center hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  onClick={handleSubmit}
                  disabled={!input.trim() && !inputRef.current?.value.trim()}
                  aria-label="Send message"
                >
                  ↗
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default MainAi;