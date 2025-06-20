import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-20 lg:pt-24 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-hero-pattern opacity-30 z-0"></div>
      
      {/* Gradient blob */}
      <div className="absolute top-40 right-0 w-96 h-96 bg-primary-200 rounded-full filter blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-0 left-20 w-80 h-80 bg-accent-200 rounded-full filter blur-3xl opacity-20 -z-10"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 md:pb-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-dark-900 mb-6">
            <span className="block">Revolutionizing Career</span>
            <span className="block text-primary-600">Guidance with AI</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 md:mb-12">
            Personalized insights. Smart career decisions. 
            <span className="block mt-1">No overwhelm.</span>
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="/chat" 
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 transition-all duration-300 shadow-sm hover:shadow-md"
            >
              Try the Demo Chatbot
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            
            <a 
              href="#how-it-works" 
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-all duration-300"
            >
              Learn More
            </a>
          </div>
        </div>
        
        {/* Hero image/illustration */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="relative rounded-xl shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-700/80 to-secondary-700/80 mix-blend-multiply"></div>
            <img 
              src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="Career guidance session" 
              className="w-full h-auto object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-md shadow-lg">
                <p className="text-sm font-medium text-dark-800">AI-powered guidance for your career journey</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;