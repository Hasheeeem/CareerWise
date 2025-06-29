import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Menu, Sparkles, ArrowUp, Briefcase, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import ChatSidebar from './ChatSidebar';

interface Message {
  id: string;
  content: string;
  sender_type: 'user' | 'assistant';
  created_at: string;
}

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentChatId, setCurrentChatId] = useState<string>();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [newMessage]);

  // Create conversation on component mount
  useEffect(() => {
    createConversation();
  }, []);

  const createConversation = async () => {
    try {
      // Check if API base URL is configured
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
      if (!apiBaseUrl) {
        console.log('⚠️ No backend API configured, using demo mode');
        setConversationId(`demo-conv-${Date.now()}`);
        return;
      }

      const response = await fetch(`${apiBaseUrl}/api/v1/chat/conversation/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setConversationId(data.conversation_id);
        console.log('✅ Conversation created:', data.conversation_id);
      } else {
        console.log('⚠️ Backend not available, using demo mode');
        setConversationId(`demo-conv-${Date.now()}`);
      }
    } catch (error) {
      console.log('⚠️ Backend not available, using demo mode');
      setConversationId(`demo-conv-${Date.now()}`);
    }
  };

  const sendMessage = async () => {
    if (!newMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: newMessage,
      sender_type: 'user',
      created_at: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    const messageToSend = newMessage;
    setNewMessage('');
    setIsLoading(true);

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
      
      // If no backend API is configured, use demo responses
      if (!apiBaseUrl) {
        setTimeout(() => {
          const demoResponse = generateDemoResponse(messageToSend);
          setMessages(prev => [...prev, demoResponse]);
          setIsLoading(false);
        }, 1500);
        return;
      }

      const response = await fetch(`${apiBaseUrl}/api/v1/chat/simple`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageToSend
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ AI response received:', data);
      
      const aiMessage: Message = {
        id: data.message_id || `ai-${Date.now()}`,
        content: data.response || 'I apologize, but I encountered an issue generating a response. Please try asking your question again.',
        sender_type: 'assistant',
        created_at: new Date().toISOString()
      };

      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      console.log('⚠️ Using demo response due to backend unavailability');
      
      // Provide a helpful demo response instead of an error
      const demoResponse = generateDemoResponse(messageToSend);
      setMessages(prev => [...prev, demoResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateDemoResponse = (userMessage: string): Message => {
    const demoResponses = {
      career: `Great question about "${userMessage}"! I'd be happy to help you with career guidance. Here are some key insights:

🎯 **Career Planning Tips:**
• Identify your core strengths and interests
• Research industry trends and growth opportunities  
• Network with professionals in your target field
• Develop both technical and soft skills

📈 **Next Steps:**
1. Take our career assessment to identify your strengths
2. Explore learning paths in your areas of interest
3. Build a strong professional profile and resume
4. Practice interview skills and networking

What specific aspect of your career would you like to focus on next?`,

      resume: `I can definitely help you improve your resume! Here's a comprehensive guide:

📝 **Resume Optimization:**
• Use a clean, professional format with consistent styling
• Include quantifiable achievements and impact metrics
• Tailor your resume for each specific job application
• Use relevant keywords from the job description

✨ **Key Sections to Include:**
1. **Professional Summary** - 2-3 sentences highlighting your value
2. **Work Experience** - Focus on achievements, not just duties
3. **Skills** - Both technical and soft skills relevant to the role
4. **Education** - Include relevant coursework and projects

Would you like me to review a specific section of your resume or help with a particular industry?`,

      interview: `Excellent! Interview preparation is crucial for career success. Here's my comprehensive guide:

🎤 **Interview Preparation Strategy:**
• Research the company thoroughly (mission, values, recent news)
• Practice common behavioral questions using the STAR method
• Prepare thoughtful questions to ask the interviewer
• Plan your outfit and logistics in advance

💡 **Common Question Categories:**
1. **Behavioral** - "Tell me about a time when..."
2. **Technical** - Role-specific skills and knowledge
3. **Situational** - "How would you handle..."
4. **Cultural Fit** - Values and work style alignment

🚀 **Pro Tips:**
• Practice your elevator pitch
• Prepare specific examples that showcase your skills
• Follow up with a thank-you email within 24 hours

What type of interview are you preparing for?`,

      skills: `Skills development is key to career advancement! Here's how to approach it strategically:

🧠 **Skill Development Framework:**
• **Assess Current Skills** - Identify strengths and gaps
• **Market Research** - What skills are in demand in your field?
• **Learning Plan** - Create a structured approach to skill building
• **Practice & Apply** - Use new skills in real projects

📚 **Learning Resources:**
1. **Online Courses** - Coursera, Udemy, LinkedIn Learning
2. **Certifications** - Industry-recognized credentials
3. **Projects** - Build a portfolio showcasing your abilities
4. **Mentorship** - Learn from experienced professionals

🎯 **Focus Areas:**
• **Technical Skills** - Specific to your industry/role
• **Soft Skills** - Communication, leadership, problem-solving
• **Digital Literacy** - Essential in today's workplace

What specific skills are you looking to develop?`
    };

    // Determine response type based on keywords
    const message = userMessage.toLowerCase();
    let responseType = 'career'; // default

    if (message.includes('resume') || message.includes('cv')) {
      responseType = 'resume';
    } else if (message.includes('interview') || message.includes('preparation')) {
      responseType = 'interview';
    } else if (message.includes('skill') || message.includes('learn') || message.includes('training')) {
      responseType = 'skills';
    }

    return {
      id: `demo-${Date.now()}`,
      content: demoResponses[responseType as keyof typeof demoResponses],
      sender_type: 'assistant',
      created_at: new Date().toISOString()
    };
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setCurrentChatId(undefined);
    createConversation();
    setSidebarOpen(false);
  };

  const handleSelectChat = (chatId: string) => {
    setCurrentChatId(chatId);
    // In a real app, you'd load the chat history here
    setSidebarOpen(false);
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const suggestedPrompts = [
    'What career should I pursue with my skills?',
    'How can I improve my resume for tech roles?',
    'What are the best interview preparation strategies?',
    'How do I negotiate salary effectively?'
  ];

  const isEmptyChat = messages.length === 0;

  return (
    <div className="flex h-screen bg-dark-900 overflow-hidden">
      {/* Responsive Sidebar */}
      <ChatSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        currentChatId={currentChatId}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Fixed Header */}
        <div className="flex-shrink-0 bg-dark-800 border-b border-gray-700 sticky top-0 z-10">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between p-4">
            <div className="flex items-center space-x-3">
              <Link
                to="/dashboard"
                className="p-2 rounded-md hover:bg-gray-700 transition-colors text-white"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <button
                onClick={() => setSidebarOpen(true)}
                className="p-2 rounded-md hover:bg-gray-700 transition-colors text-white"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <Briefcase className="h-6 w-6 text-primary-500" />
              <span className="text-lg font-bold text-white">
                Career<span className="text-primary-500">Wise</span>
              </span>
            </div>
            <div className="w-20" /> {/* Spacer for balance */}
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:flex items-center justify-between p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">CareerWise AI Assistant</h1>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-400">Online</span>
                </div>
              </div>
            </div>
            <Link
              to="/dashboard"
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Chat Messages - Scrollable */}
        <div className="flex-1 overflow-y-auto">
          {isEmptyChat ? (
            // Welcome Screen
            <div className="h-full flex flex-col items-center justify-center px-4 text-center">
              <div className="max-w-2xl mx-auto">
                <div className="mb-8">
                  <div className="w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <h1 className="text-2xl md:text-4xl font-bold text-white mb-4">
                    How can I help you today?
                  </h1>
                  <p className="text-gray-400 text-base md:text-lg">
                    I'm CareerWise AI, your personal career guidance assistant. Ask me anything about your career journey.
                  </p>
                </div>

                {/* Suggested Prompts */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                  {suggestedPrompts.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => setNewMessage(prompt)}
                      className="p-4 bg-gray-800 hover:bg-gray-700 rounded-lg border border-gray-700 hover:border-gray-600 transition-all text-left group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-white text-sm">{prompt}</span>
                        <ArrowUp className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // Messages
            <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
              {messages.map((message) => (
                <div key={message.id} className="flex items-start space-x-4">
                  {/* Avatar */}
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.sender_type === 'user' 
                      ? 'bg-primary-600' 
                      : 'bg-gray-700'
                  }`}>
                    {message.sender_type === 'user' ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Bot className="h-4 w-4 text-white" />
                    )}
                  </div>

                  {/* Message Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-medium text-white">
                        {message.sender_type === 'user' ? 'You' : 'CareerWise'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatTime(message.created_at)}
                      </span>
                    </div>
                    <div className="prose prose-invert max-w-none">
                      <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                        {message.content}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {/* Loading indicator */}
              {isLoading && (
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-medium text-white">CareerWise</span>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Fixed Input Area */}
        <div className="flex-shrink-0 border-t border-gray-700 bg-dark-800">
          <div className="max-w-4xl mx-auto p-4">
            <div className="relative">
              <textarea
                ref={textareaRef}
                placeholder="Message CareerWise..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
                rows={1}
                className="w-full resize-none bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50 max-h-32"
                style={{ minHeight: '48px' }}
              />
              <button
                onClick={sendMessage}
                disabled={!newMessage.trim() || isLoading}
                className="absolute right-2 bottom-2 p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            
            <div className="mt-2 text-center">
              <p className="text-xs text-gray-500">
                CareerWise can make mistakes. Consider checking important information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;