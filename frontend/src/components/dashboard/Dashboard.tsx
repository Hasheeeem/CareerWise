import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Brain, 
  MessageSquare, 
  BookOpen, 
  Target,
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Award,
  Zap,
  Users,
  Play,
  Calendar,
  Star
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import ProgressBar from '../ui/ProgressBar';
import { StatCardSkeleton, CardSkeleton, GoalCardSkeleton } from '../ui/SkeletonLoader';

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [learningPathsLoading, setLearningPathsLoading] = useState(true);
  const [goalsLoading, setGoalsLoading] = useState(true);

  // Simulate loading states
  useEffect(() => {
    // Simulate different loading times for different sections
    setTimeout(() => setStatsLoading(false), 800);
    setTimeout(() => setLearningPathsLoading(false), 1200);
    setTimeout(() => setGoalsLoading(false), 1000);
    setTimeout(() => setLoading(false), 1500);
  }, []);

  const stats = [
    { 
      name: 'Resumes Created', 
      value: '3', 
      icon: FileText, 
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      change: '+2 this month'
    },
    { 
      name: 'Assessments Completed', 
      value: '2', 
      icon: Brain, 
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700',
      change: '+1 this week'
    },
    { 
      name: 'Interview Sessions', 
      value: '5', 
      icon: MessageSquare, 
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      change: '+3 this week'
    },
    { 
      name: 'Learning Progress', 
      value: '67%', 
      icon: BookOpen, 
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      change: '+12% this month'
    },
  ];

  const recentActivity = [
    { 
      action: 'Completed Personality Assessment', 
      time: '2 hours ago', 
      icon: Brain,
      color: 'bg-green-100 text-green-600'
    },
    { 
      action: 'Updated Software Engineer Resume', 
      time: '1 day ago', 
      icon: FileText,
      color: 'bg-blue-100 text-blue-600'
    },
    { 
      action: 'Practiced Behavioral Interview', 
      time: '2 days ago', 
      icon: MessageSquare,
      color: 'bg-purple-100 text-purple-600'
    },
    { 
      action: 'Started React Learning Path', 
      time: '3 days ago', 
      icon: BookOpen,
      color: 'bg-orange-100 text-orange-600'
    },
  ];

  const quickActions = [
    {
      title: 'Create New Resume',
      description: 'Build a professional resume with our AI-powered builder',
      icon: FileText,
      href: '/dashboard/resume',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700'
    },
    {
      title: 'Take Assessment',
      description: 'Discover your strengths and career preferences',
      icon: Brain,
      href: '/dashboard/assessments',
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      hoverColor: 'hover:from-green-600 hover:to-green-700'
    },
    {
      title: 'Practice Interview',
      description: 'Improve your interview skills with AI feedback',
      icon: MessageSquare,
      href: '/dashboard/interview',
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      hoverColor: 'hover:from-purple-600 hover:to-purple-700'
    },
    {
      title: 'Explore Careers',
      description: 'Find career paths that match your profile',
      icon: Target,
      href: '/dashboard/goals',
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
      hoverColor: 'hover:from-orange-600 hover:to-orange-700'
    }
  ];

  // Sample learning paths data
  const activeLearningPaths = [
    {
      id: '1',
      title: 'Full-Stack Web Development',
      progress: 67,
      totalModules: 12,
      completedModules: 8,
      thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
      nextLesson: 'Advanced React Patterns'
    },
    {
      id: '2',
      title: 'UX/UI Design Fundamentals',
      progress: 21,
      totalModules: 14,
      completedModules: 3,
      thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
      nextLesson: 'User Research Methods'
    }
  ];

  // Sample career goals data
  const activeGoals = [
    {
      id: '1',
      title: 'Become a Senior Software Engineer',
      progress: 65,
      dueDate: '2024-12-31',
      priority: 'High',
      category: 'Career',
      milestones: 5,
      completedMilestones: 3
    },
    {
      id: '2',
      title: 'Master Data Science',
      progress: 40,
      dueDate: '2025-06-30',
      priority: 'High',
      category: 'Skill',
      milestones: 5,
      completedMilestones: 2
    },
    {
      id: '3',
      title: 'Build Professional Network',
      progress: 55,
      dueDate: '2024-12-31',
      priority: 'Medium',
      category: 'Network',
      milestones: 4,
      completedMilestones: 2
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysUntilTarget = (targetDate: string) => {
    const target = new Date(targetDate);
    const today = new Date();
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 via-primary-700 to-secondary-600 rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Sparkles className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Welcome back, John!</h1>
              <p className="text-white/90 text-lg">Ready to advance your career today?</p>
            </div>
          </div>
          <div className="flex items-center space-x-6 text-white/80">
            <div className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span className="text-sm">Premium Member</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award className="h-4 w-4" />
              <span className="text-sm">Career Explorer</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsLoading ? (
          Array.from({ length: 4 }).map((_, index) => (
            <StatCardSkeleton key={index} />
          ))
        ) : (
          stats.map((stat) => (
            <Card key={stat.name} className="relative overflow-hidden group hover:shadow-lg transition-all duration-300 border-0 bg-white">
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full -translate-y-10 translate-x-10 opacity-50"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 rounded-xl ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="h-7 w-7 text-white" />
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-green-600 font-medium">{stat.change}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Continue Learning Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Continue Learning</h2>
            <p className="text-gray-600 mt-1">Pick up where you left off</p>
          </div>
          <Link to="/dashboard/learning">
            <Button variant="outline" size="sm">
              View All Paths
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {learningPathsLoading ? (
            Array.from({ length: 2 }).map((_, index) => (
              <CardSkeleton key={index} />
            ))
          ) : (
            activeLearningPaths.map((path) => (
              <Card key={path.id} className="relative overflow-hidden hover:shadow-xl transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <img
                    src={path.thumbnail}
                    alt={path.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{path.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {path.completedModules} of {path.totalModules} modules completed
                    </p>
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500">Progress</span>
                        <span className="text-xs text-gray-700 font-medium">{path.progress}%</span>
                      </div>
                      <ProgressBar progress={path.progress} size="sm" />
                    </div>
                    <p className="text-xs text-gray-500 mb-3">Next: {path.nextLesson}</p>
                    <Button size="sm" className="w-full">
                      <Play className="h-4 w-4 mr-2" />
                      Continue Learning
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>

      {/* Active Goals Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Active Goals</h2>
            <p className="text-gray-600 mt-1">Track your career objectives</p>
          </div>
          <Link to="/dashboard/goals">
            <Button variant="outline" size="sm">
              View All Goals
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {goalsLoading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <GoalCardSkeleton key={index} />
            ))
          ) : (
            activeGoals.map((goal) => {
              const daysUntilTarget = getDaysUntilTarget(goal.dueDate);
              const isUrgent = daysUntilTarget <= 30 && daysUntilTarget > 0;
              
              return (
                <Card key={goal.id} className="hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Target className="h-5 w-5 text-primary-600" />
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(goal.priority)}`}>
                        {goal.priority}
                      </span>
                    </div>
                    {isUrgent && (
                      <div className="flex items-center text-orange-600">
                        <Clock className="h-4 w-4 mr-1" />
                        <span className="text-xs">Due soon</span>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{goal.title}</h3>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm font-medium text-gray-900">{goal.progress}%</span>
                    </div>
                    <ProgressBar progress={goal.progress} size="sm" />
                  </div>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <span>{goal.completedMilestones}/{goal.milestones} milestones</span>
                    <span>{daysUntilTarget} days left</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{goal.category}</span>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </Card>
              );
            })
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Quick Actions</h2>
            <p className="text-gray-600 mt-1">Jump into your career development journey</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action) => (
            <Link key={action.title} to={action.href}>
              <Card className="h-full group cursor-pointer border-0 bg-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full -translate-y-12 translate-x-12 opacity-30"></div>
                  <div className="relative z-10">
                    <div className={`w-14 h-14 rounded-xl ${action.color} ${action.hoverColor} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-all duration-300`}>
                      <action.icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                      {action.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-6 leading-relaxed">{action.description}</p>
                    <div className="flex items-center text-primary-600 text-sm font-semibold group-hover:text-primary-700">
                      Get Started
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity & Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <Card className="border-0 bg-white">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
                <Clock className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
                <p className="text-gray-500 text-sm">Your latest achievements</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            {loading ? (
              Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="animate-pulse flex items-start space-x-4 p-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              ))
            ) : (
              recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4 p-3 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className={`w-10 h-10 rounded-lg ${activity.color} flex items-center justify-center flex-shrink-0`}>
                    <activity.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>

        {/* Career Progress */}
        <Card className="border-0 bg-white">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Career Progress</h2>
                <p className="text-gray-500 text-sm">Track your development</p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            {loading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-300 rounded w-12"></div>
                  </div>
                  <div className="w-full h-3 bg-gray-300 rounded"></div>
                </div>
              ))
            ) : (
              <>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-gray-700">Profile Completion</span>
                    <span className="text-sm font-bold text-primary-600">85%</span>
                  </div>
                  <ProgressBar progress={85} />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-gray-700">Skill Development</span>
                    <span className="text-sm font-bold text-green-600">67%</span>
                  </div>
                  <ProgressBar progress={67} color="green" />
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-gray-700">Interview Readiness</span>
                    <span className="text-sm font-bold text-purple-600">72%</span>
                  </div>
                  <ProgressBar progress={72} color="purple" />
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                      <div>
                        <p className="text-sm font-semibold text-green-800">Great Progress!</p>
                        <p className="text-xs text-green-600">You're on track to reach your goals</p>
                      </div>
                    </div>
                    <Zap className="h-5 w-5 text-green-600" />
                  </div>
                </div>
              </>
            )}
          </div>
        </Card>
      </div>

      {/* AI Recommendations */}
      <Card className="border-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-100 rounded-full -translate-y-16 translate-x-16 opacity-30"></div>
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
              <Brain className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">AI Recommendations</h2>
              <p className="text-gray-600 text-sm">Personalized suggestions for you</p>
            </div>
          </div>
          {loading ? (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="animate-pulse flex items-start space-x-4">
                <div className="w-10 h-10 bg-gray-300 rounded-lg"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-5 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-300 rounded w-full"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="flex space-x-3 mt-4">
                    <div className="h-8 bg-gray-300 rounded w-24"></div>
                    <div className="h-8 bg-gray-300 rounded w-24"></div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Target className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-2">Boost Your Profile Visibility</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    Based on your career goals in software engineering, we recommend completing the 
                    Technical Skills Assessment and adding 2-3 more projects to your resume to increase your profile strength by 23%.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Link to="/dashboard/assessments">
                      <Button size="sm" variant="primary" className="shadow-sm">
                        <Brain className="h-4 w-4 mr-2" />
                        Take Assessment
                      </Button>
                    </Link>
                    <Link to="/dashboard/resume">
                      <Button size="sm" variant="outline">
                        <FileText className="h-4 w-4 mr-2" />
                        Update Resume
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;