import React from 'react';
import { BrainCircuit, Building, FileEdit, ShieldCheck } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-start p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
      <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-dark-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Features: React.FC = () => {
  return (
    <section id="features" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">
            Powerful Features
          </h2>
          <p className="text-xl text-gray-600">
            Advanced AI technology designed to provide actionable career guidance
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <Feature
            icon={<BrainCircuit className="h-6 w-6 text-primary-600" />}
            title="Real-Time AI Insights"
            description="Access up-to-date career information and personalized recommendations based on current market trends."
          />
          
          <Feature
            icon={<Building className="h-6 w-6 text-primary-600" />}
            title="College and Job Fit"
            description="Find educational programs and job opportunities that align with your skills, interests, and career goals."
          />
          
          <Feature
            icon={<FileEdit className="h-6 w-6 text-primary-600" />}
            title="Resume + LinkedIn Guidance"
            description="Optimize your professional profiles with targeted advice to stand out to recruiters and hiring managers."
          />
          
          <Feature
            icon={<ShieldCheck className="h-6 w-6 text-primary-600" />}
            title="Safe & Trusted Suggestions"
            description="Receive ethical, unbiased career guidance backed by research and industry expertise."
          />
        </div>
        
        {/* Feature highlight */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src="https://images.pexels.com/photos/7654056/pexels-photo-7654056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="AI career analysis" 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-8 md:w-1/2 flex items-center">
                <div>
                  <h3 className="text-2xl font-bold text-dark-900 mb-4">Powered by Advanced AI</h3>
                  <p className="text-gray-600 mb-6">
                    Our platform utilizes cutting-edge machine learning to analyze career patterns and provide personalized recommendations based on your unique profile and goals.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-success-100 flex items-center justify-center mt-1">
                        <div className="h-2 w-2 rounded-full bg-success-600"></div>
                      </div>
                      <span className="ml-2 text-gray-700">Customized career path recommendations</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-success-100 flex items-center justify-center mt-1">
                        <div className="h-2 w-2 rounded-full bg-success-600"></div>
                      </div>
                      <span className="ml-2 text-gray-700">Skill gap analysis and learning resources</span>
                    </li>
                    <li className="flex items-start">
                      <div className="flex-shrink-0 h-5 w-5 rounded-full bg-success-100 flex items-center justify-center mt-1">
                        <div className="h-2 w-2 rounded-full bg-success-600"></div>
                      </div>
                      <span className="ml-2 text-gray-700">Industry-specific insights and trends</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;