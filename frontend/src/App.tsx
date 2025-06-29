import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import UserTypes from './components/UserTypes';
import HowItWorks from './components/HowItWorks';
import Features from './components/Features';
import Testimonials from './components/Testimonials';
import About from './components/About';
import Footer from './components/Footer';
import ChatPage from './pages/ChatPage';
import AuthPage from './components/auth/AuthPage';
import DashboardLayout from './components/dashboard/DashboardLayout';
import Dashboard from './components/dashboard/Dashboard';
import ResumeBuilder from './components/resume/ResumeBuilder';
import AssessmentCenter from './components/assessments/AssessmentCenter';
import InterviewPrep from './components/interview/InterviewPrep';
import LearningPaths from './components/learning/LearningPaths';
import CareerGoals from './components/goals/CareerGoals';
import PersonalAnalytics from './components/analytics/PersonalAnalytics';
import FloatingChatButton from './components/FloatingChatButton';
import OnboardingFlow from './components/onboarding/OnboardingFlow';
import { ToastContainer } from './components/ui/Toast';
import { useToast } from './hooks/useToast';
import { useKeyboardShortcuts, commonShortcuts } from './hooks/useKeyboardShortcuts';

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
      </main>
      <Footer />
      <FloatingChatButton />
    </>
  );
};

function App() {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const { toasts, removeToast, success } = useToast();

  // Check if user needs onboarding
  useEffect(() => {
    const needsOnboarding = localStorage.getItem('careerwise_needs_onboarding');
    const hasCompletedOnboarding = localStorage.getItem('careerwise_onboarding_completed');
    
    // Show onboarding only if user needs it AND hasn't completed it
    if (needsOnboarding && !hasCompletedOnboarding && window.location.pathname.startsWith('/dashboard')) {
      setShowOnboarding(true);
    }
  }, []);

  // Global keyboard shortcuts
  useKeyboardShortcuts([
    {
      ...commonShortcuts.search,
      callback: () => {
        // This will be handled by the DashboardLayout component
        const event = new CustomEvent('openGlobalSearch');
        window.dispatchEvent(event);
      }
    }
  ]);

  const handleOnboardingComplete = (data: any) => {
    localStorage.setItem('careerwise_onboarding_completed', 'true');
    localStorage.removeItem('careerwise_needs_onboarding'); // Remove the needs onboarding flag
    localStorage.setItem('careerwise_user_profile', JSON.stringify(data));
    setShowOnboarding(false);
    success('Welcome to CareerWise!', 'Your profile has been set up successfully.');
  };

  const handleOnboardingSkip = () => {
    localStorage.setItem('careerwise_onboarding_completed', 'true');
    localStorage.removeItem('careerwise_needs_onboarding'); // Remove the needs onboarding flag
    setShowOnboarding(false);
  };

  if (showOnboarding) {
    return (
      <>
        <OnboardingFlow 
          onComplete={handleOnboardingComplete}
          onSkip={handleOnboardingSkip}
        />
        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </>
    );
  }

  return (
    <Router>
      <div className="min-h-screen bg-white font-sans">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="resume" element={<ResumeBuilder />} />
            <Route path="assessments" element={<AssessmentCenter />} />
            <Route path="interview" element={<InterviewPrep />} />
            <Route path="learning" element={<LearningPaths />} />
            <Route path="goals" element={<CareerGoals />} />
            <Route path="analytics" element={<PersonalAnalytics />} />
            <Route path="profile" element={<div>Profile - Coming Soon</div>} />
            <Route path="settings" element={<div>Settings - Coming Soon</div>} />
          </Route>
        </Routes>
        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </div>
    </Router>
  );
}

export default App;