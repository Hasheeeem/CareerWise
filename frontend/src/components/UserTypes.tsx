import React from 'react';
import { GraduationCap, Users, Briefcase, Lightbulb, ArrowRight } from 'lucide-react';

interface UserTypeCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const UserTypeCard: React.FC<UserTypeCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
      <div className="p-6">
        <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-4 group-hover:bg-primary-200 transition-colors duration-300">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-dark-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <a 
          href="#" 
          className="inline-flex items-center text-primary-600 font-medium hover:text-primary-700 transition-colors group-hover:underline"
        >
          Get Started
          <ArrowRight className="ml-1 h-4 w-4" />
        </a>
      </div>
    </div>
  );
};

const UserTypes: React.FC = () => {
  return (
    <section id="user-types" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">
            Tailored Guidance for Every Career Stage
          </h2>
          <p className="text-xl text-gray-600">
            Personalized support whether you're just starting out or looking to advance
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <UserTypeCard
            icon={<GraduationCap className="h-6 w-6 text-primary-600" />}
            title="High School Student"
            description="Explore potential career paths and educational requirements to prepare for your future."
          />
          
          <UserTypeCard
            icon={<Users className="h-6 w-6 text-primary-600" />}
            title="Graduating Student"
            description="Navigate the transition from education to employment with confidence and clarity."
          />
          
          <UserTypeCard
            icon={<Briefcase className="h-6 w-6 text-primary-600" />}
            title="Working Professional"
            description="Advance your career, change paths, or find new opportunities that match your skills."
          />
          
          <UserTypeCard
            icon={<Lightbulb className="h-6 w-6 text-primary-600" />}
            title="Aspiring Entrepreneur"
            description="Turn your ideas into reality with guidance on starting and growing your business."
          />
        </div>
      </div>
    </section>
  );
};

export default UserTypes;