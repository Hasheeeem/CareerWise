import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import UserTypes from './components/UserTypes';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Footer from './components/Footer';
import ChatbotDemo from './components/ChatbotDemo';
import ChatPage from './pages/ChatPage';

// Landing Page Component
const LandingPage: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <UserTypes />
        <HowItWorks />
        <Features />
        <Testimonials />
        <About />
        <ChatbotDemo />
      </main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white font-sans">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;