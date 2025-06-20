import React, { useState } from 'react';
import { Send, Bot, X } from 'lucide-react';

const ChatbotDemo: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hi there! I\'m the CareerWise AI assistant. How can I help with your career questions today?',
    },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    setMessages([...messages, { sender: 'user', text: inputValue }]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      setMessages(prevMessages => [
        ...prevMessages,
        {
          sender: 'bot',
          text: "I'd be happy to help you explore career options based on your interests and skills. Could you tell me a bit about what fields you're interested in or what skills you'd like to utilize in your career?",
        },
      ]);
    }, 1000);
  };

  return (
    <section id="demo" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">
            Try Our Demo Chatbot
          </h2>
          <p className="text-xl text-gray-600">
            Experience the power of AI career guidance with our interactive demo
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto relative">
          <div className="bg-gradient-to-br from-primary-700 to-secondary-800 rounded-xl shadow-xl p-1">
            <div className="bg-white rounded-lg p-6 md:p-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-4">
                  <Bot className="h-5 w-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-dark-900">CareerWise AI Assistant</h3>
                  <p className="text-sm text-gray-600">Online | Demo Version</p>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4 mb-6 h-64 overflow-y-auto">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-4 flex ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-xs md:max-w-sm rounded-lg px-4 py-2 ${
                        message.sender === 'user'
                          ? 'bg-primary-600 text-white rounded-tr-none'
                          : 'bg-gray-200 text-gray-800 rounded-tl-none'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <form onSubmit={handleSubmit} className="flex">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about career paths, skills, or job prospects..."
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="bg-primary-600 text-white px-4 py-2 rounded-r-lg hover:bg-primary-700 transition-colors"
                >
                  <Send className="h-5 w-5" />
                </button>
              </form>
              
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-500">
                  This is a limited demo. For full functionality, sign up for a free account.
                </p>
              </div>
            </div>
          </div>
          
          {/* Floating chatbot button */}
          {!isOpen && (
            <button
              onClick={() => setIsOpen(true)}
              className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-primary-600 text-white flex items-center justify-center shadow-lg hover:bg-primary-700 transition-colors z-50"
            >
              <Bot className="h-6 w-6" />
            </button>
          )}
          
          {/* Floating chatbot */}
          {isOpen && (
            <div className="fixed bottom-6 right-6 w-80 md:w-96 bg-white rounded-lg shadow-2xl z-50 overflow-hidden">
              <div className="bg-primary-600 text-white p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <Bot className="h-5 w-5 mr-2" />
                  <span className="font-medium">CareerWise Assistant</span>
                </div>
                <button onClick={() => setIsOpen(false)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="h-80 overflow-y-auto p-4 bg-gray-50">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`mb-4 flex ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-4 py-2 ${
                        message.sender === 'user'
                          ? 'bg-primary-600 text-white rounded-tr-none'
                          : 'bg-gray-200 text-gray-800 rounded-tl-none'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSubmit} className="p-4 border-t">
                <div className="flex">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Type your question..."
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary-500"
                  />
                  <button
                    type="submit"
                    className="bg-primary-600 text-white px-3 py-2 rounded-r-md hover:bg-primary-700"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ChatbotDemo;