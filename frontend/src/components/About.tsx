import React from 'react';
import { PieChart, TrendingUp, Users, Heart } from 'lucide-react';

interface StatProps {
  icon: React.ReactNode;
  number: string;
  label: string;
}

const Stat: React.FC<StatProps> = ({ icon, number, label }) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center mb-3">
        {icon}
      </div>
      <p className="text-2xl font-bold text-dark-900">{number}</p>
      <p className="text-gray-600">{label}</p>
    </div>
  );
};

const About: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="md:flex items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-12">
              <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">
                About CareerWise
              </h2>
              <p className="text-xl text-gray-600 mb-6">
                Our mission is to democratize career guidance through innovative AI technology
              </p>
              <p className="text-gray-700 mb-6">
                CareerWise was founded with a simple yet powerful vision: to make personalized career guidance accessible to everyone, regardless of their background or resources. We combine cutting-edge artificial intelligence with human expertise to provide accurate, actionable career advice.
              </p>
              <p className="text-gray-700 mb-6">
                Our team includes career counselors, data scientists, and industry professionals who work together to ensure our AI recommendations are grounded in real-world insights and opportunities.
              </p>
              <div className="flex items-center">
                <a
                  href="#"
                  className="text-primary-600 font-medium hover:text-primary-700 hover:underline mr-6"
                >
                  Learn more about our team
                </a>
                <a
                  href="#"
                  className="text-primary-600 font-medium hover:text-primary-700 hover:underline"
                >
                  Our methodology
                </a>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="CareerWise team"
                  className="w-full h-auto"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-dark-900 mb-2">
                    Driven by a passion for helping others succeed
                  </h3>
                  <p className="text-gray-600">
                    Our diverse team combines expertise in career counseling, technology, and data science to create innovative solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            <Stat
              icon={<Users className="h-6 w-6 text-primary-600" />}
              number="50,000+"
              label="Users Helped"
            />
            <Stat
              icon={<PieChart className="h-6 w-6 text-primary-600" />}
              number="250+"
              label="Career Paths"
            />
            <Stat
              icon={<TrendingUp className="h-6 w-6 text-primary-600" />}
              number="85%"
              label="Success Rate"
            />
            <Stat
              icon={<Heart className="h-6 w-6 text-primary-600" />}
              number="4.8/5"
              label="User Satisfaction"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;