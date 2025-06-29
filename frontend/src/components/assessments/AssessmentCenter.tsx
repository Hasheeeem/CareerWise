import React, { useState } from 'react';
import { 
  Brain, 
  Target, 
  Heart, 
  Users, 
  Play, 
  CheckCircle,
  Clock,
  TrendingUp,
  Award
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

interface Assessment {
  id: string;
  title: string;
  description: string;
  type: 'personality' | 'skills' | 'interests' | 'values';
  duration: string;
  questions: number;
  icon: React.ReactNode;
  color: string;
  completed: boolean;
  score?: number;
}

const AssessmentCenter: React.FC = () => {
  const [selectedAssessment, setSelectedAssessment] = useState<Assessment | null>(null);
  const [showResults, setShowResults] = useState(false);

  const assessments: Assessment[] = [
    {
      id: '1',
      title: 'Personality Assessment',
      description: 'Discover your personality type and how it influences your career preferences and work style.',
      type: 'personality',
      duration: '15 minutes',
      questions: 60,
      icon: <Brain className="h-6 w-6" />,
      color: 'bg-purple-500',
      completed: true,
      score: 85
    },
    {
      id: '2',
      title: 'Skills Evaluation',
      description: 'Assess your current skill levels across different domains and identify areas for improvement.',
      type: 'skills',
      duration: '20 minutes',
      questions: 45,
      icon: <Target className="h-6 w-6" />,
      color: 'bg-blue-500',
      completed: false
    },
    {
      id: '3',
      title: 'Career Interests',
      description: 'Explore your interests and find career paths that align with what you enjoy doing.',
      type: 'interests',
      duration: '12 minutes',
      questions: 40,
      icon: <Heart className="h-6 w-6" />,
      color: 'bg-red-500',
      completed: true,
      score: 92
    },
    {
      id: '4',
      title: 'Work Values',
      description: 'Identify what matters most to you in a work environment and career.',
      type: 'values',
      duration: '10 minutes',
      questions: 30,
      icon: <Users className="h-6 w-6" />,
      color: 'bg-green-500',
      completed: false
    }
  ];

  const completedAssessments = assessments.filter(a => a.completed);
  const averageScore = completedAssessments.length > 0 
    ? Math.round(completedAssessments.reduce((sum, a) => sum + (a.score || 0), 0) / completedAssessments.length)
    : 0;

  const startAssessment = (assessment: Assessment) => {
    setSelectedAssessment(assessment);
  };

  const viewResults = (assessment: Assessment) => {
    setSelectedAssessment(assessment);
    setShowResults(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Assessment Center</h1>
        <p className="text-gray-600 mt-2">
          Discover your strengths, interests, and ideal career paths through our comprehensive assessments
        </p>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-6 w-6 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{completedAssessments.length}</p>
          <p className="text-sm text-gray-600">Assessments Completed</p>
        </Card>

        <Card className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="h-6 w-6 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{averageScore}%</p>
          <p className="text-sm text-gray-600">Average Score</p>
        </Card>

        <Card className="text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="h-6 w-6 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {Math.round((completedAssessments.length / assessments.length) * 100)}%
          </p>
          <p className="text-sm text-gray-600">Profile Complete</p>
        </Card>
      </div>

      {/* Assessment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assessments.map((assessment) => (
          <Card key={assessment.id} hover className="relative">
            {assessment.completed && (
              <div className="absolute top-4 right-4">
                <div className="flex items-center space-x-1 bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                  <CheckCircle className="h-3 w-3" />
                  <span>Completed</span>
                </div>
              </div>
            )}
            
            <div className="flex items-start space-x-4">
              <div className={`w-12 h-12 rounded-lg ${assessment.color} flex items-center justify-center text-white flex-shrink-0`}>
                {assessment.icon}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {assessment.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm">
                  {assessment.description}
                </p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {assessment.duration}
                  </div>
                  <div className="flex items-center">
                    <Brain className="h-4 w-4 mr-1" />
                    {assessment.questions} questions
                  </div>
                </div>

                {assessment.completed ? (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-700">Score:</span>
                      <span className="text-lg font-bold text-green-600">{assessment.score}%</span>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => viewResults(assessment)}
                    >
                      View Results
                    </Button>
                  </div>
                ) : (
                  <Button 
                    onClick={() => startAssessment(assessment)}
                    className="w-full"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    Start Assessment
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recommendations */}
      <Card>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recommended Next Steps</h2>
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">Complete Your Profile</h3>
              <p className="text-gray-700 mb-4">
                {completedAssessments.length < assessments.length 
                  ? `Complete the remaining ${assessments.length - completedAssessments.length} assessments to get personalized career recommendations.`
                  : 'Great job! You\'ve completed all assessments. Check out your personalized career recommendations.'
                }
              </p>
              <div className="flex flex-wrap gap-3">
                {assessments.filter(a => !a.completed).slice(0, 2).map(assessment => (
                  <Button 
                    key={assessment.id}
                    size="sm" 
                    variant="primary"
                    onClick={() => startAssessment(assessment)}
                  >
                    Take {assessment.title}
                  </Button>
                ))}
                {completedAssessments.length === assessments.length && (
                  <Button size="sm" variant="primary">
                    View Career Matches
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Assessment Modal */}
      <Modal
        isOpen={!!selectedAssessment && !showResults}
        onClose={() => setSelectedAssessment(null)}
        title={selectedAssessment?.title}
        size="lg"
      >
        {selectedAssessment && (
          <div className="space-y-6">
            <div className="text-center">
              <div className={`w-16 h-16 rounded-full ${selectedAssessment.color} flex items-center justify-center mx-auto mb-4`}>
                <div className="text-white text-2xl">
                  {selectedAssessment.icon}
                </div>
              </div>
              <p className="text-gray-600 mb-6">{selectedAssessment.description}</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Clock className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">{selectedAssessment.duration}</p>
                  <p className="text-xs text-gray-500">Duration</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Brain className="h-6 w-6 text-gray-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-gray-900">{selectedAssessment.questions}</p>
                  <p className="text-xs text-gray-500">Questions</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Before you start:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Answer honestly for the most accurate results</li>
                <li>• There are no right or wrong answers</li>
                <li>• You can pause and resume anytime</li>
                <li>• Results will be saved to your profile</li>
              </ul>
            </div>
            
            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setSelectedAssessment(null)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button className="flex-1">
                <Play className="h-4 w-4 mr-2" />
                Begin Assessment
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Results Modal */}
      <Modal
        isOpen={showResults}
        onClose={() => {
          setShowResults(false);
          setSelectedAssessment(null);
        }}
        title="Assessment Results"
        size="lg"
      >
        {selectedAssessment && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl font-bold text-green-600">{selectedAssessment.score}%</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {selectedAssessment.title} Results
              </h3>
              <p className="text-gray-600">Completed on {new Date().toLocaleDateString()}</p>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Key Insights</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">
                    Based on your responses, you show strong alignment with analytical and creative roles. 
                    Your personality type suggests you work best in collaborative environments with clear goals and autonomy.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Recommended Career Paths</h4>
                <div className="space-y-2">
                  {['Software Engineer', 'Product Manager', 'UX Designer', 'Data Analyst'].map((career, index) => (
                    <div key={career} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-900">{career}</span>
                      <span className="text-sm text-green-600 font-medium">
                        {95 - index * 5}% match
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowResults(false);
                  setSelectedAssessment(null);
                }}
                className="flex-1"
              >
                Close
              </Button>
              <Button className="flex-1">
                Explore Career Paths
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default AssessmentCenter;