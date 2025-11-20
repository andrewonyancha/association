'use client';

import { useState, useEffect, useRef, useContext } from 'react';
import { ForwarderContext } from '../context/context_forwarder';
import { Send, Plus } from 'lucide-react';

export default function FindForwarder() {
  const context = useContext(ForwarderContext);
  const inputRef = useRef<HTMLInputElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  if (!context) return null;

  const { onSent, setInput, input, showResult, recentPrompt, resultData, loading } = context;

 

  useEffect(() => {
    messagesContainerRef.current?.scrollTo({
      top: messagesContainerRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [resultData, loading, showResult]);

  const handleSend = () => {
    const value = input.trim();
    if (!value) return;
    onSent(value);
    setInput('');
  };

  return (
    <div className="flex h-screen">

      {/* Sidebar - ONLY visible on desktop (lg and up) */}
      <div className="hidden lg:flex w-72 bg-purple-950 border-b border-gray-500 text-white flex-col">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-semibold">Chat History</h2>
        </div>

        <div className="p-4">
          <button className="w-full flex items-center justify-center gap-2 bg-white text-gray-900 rounded-xl py-3 font-medium hover:bg-gray-100 transition">
            <Plus className="w-5 h-5" />
            New Chat
          </button>
        </div>

       
      </div>

      {/* MAIN CHAT AREA - takes full width on mobile */}
      <div className="flex-1 flex flex-col">

        {/* Messages */}
        <div
          ref={messagesContainerRef}
          className="flex-1 overflow-y-auto bg-white px-4 pt-0 pb-1"
        >
          <div className="max-w-4xl mx-auto space-y-0">

            {/* Welcome screen */}
            {!showResult && (
              <div className="text-center ">
                <div className="w-10 h-10 bg-purple-950 flex items-center justify-center text-white text-4xl font-bold rounded-full mx-auto mb-0">
                  AI
                </div>
                <h1 className="text-4xl font-bold text-purple-900 mb-0">
                  Freight Forwarder Assistant
                </h1>
                <p className="text-xl text-gray-600">
                  Ask me anything about verified forwarders worldwide
                </p>
              </div>
            )}

            {/* User message */}
            {showResult && recentPrompt && (
              <div className="flex justify-end">
                <div className="py-2 text-black px-6 py-0  max-w-2xl">
                  {recentPrompt}
                </div>
              </div>
            )}

            {/* AI response */}
            {showResult && (
              <div className="bg-purple-50 rounded-2xl p-3 border border-purple-200">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-purple-900 rounded-full flex items-center justify-center text-white font-bold">
                    AI
                  </div>
                  <span className="font-semibold">Forwarder Assistant</span>
                </div>

                {loading ? (
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" />
                    <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce delay-100" />
                    <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce delay-200" />
                  </div>
                ) : (
                  <div
                    className="prose prose-lg max-w-none text-sm text-black"
                    dangerouslySetInnerHTML={{ __html: resultData }}
                  />
                )}
              </div>
            )}
          </div>
        </div>

        {/* Sticky Input */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 shadow-2xl z-30">
          <div className="max-w-4xl mx-auto px-6 py-6">
            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                placeholder="Ask about forwarders in any country..."
                className="w-full px-6 py-5 pr-20 bg-purple-100 rounded-full focus:outline-none focus:ring focus:ring-purple-300 focus:bg-white transition-all text-lg placeholder-gray-500"
                autoFocus
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-14 h-14 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white rounded-full flex items-center justify-center transition shadow-lg"
              >
                <Send className="w-6 h-6" />
              </button>
            </div>
          </div>
          <div className="h-env(safe-area-inset-bottom)" />
        </div>
      </div>
    </div>
  );
}