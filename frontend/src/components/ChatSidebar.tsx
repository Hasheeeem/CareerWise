import React, { useState } from 'react';
import { Plus, Search, MessageSquare, Briefcase, Menu, X } from 'lucide-react';

interface ChatHistory {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
}

interface ChatSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
  currentChatId?: string;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  isOpen,
  onToggle,
  onNewChat,
  onSelectChat,
  currentChatId
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock chat history data
  const chatHistory: ChatHistory[] = [
    {
      id: '1',
      title: 'Career Path in Software Engineering',
      lastMessage: 'What programming languages should I focus on?',
      timestamp: '2 hours ago'
    },
    {
      id: '2',
      title: 'Resume Review and Optimization',
      lastMessage: 'How can I improve my resume for tech roles?',
      timestamp: '1 day ago'
    },
    {
      id: '3',
      title: 'Interview Preparation Tips',
      lastMessage: 'What are common behavioral interview questions?',
      timestamp: '3 days ago'
    },
    {
      id: '4',
      title: 'Salary Negotiation Strategies',
      lastMessage: 'How do I negotiate my first job offer?',
      timestamp: '5 days ago'
    },
    {
      id: '5',
      title: 'Career Change to Data Science',
      lastMessage: 'What skills do I need to transition?',
      timestamp: '1 week ago'
    }
  ];

  const filteredChats = chatHistory.filter(chat =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-80 bg-dark-900 text-white z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto border-r border-gray-700
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <Briefcase className="h-6 w-6 text-primary-500" />
            <span className="text-lg font-bold">
              Career<span className="text-primary-500">Wise</span>
            </span>
          </div>
          <button
            onClick={onToggle}
            className="lg:hidden p-1 rounded-md hover:bg-gray-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-4">
          <button
            onClick={onNewChat}
            className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors font-medium"
          >
            <Plus className="h-5 w-5" />
            <span>New chat</span>
          </button>
        </div>

        {/* Search */}
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search your chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto px-2">
          <div className="px-2 pb-2">
            <h3 className="text-sm font-medium text-gray-400 mb-3">
              Recent chats
            </h3>
          </div>
          
          <div className="space-y-1">
            {filteredChats.map((chat) => (
              <button
                key={chat.id}
                onClick={() => onSelectChat(chat.id)}
                className={`w-full text-left p-3 rounded-lg transition-colors group relative ${
                  currentChatId === chat.id
                    ? 'bg-gray-700 border border-gray-600'
                    : 'hover:bg-gray-800 border border-transparent'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <MessageSquare className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-white truncate mb-1">
                      {chat.title}
                    </h4>
                    <p className="text-xs text-gray-400 line-clamp-2 mb-1">
                      {chat.lastMessage}
                    </p>
                    <p className="text-xs text-gray-500">
                      {chat.timestamp}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
          
          {filteredChats.length === 0 && searchQuery && (
            <div className="px-2 py-8 text-center">
              <p className="text-gray-400 text-sm">No chats found matching "{searchQuery}"</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700">
          <div className="text-xs text-gray-400 space-y-1">
            <p>CareerWise AI Assistant</p>
            <p>Powered by advanced AI technology</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatSidebar;