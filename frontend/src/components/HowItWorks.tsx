import React from 'react';
import { Target, MessageSquare, FileText } from 'lucide-react';

interface StepProps {
  icon: React.ReactNode;
  number: number;
  title: string;
  description: string;
}

const Step: React.FC<StepProps> = ({ icon, number, title, description }) => {
  return (
    <div className="relative">
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mb-4 relative">
          {icon}
          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary-600 text-white flex items-center justify-center text-sm font-bold">
            {number}
          </div>
        </div>
        <h3 className="text-xl font-semibold text-dark-900 mb-2">{title}</h3>
        <p className="text-gray-600 max-w-xs mx-auto">{description}</p>
      </div>
    </div>
  );
};

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">
            How CareerWise Works
          </h2>
          <p className="text-xl text-gray-600">
            Our AI-powered platform simplifies career guidance into three easy steps
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-20 left-1/4 right-1/4 h-0.5 bg-gray-200 z-0"></div>
          
          <Step
            icon={<Target className="h-6 w-6 text-primary-600" />}
            number={1}
            title="Choose Your Goal"
            description="Select your career stage and define what you're looking to achieve."
          />
          
          <Step
            icon={<MessageSquare className="h-6 w-6 text-primary-600" />}
            number={2}
            title="Chat with Our AI"
            description="Engage with our AI assistant to discuss your background, skills, and aspirations."
          />
          
          <Step
            icon={<FileText className="h-6 w-6 text-primary-600" />}
            number={3}
            title="Get Personalized Roadmap"
            description="Receive a customized action plan with practical steps to achieve your career goals."
          />
        </div>
        
        {/* Visual Demo */}
        <div className="mt-16 max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg">
          <div className="relative">
            <img 
              src="https://images.pexels.com/photos/3127880/pexels-photo-3127880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              alt="CareerWise platform demonstration" 
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-900/70 via-transparent to-transparent flex items-center">
              <div className="px-8 py-6">
                <h3 className="text-2xl font-bold text-white mb-2">Personalized Career Insights</h3>
                <p className="text-white/90 max-w-md">
                  Our AI analyzes thousands of career paths to provide guidance that's tailored to your unique situation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;