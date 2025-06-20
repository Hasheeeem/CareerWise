import React from 'react';
import { Star } from 'lucide-react';

interface TestimonialProps {
  quote: string;
  name: string;
  title: string;
  rating: number;
  image: string;
}

const Testimonial: React.FC<TestimonialProps> = ({ quote, name, title, rating, image }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 flex flex-col h-full">
      <div className="flex-grow">
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < rating ? 'text-accent-500 fill-accent-500' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
        <p className="text-gray-700 mb-6 italic">"{quote}"</p>
      </div>
      <div className="flex items-center">
        <img
          src={image}
          alt={name}
          className="h-12 w-12 rounded-full object-cover mr-4"
        />
        <div>
          <h4 className="font-semibold text-dark-900">{name}</h4>
          <p className="text-sm text-gray-600">{title}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-dark-900 mb-4">
            Success Stories
          </h2>
          <p className="text-xl text-gray-600">
            See how CareerWise has helped people navigate their career journeys
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <Testimonial
            quote="CareerWise helped me decide which college majors aligned with my interests and future career goals. The AI provided personalized recommendations that I hadn't even considered!"
            name="Alex Johnson"
            title="High School Senior"
            rating={5}
            image="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />

          <Testimonial
            quote="After graduation, I was overwhelmed with job options. CareerWise analyzed my skills and helped me find roles that were perfect for my background in marketing and design."
            name="Mia Rodriguez"
            title="Recent Graduate"
            rating={4}
            image="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />

          <Testimonial
            quote="The resume guidance was a game-changer. After implementing CareerWise's suggestions, I started getting callbacks for interviews within a week!"
            name="David Chen"
            title="Software Engineer"
            rating={5}
            image="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
        </div>

        {/* Testimonial highlight */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="bg-primary-900 rounded-xl shadow-xl overflow-hidden">
            <div className="md:flex">
              <div className="md:w-2/5 p-8 flex items-center">
                <div>
                  <div className="mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-6 w-6 inline-block mr-1 text-accent-400 fill-accent-400"
                      />
                    ))}
                  </div>
                  <p className="text-white/90 text-lg italic mb-6">
                    "As an entrepreneur, I needed guidance on how to transition from my corporate job to starting my own business. CareerWise provided a step-by-step roadmap that made the process much less intimidating. I'm now six months into running my own successful consulting practice!"
                  </p>
                  <div className="flex items-center">
                    <img
                      src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                      alt="Sarah Williams"
                      className="h-12 w-12 rounded-full object-cover border-2 border-white mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-white">Sarah Williams</h4>
                      <p className="text-white/80 text-sm">Founder, Williams Consulting</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:w-3/5 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-900 to-transparent z-10"></div>
                <img
                  src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Entrepreneur success story"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;