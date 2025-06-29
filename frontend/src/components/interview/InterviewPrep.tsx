import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Clock, 
  Mic,
  MicOff,
  Video,
  VideoOff,
  MessageSquare,
  Brain,
  Target,
  CheckCircle,
  Star
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Modal from '../ui/Modal';

interface InterviewQuestion {
  id: string;
  question: string;
  category: 'behavioral' | 'technical' | 'situational';
  difficulty: 'easy' | 'medium' | 'hard';
  tips: string[];
  sampleAnswer?: string;
}

const InterviewPrep: React.FC = () => {
  const [activeMode, setActiveMode] = useState<'practice' | 'mock' | 'tips'>('practice');
  const [currentQuestion, setCurrentQuestion] = useState<InterviewQuestion | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [showTips, setShowTips] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');

  const questions: InterviewQuestion[] = [
    {
      id: '1',
      question: 'Tell me about yourself.',
      category: 'behavioral',
      difficulty: 'easy',
      tips: [
        'Keep it professional and relevant to the role',
        'Structure your answer: Present, Past, Future',
        'Highlight key achievements and skills',
        'Keep it under 2 minutes'
      ],
      sampleAnswer: 'I\'m a software engineer with 3 years of experience building web applications...'
    },
    {
      id: '2',
      question: 'Describe a challenging project you worked on and how you overcame obstacles.',
      category: 'behavioral',
      difficulty: 'medium',
      tips: [
        'Use the STAR method (Situation, Task, Action, Result)',
        'Choose a relevant example that shows problem-solving',
        'Focus on your specific contributions',
        'Quantify the results when possible'
      ]
    },
    {
      id: '3',
      question: 'How do you handle working under pressure?',
      category: 'behavioral',
      difficulty: 'medium',
      tips: [
        'Provide specific examples',
        'Show your coping strategies',
        'Demonstrate positive outcomes',
        'Mention time management skills'
      ]
    },
    {
      id: '4',
      question: 'Explain the difference between REST and GraphQL APIs.',
      category: 'technical',
      difficulty: 'medium',
      tips: [
        'Define both concepts clearly',
        'Compare their strengths and weaknesses',
        'Provide use case examples',
        'Show practical understanding'
      ]
    },
    {
      id: '5',
      question: 'Where do you see yourself in 5 years?',
      category: 'behavioral',
      difficulty: 'easy',
      tips: [
        'Show ambition but be realistic',
        'Align with the company\'s growth opportunities',
        'Focus on skill development',
        'Avoid mentioning other companies'
      ]
    }
  ];

  const practiceStats = {
    totalSessions: 12,
    averageScore: 78,
    improvementRate: 15,
    strongAreas: ['Technical Knowledge', 'Communication'],
    improvementAreas: ['Confidence', 'Storytelling']
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const startPractice = () => {
    const randomQuestion = questions[Math.floor(Math.random() * questions.length)];
    setCurrentQuestion(randomQuestion);
    setUserAnswer('');
    setRecordingTime(0);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setRecordingTime(0);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const submitAnswer = () => {
    // Here you would typically send the answer for AI analysis
    console.log('Answer submitted:', userAnswer);
    setCurrentQuestion(null);
    setUserAnswer('');
    setIsRecording(false);
    setRecordingTime(0);
  };

  const renderPracticeMode = () => (
    <div className="space-y-6">
      {!currentQuestion ? (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <MessageSquare className="h-10 w-10 text-primary-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Ready to Practice?</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Practice with common interview questions and get instant feedback on your responses.
          </p>
          <Button onClick={startPractice} size="lg">
            <Play className="h-5 w-5 mr-2" />
            Start Practice Session
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Question Card */}
          <Card>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    currentQuestion.category === 'behavioral' ? 'bg-blue-100 text-blue-800' :
                    currentQuestion.category === 'technical' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {currentQuestion.category}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    currentQuestion.difficulty === 'easy' ? 'bg-green-100 text-green-800' :
                    currentQuestion.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {currentQuestion.difficulty}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {currentQuestion.question}
                </h3>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowTips(true)}
              >
                <Brain className="h-4 w-4 mr-2" />
                Tips
              </Button>
            </div>

            {/* Recording Controls */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-4">
              <div className="flex items-center space-x-4">
                <Button
                  onClick={toggleRecording}
                  variant={isRecording ? 'destructive' : 'primary'}
                  size="sm"
                >
                  {isRecording ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="font-mono text-sm">{formatTime(recordingTime)}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Mic className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Video className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Answer Input */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Your Answer
              </label>
              <textarea
                rows={6}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your answer here or use voice recording..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestion(null)}
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  New Question
                </Button>
                <Button
                  onClick={submitAnswer}
                  disabled={!userAnswer.trim() && recordingTime === 0}
                >
                  Submit Answer
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );

  const renderMockMode = () => (
    <div className="text-center py-12">
      <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <Video className="h-10 w-10 text-purple-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-4">Full Mock Interview</h3>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Experience a complete interview simulation with multiple questions and comprehensive feedback.
      </p>
      <Button size="lg">
        <Play className="h-5 w-5 mr-2" />
        Start Mock Interview
      </Button>
    </div>
  );

  const renderTipsMode = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: 'Before the Interview',
            tips: [
              'Research the company thoroughly',
              'Review the job description',
              'Prepare your STAR stories',
              'Practice common questions',
              'Prepare thoughtful questions to ask'
            ],
            icon: <Target className="h-6 w-6" />,
            color: 'bg-blue-500'
          },
          {
            title: 'During the Interview',
            tips: [
              'Arrive 10-15 minutes early',
              'Maintain good eye contact',
              'Listen carefully to questions',
              'Take a moment to think before answering',
              'Ask clarifying questions if needed'
            ],
            icon: <MessageSquare className="h-6 w-6" />,
            color: 'bg-green-500'
          },
          {
            title: 'After the Interview',
            tips: [
              'Send a thank-you email within 24 hours',
              'Reflect on your performance',
              'Follow up appropriately',
              'Continue your job search',
              'Learn from the experience'
            ],
            icon: <CheckCircle className="h-6 w-6" />,
            color: 'bg-purple-500'
          }
        ].map((section, index) => (
          <Card key={index}>
            <div className={`w-12 h-12 rounded-lg ${section.color} flex items-center justify-center mb-4`}>
              <div className="text-white">
                {section.icon}
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{section.title}</h3>
            <ul className="space-y-2">
              {section.tips.map((tip, tipIndex) => (
                <li key={tipIndex} className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0"></div>
                  <span className="text-sm text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Interview Preparation</h1>
        <p className="text-gray-600 mt-2">
          Practice interview questions and improve your confidence with AI-powered feedback
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageSquare className="h-6 w-6 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{practiceStats.totalSessions}</p>
          <p className="text-sm text-gray-600">Practice Sessions</p>
        </Card>

        <Card className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="h-6 w-6 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{practiceStats.averageScore}%</p>
          <p className="text-sm text-gray-600">Average Score</p>
        </Card>

        <Card className="text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="h-6 w-6 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">+{practiceStats.improvementRate}%</p>
          <p className="text-sm text-gray-600">Improvement</p>
        </Card>

        <Card className="text-center">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="h-6 w-6 text-orange-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">85%</p>
          <p className="text-sm text-gray-600">Confidence Level</p>
        </Card>
      </div>

      {/* Mode Selector */}
      <Card padding="sm">
        <div className="flex space-x-1">
          {[
            { id: 'practice', name: 'Quick Practice', icon: MessageSquare },
            { id: 'mock', name: 'Mock Interview', icon: Video },
            { id: 'tips', name: 'Interview Tips', icon: Brain }
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setActiveMode(mode.id as any)}
              className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg transition-colors ${
                activeMode === mode.id
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <mode.icon className="h-4 w-4 mr-2" />
              {mode.name}
            </button>
          ))}
        </div>
      </Card>

      {/* Content */}
      {activeMode === 'practice' && renderPracticeMode()}
      {activeMode === 'mock' && renderMockMode()}
      {activeMode === 'tips' && renderTipsMode()}

      {/* Tips Modal */}
      <Modal
        isOpen={showTips}
        onClose={() => setShowTips(false)}
        title="Interview Tips"
        size="lg"
      >
        {currentQuestion && (
          <div className="space-y-4">
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">Question:</h4>
              <p className="text-blue-800">{currentQuestion.question}</p>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Tips for answering:</h4>
              <ul className="space-y-2">
                {currentQuestion.tips.map((tip, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary-600 mt-2 flex-shrink-0"></div>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {currentQuestion.sampleAnswer && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-2">Sample Answer Structure:</h4>
                <p className="text-gray-700 text-sm">{currentQuestion.sampleAnswer}</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default InterviewPrep;