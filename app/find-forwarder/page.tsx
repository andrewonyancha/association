'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BiPaperPlane, BiUser, BiBot } from 'react-icons/bi';
import Typewriter from 'typewriter-effect';

const MainAi: React.FC = () => {
  const [input, setInput] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [recentPrompt, setRecentPrompt] = useState('');
  const [resultData, setResultData] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    const prompt = input;
    setRecentPrompt(prompt);
    setShowResult(true);
    setLoading(true);
    setInput('');

    // TODO: Implement your AI API call here
    // Example: Replace with actual fetch to your backend API
    try {
      // const response = await fetch('/api/chat', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ prompt }),
      // });
      // const data = await response.json();
      // setResultData(data.response || 'Response from AI'); // Adjust based on your API

      // For now, using a dummy response for testing
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay
      setResultData(`This is a dummy response to your query: "${prompt}"`);
    } catch (error) {
      setResultData('Error fetching response. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const chatContainerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-br from-purple-900 to-purple-800 text-white p-6 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-white/20 p-3 rounded-full">
              <BiBot className="h-6 w-6" />
            </div>
            <h1 className="text-2xl font-semibold">AI Assistant</h1>
          </div>
          <p className="text-sm opacity-80">Ask anything, get instant answers</p>
        </div>
      </header>

      {/* Chat Area */}
      <main className="flex-1 max-w-4xl mx-auto w-full p-6 overflow-y-auto">
        <AnimatePresence>
          <motion.div
            className="space-y-6"
            variants={chatContainerVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.3 }}
          >
            {showResult ? (
              <>
                {recentPrompt && recentPrompt !== 'hello' && (
                  <div className="flex gap-4 items-start">
                    <div className="bg-purple-100 p-3 rounded-full flex-shrink-0">
                      <BiUser className="h-5 w-5 text-purple-600" />
                    </div>
                    <div className="bg-white p-4 rounded-lg shadow-sm flex-1">
                      <p className="text-gray-800 font-medium">{recentPrompt}</p>
                    </div>
                  </div>
                )}
                <div className="flex gap-4 items-start">
                  <div className="bg-purple-900 p-3 rounded-full flex-shrink-0">
                    <BiBot className="h-5 w-5 text-white" />
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm flex-1">
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-900 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                        <div className="w-2 h-2 bg-purple-900 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <div className="w-2 h-2 bg-purple-900 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                      </div>
                    ) : (
                      <div
                        className="prose prose-purple max-w-none text-gray-800"
                        dangerouslySetInnerHTML={{ __html: resultData }}
                      />
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div className="h-full flex items-center justify-center py-20">
                <div className="text-center space-y-6">
                  <div className="bg-purple-100 p-6 rounded-full inline-block mx-auto">
                    <BiBot className="h-12 w-12 text-purple-600" />
                  </div>
                  <h2 className="text-3xl font-semibold text-gray-800">
                    How can I assist you today?
                  </h2>
                  <p className="text-lg text-gray-500 max-w-md mx-auto">
                    Type your question below and get intelligent responses instantly.
                  </p>
                  <div className="mt-4 text-gray-600">
                    <Typewriter
                      options={{
                        strings: ['Ask about anything', 'Get expert advice', 'Solve problems quickly'],
                        autoStart: true,
                        loop: true,
                        delay: 50,
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Input Footer */}
      <footer className="bg-white border-t border-gray-200 p-6 shadow-md">
        <div className="max-w-4xl mx-auto relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Type your question here..."
            className="w-full px-6 py-4 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all text-gray-800 placeholder-gray-500"
          />
          <motion.button
            className="absolute right-2 p-3 text-purple-600 hover:text-purple-700 disabled:text-gray-400"
            onClick={handleSubmit}
            disabled={!input.trim()}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <BiPaperPlane size={24} />
          </motion.button>
        </div>
      </footer>
    </div>
  );
};

export default MainAi;