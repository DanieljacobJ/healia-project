import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, User, Bot, Loader2 } from "lucide-react";
import HealiaHeader from "@/components/HealiaHeader";
import HealiaFooter from "@/components/HealiaFooter";

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const TelemedicineChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! I am Healia, your personal AI health assistant. How can I help you today?", sender: 'bot' },
  ]);
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;

    const userMessage = input.trim();
    const newUserMessage: Message = { text: userMessage, sender: 'user' };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Send the message to your Flask backend
      const response = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botResponseText = data.response;

      const newBotMessage: Message = { text: botResponseText, sender: 'bot' };
      setMessages(prev => [...prev, newBotMessage]);

    } catch (error) {
      console.error("Failed to send message:", error);
      const errorMessage: Message = { text: "Sorry, I am unable to connect to my service right now. Please try again later.", sender: 'bot' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <HealiaHeader />
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="container mx-auto max-w-3xl flex flex-col h-full">
          <Card className="flex-1 flex flex-col p-4 shadow-lg rounded-xl">
            <CardContent className="flex-1 overflow-y-auto p-0">
              <div className="flex flex-col space-y-4 pt-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex items-start ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`p-4 rounded-3xl max-w-[80%] md:max-w-[70%]
                      ${msg.sender === 'user' 
                        ? 'bg-blue-500 text-white rounded-br-none' 
                        : 'bg-gray-200 text-gray-800 rounded-bl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="p-4 rounded-3xl bg-gray-200 rounded-bl-none">
                      <Loader2 className="h-5 w-5 animate-spin text-gray-500" />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
            </CardContent>

            <form onSubmit={handleSendMessage} className="mt-6 flex gap-3">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                rows={1}
                className="flex-1 min-h-[40px] resize-none"
              />
              <Button type="submit" disabled={isLoading || input.trim() === ''}>
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </Card>
        </div>
      </main>
      <HealiaFooter />
    </div>
  );
};

export default TelemedicineChat;
