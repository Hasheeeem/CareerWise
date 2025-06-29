import React, { useState } from 'react';
import { ArrowRight, ArrowLeft, CheckCircle, Target, Briefcase, GraduationCap, TrendingUp, Lightbulb } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';

interface OnboardingData {
  userType: string;
  careerStage: string;
  primaryGoals: string[];
  industryInterests: string[];
  experienceLevel: string;
}

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
  onSkip: () => void;
}

// Define interfaces for clarity
interface Option {
  id: string;
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

interface UserTypeContent {
  careerStages: Option[];
  primaryGoals: Option[];
  industryInterests: string[];
  experienceLevels: Option[];
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete, onSkip }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<OnboardingData>({
    userType: '',
    careerStage: '',
    primaryGoals: [],
    industryInterests: [],
    experienceLevel: ''
  });

  const totalSteps = 5;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const userTypes = [
    {
      id: 'student',
      title: 'High School Student',
      description: 'Exploring career options and planning for college',
      icon: <GraduationCap className="h-8 w-8" />
    },
    {
      id: 'graduate',
      title: 'Recent Graduate',
      description: 'Transitioning from education to the workforce',
      icon: <Briefcase className="h-8 w-8" />
    },
    {
      id: 'professional',
      title: 'Working Professional',
      description: 'Looking to advance or change career paths',
      icon: <TrendingUp className="h-8 w-8" />
    },
    {
      id: 'entrepreneur',
      title: 'Aspiring Entrepreneur',
      description: 'Planning to start your own business',
      icon: <Lightbulb className="h-8 w-8" />
    }
  ];

  // Dynamic content mapping based on user type
  const onboardingContentMap: Record<string, UserTypeContent> = {
    student: {
      careerStages: [
        { id: 'exploring', title: 'Exploring College & Career Options', description: 'Still figuring out what I want to do after high school' },
        { id: 'planning_college', title: 'Planning College Applications', description: 'Focusing on college admissions and scholarships' },
        { id: 'planning_career', title: 'Planning First Career Steps', description: 'Looking into vocational training or entry-level jobs' },
        { id: 'skill_building', title: 'Building Foundation Skills', description: 'Developing skills for future opportunities' },
      ],
      primaryGoals: [
        { id: 'college_prep', title: 'College Preparation', icon: '🎓' },
        { id: 'skill_building', title: 'Skill Building for Future Jobs', icon: '🛠️' },
        { id: 'career_exploration', title: 'Career Exploration', icon: '🗺️' },
        { id: 'internship_search', title: 'Find Internships/Part-time Jobs', icon: '💼' },
        { id: 'scholarship_search', title: 'Find Scholarships', icon: '💰' },
        { id: 'extracurricular', title: 'Build Extracurricular Profile', icon: '🏆' },
      ],
      industryInterests: [
        'Technology', 'Arts & Design', 'Healthcare', 'Education', 'Science', 'Business', 'Trades', 'Sports & Recreation', 'Media & Entertainment'
      ],
      experienceLevels: [
        { id: 'no_experience', title: 'No Formal Experience', description: 'Just starting out' },
        { id: 'some_experience', title: 'Some Experience', description: 'Part-time job, volunteering, or internships' },
      ],
    },
    graduate: {
      careerStages: [
        { id: 'first_job_search', title: 'First Job Search', description: 'Actively seeking my first full-time role' },
        { id: 'entry_level_advancement', title: 'Advancing in Entry-Level', description: 'Looking to grow from my initial role' },
        { id: 'career_transition', title: 'Considering Career Transition', description: 'Exploring different fields after graduation' },
        { id: 'skill_gap_filling', title: 'Filling Skill Gaps', description: 'Developing skills needed for target roles' },
      ],
      primaryGoals: [
        { id: 'resume_linkedin', title: 'Optimize Resume & LinkedIn', icon: '📝' },
        { id: 'interview_prep', title: 'Master Interview Skills', icon: '🗣️' },
        { id: 'job_search_strategy', title: 'Develop Job Search Strategy', icon: '🔍' },
        { id: 'salary_negotiation', title: 'Learn Salary Negotiation', icon: '💰' },
        { id: 'networking', title: 'Build Professional Network', icon: '🤝' },
        { id: 'skill_development', title: 'Develop Job-Ready Skills', icon: '🧠' },
      ],
      industryInterests: [
        'Technology', 'Finance', 'Marketing', 'Consulting', 'Healthcare', 'Non-profit', 'Media', 'Education', 'Government'
      ],
      experienceLevels: [
        { id: 'entry', title: 'Entry Level', description: '0-2 years of experience' },
        { id: 'early_career', title: 'Early Career', description: '2-4 years of experience' },
      ],
    },
    professional: {
      careerStages: [
        { id: 'advancing', title: 'Advancing in Current Field', description: 'Looking to move up or take on more responsibility' },
        { id: 'career_change', title: 'Making a Career Change', description: 'Transitioning to a new industry or role' },
        { id: 'leadership_development', title: 'Developing Leadership Skills', description: 'Preparing for management or leadership roles' },
        { id: 'specialization', title: 'Deepening Specialization', description: 'Becoming an expert in my field' },
      ],
      primaryGoals: [
        { id: 'skill_upgrade', title: 'Upskill/Reskill', icon: '🧠' },
        { id: 'leadership_development', title: 'Leadership Development', icon: '👑' },
        { id: 'network_expansion', title: 'Expand Professional Network', icon: '🤝' },
        { id: 'promotion', title: 'Achieve Promotion', icon: '📈' },
        { id: 'salary_increase', title: 'Increase Salary', icon: '💰' },
        { id: 'work_life_balance', title: 'Improve Work-Life Balance', icon: '⚖️' },
      ],
      industryInterests: [
        'Technology', 'Finance', 'Healthcare', 'Manufacturing', 'Retail', 'Professional Services', 'Government', 'Energy', 'Real Estate'
      ],
      experienceLevels: [
        { id: 'mid', title: 'Mid Level', description: '3-7 years of experience' },
        { id: 'senior', title: 'Senior Level', description: '8+ years of experience' },
        { id: 'executive', title: 'Executive', description: 'Leadership/C-level experience' },
      ],
    },
    entrepreneur: {
      careerStages: [
        { id: 'idea_validation', title: 'Idea Validation', description: 'Testing the viability of a business idea' },
        { id: 'startup_launch', title: 'Startup Launch', description: 'Getting a new business off the ground' },
        { id: 'business_growth', title: 'Scaling Business', description: 'Growing an existing venture' },
        { id: 'pivot_strategy', title: 'Pivoting Strategy', description: 'Changing business direction or model' },
      ],
      primaryGoals: [
        { id: 'business_plan', title: 'Develop Business Plan', icon: '📊' },
        { id: 'funding', title: 'Secure Funding', icon: '💸' },
        { id: 'marketing_strategy', title: 'Create Marketing Strategy', icon: '📣' },
        { id: 'team_building', title: 'Build a Team', icon: '👥' },
        { id: 'product_development', title: 'Product Development', icon: '🚀' },
        { id: 'market_research', title: 'Market Research', icon: '🔍' },
      ],
      industryInterests: [
        'E-commerce', 'SaaS', 'Consulting', 'Food & Beverage', 'Health & Wellness', 'Education Tech', 'FinTech', 'Green Tech', 'AI/ML'
      ],
      experienceLevels: [
        { id: 'aspiring', title: 'Aspiring Entrepreneur', description: 'No prior business ownership' },
        { id: 'early_stage', title: 'Early-Stage Founder', description: 'Recently launched a business' },
        { id: 'experienced_founder', title: 'Experienced Founder', description: 'Successfully launched and scaled businesses before' },
      ],
    },
  };

  // Fallback content for when userType is not set
  const fallbackContent = {
    careerStages: [
      { id: 'exploring', title: 'Exploring Options', description: 'Still figuring out what I want to do' },
      { id: 'planning', title: 'Planning Next Steps', description: 'I know my direction but need a roadmap' },
      { id: 'transitioning', title: 'Making a Change', description: 'Actively changing careers or roles' },
      { id: 'advancing', title: 'Advancing Career', description: 'Looking to move up in my current field' }
    ],
    primaryGoals: [
      { id: 'resume', title: 'Build a Strong Resume', icon: '📄' },
      { id: 'interview', title: 'Improve Interview Skills', icon: '🎤' },
      { id: 'skills', title: 'Develop New Skills', icon: '🧠' },
      { id: 'network', title: 'Build Professional Network', icon: '🤝' },
      { id: 'salary', title: 'Increase Salary', icon: '💰' },
      { id: 'leadership', title: 'Develop Leadership Skills', icon: '👑' }
    ],
    industryInterests: [
      'Technology', 'Healthcare', 'Finance', 'Education', 'Marketing',
      'Design', 'Engineering', 'Sales', 'Consulting', 'Non-profit'
    ],
    experienceLevels: [
      { id: 'entry', title: 'Entry Level', description: '0-2 years of experience' },
      { id: 'mid', title: 'Mid Level', description: '3-7 years of experience' },
      { id: 'senior', title: 'Senior Level', description: '8+ years of experience' },
      { id: 'executive', title: 'Executive', description: 'Leadership/C-level experience' }
    ]
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(data);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateData = (field: keyof OnboardingData, value: any) => {
    setData(prev => {
      const newState = { ...prev, [field]: value };
      // Reset dependent fields when userType changes
      if (field === 'userType' && prev.userType !== value) {
        newState.careerStage = '';
        newState.primaryGoals = [];
        newState.industryInterests = [];
        newState.experienceLevel = '';
      }
      return newState;
    });
  };

  const toggleArrayValue = (field: 'primaryGoals' | 'industryInterests', value: string) => {
    setData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return data.userType !== '';
      case 1: return data.careerStage !== '';
      case 2: return data.primaryGoals.length > 0;
      case 3: return data.industryInterests.length > 0;
      case 4: return data.experienceLevel !== '';
      default: return false;
    }
  };

  // Get dynamic content based on selected user type
  const getCurrentContent = () => {
    return data.userType ? onboardingContentMap[data.userType] : fallbackContent;
  };

  const handleUserTypeClick = (typeId: string) => {
    console.log('User type clicked:', typeId); // Debug log
    updateData('userType', typeId);
  };

  const handleCareerStageClick = (stageId: string) => {
    console.log('Career stage clicked:', stageId); // Debug log
    updateData('careerStage', stageId);
  };

  const handleGoalToggle = (goalId: string) => {
    console.log('Goal toggled:', goalId); // Debug log
    toggleArrayValue('primaryGoals', goalId);
  };

  const handleIndustryToggle = (industry: string) => {
    console.log('Industry toggled:', industry); // Debug log
    toggleArrayValue('industryInterests', industry);
  };

  const handleExperienceLevelClick = (levelId: string) => {
    console.log('Experience level clicked:', levelId); // Debug log
    updateData('experienceLevel', levelId);
  };

  const renderStep = () => {
    const currentContent = getCurrentContent();

    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome to CareerWise!</h2>
              <p className="text-gray-600">Let's personalize your experience. What best describes you?</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userTypes.map((type) => (
                <div
                  key={type.id}
                  className={`cursor-pointer transition-all duration-200 p-6 rounded-xl border-2 ${
                    data.userType === type.id
                      ? 'ring-2 ring-primary-500 bg-primary-50 border-primary-200'
                      : 'hover:shadow-md border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                  onClick={() => handleUserTypeClick(type.id)}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${
                      data.userType === type.id ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {type.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">{type.title}</h3>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </div>
                    {data.userType === type.id && (
                      <CheckCircle className="h-5 w-5 text-primary-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            {data.userType && (
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> You can always change your category later or add additional goals as your career evolves. 
                  For example, after completing high school, you might also identify as a "Recent Graduate."
                </p>
              </div>
            )}
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What's your current career stage?</h2>
              <p className="text-gray-600">This helps us provide more relevant guidance for your situation</p>
            </div>
            <div className="space-y-3">
              {currentContent.careerStages.map((stage) => (
                <div
                  key={stage.id}
                  className={`cursor-pointer transition-all duration-200 p-6 rounded-xl border-2 ${
                    data.careerStage === stage.id
                      ? 'ring-2 ring-primary-500 bg-primary-50 border-primary-200'
                      : 'hover:shadow-md border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                  onClick={() => handleCareerStageClick(stage.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{stage.title}</h3>
                      <p className="text-sm text-gray-600">{stage.description}</p>
                    </div>
                    {data.careerStage === stage.id && (
                      <CheckCircle className="h-5 w-5 text-primary-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What are your primary goals?</h2>
              <p className="text-gray-600">Select all that apply (you can change these later)</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentContent.primaryGoals.map((goal) => (
                <div
                  key={goal.id}
                  className={`cursor-pointer transition-all duration-200 p-6 rounded-xl border-2 ${
                    data.primaryGoals.includes(goal.id)
                      ? 'ring-2 ring-primary-500 bg-primary-50 border-primary-200'
                      : 'hover:shadow-md border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                  onClick={() => handleGoalToggle(goal.id)}
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-2xl">{goal.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{goal.title}</h3>
                    </div>
                    {data.primaryGoals.includes(goal.id) && (
                      <CheckCircle className="h-5 w-5 text-primary-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Which industries interest you?</h2>
              <p className="text-gray-600">Select your areas of interest</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {currentContent.industryInterests.map((industry) => (
                <button
                  key={industry}
                  onClick={() => handleIndustryToggle(industry)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                    data.industryInterests.includes(industry)
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white hover:bg-gray-50'
                  }`}
                >
                  <span className="font-medium">{industry}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">What's your experience level?</h2>
              <p className="text-gray-600">This helps us tailor recommendations to your level</p>
            </div>
            <div className="space-y-3">
              {currentContent.experienceLevels.map((level) => (
                <div
                  key={level.id}
                  className={`cursor-pointer transition-all duration-200 p-6 rounded-xl border-2 ${
                    data.experienceLevel === level.id
                      ? 'ring-2 ring-primary-500 bg-primary-50 border-primary-200'
                      : 'hover:shadow-md border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                  onClick={() => handleExperienceLevelClick(level.id)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{level.title}</h3>
                      <p className="text-sm text-gray-600">{level.description}</p>
                    </div>
                    {data.experienceLevel === level.id && (
                      <CheckCircle className="h-5 w-5 text-primary-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Step {currentStep + 1} of {totalSteps}
            </span>
            <button
              onClick={onSkip}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Skip setup
            </button>
          </div>
          <ProgressBar progress={progress} />
        </div>

        {/* Content */}
        <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-100 p-8">
          {renderStep()}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          
          <div className="flex items-center space-x-3">
            {currentStep > 0 && (
              <Button
                variant="ghost"
                onClick={() => {
                  setCurrentStep(0);
                  updateData('userType', '');
                }}
                className="text-sm"
              >
                Change Category
              </Button>
            )}
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
            >
              {currentStep === totalSteps - 1 ? 'Complete Setup' : 'Continue'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardingFlow;