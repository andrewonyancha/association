'use client';
import React, { useState, useEffect, createContext } from 'react';
import runForwarderChat from "../config/gemini_forwarder"; // Adjust path as needed

interface ForwarderContextState {
  prevPrompts: string[];
  setPrevPrompts: React.Dispatch<React.SetStateAction<string[]>>;
  recentPrompt: string;
  setRecentPrompt: React.Dispatch<React.SetStateAction<string>>;
  showResult: boolean;
  setShowResult: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  resultData: string;
  setResultData: React.Dispatch<React.SetStateAction<string>>;
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  newChat: () => void;
  onSent: (prompt: string) => Promise<void>;
}

export const ForwarderContext = createContext<ForwarderContextState | undefined>(undefined);

interface ForwarderContextProviderProps {
  children: React.ReactNode;
}

const ForwarderContextProvider: React.FC<ForwarderContextProviderProps> = (props) => {
  const [input, setInput] = useState<string>("");
  const [recentPrompt, setRecentPrompt] = useState<string>("");
  const [prevPrompts, setPrevPrompts] = useState<string[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [resultData, setResultData] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const delayPara = (index: number, nextWord: string) => {
    setTimeout(() => {
      setResultData(prev => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(true);
  };

  const onSent = async (prompt: string) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);
  
    try {
      const response = await runForwarderChat(prompt);
      setRecentPrompt(prompt);
      setPrevPrompts(prev => [...prev, prompt]);
  
      const responseArray = response.split("**");
      let formattedResponse = "";
  
      for (let i = 0; i < responseArray.length; i++) {
        formattedResponse += i % 2 === 0 ? responseArray[i] : "<b>" + responseArray[i] + "</b>";
      }
  
      const formattedResponse2 = formattedResponse.split(/\*|\/\/|```/).join("</br>");
      const newResponseArray = formattedResponse2.split(" ");
  
      for (let i = 0; i < newResponseArray.length; i++) {
        const nextWord = newResponseArray[i];
        delayPara(i, nextWord + " ");
      }
    } catch (error) {
      console.error("Error while fetching response: ", error);
      setError("Error occurred while fetching response.");
    }
  
    setLoading(false);
    setInput("");
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedPrevPrompts: string[] = JSON.parse(localStorage.getItem('forwarderPrevPrompts') || '[]');
      const savedRecentPrompt: string = localStorage.getItem('forwarderRecentPrompt') || "";
      const savedShowResult: boolean = localStorage.getItem('forwarderShowResult') === 'true';

      if (savedPrevPrompts.length > 0) {
        setPrevPrompts(savedPrevPrompts);
      }

      if (savedRecentPrompt) {
        setRecentPrompt(savedRecentPrompt);
      }

      setShowResult(savedShowResult);

      onSent("hello");
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('forwarderPrevPrompts', JSON.stringify(prevPrompts));
      localStorage.setItem('forwarderRecentPrompt', recentPrompt);
      localStorage.setItem('forwarderShowResult', showResult.toString());
    }
  }, [prevPrompts, recentPrompt, showResult]);

  const contextValue: ForwarderContextState = {
    prevPrompts,
    setPrevPrompts,
    recentPrompt,
    setRecentPrompt,
    showResult,
    setShowResult,
    loading,
    setLoading,
    resultData,
    setResultData,
    input,
    setInput,
    error,
    setError,
    newChat,
    onSent
  };

  return (
    <ForwarderContext.Provider value={contextValue}>
      {props.children}
    </ForwarderContext.Provider>
  );
};

export default ForwarderContextProvider;