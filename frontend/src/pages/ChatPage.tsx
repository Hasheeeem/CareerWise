import React from 'react';
import ChatInterface from '../components/ChatInterface';

const ChatPage: React.FC = () => {
  return (
    <div className="h-screen overflow-hidden">
      <ChatInterface />
    </div>
  );
};

export default ChatPage;