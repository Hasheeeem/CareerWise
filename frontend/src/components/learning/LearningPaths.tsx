import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Play, 
  CheckCircle, 
  Clock, 
  Star,
  TrendingUp,
  Award,
  Filter,
  Search,
  ChevronRight,
  Target,
  Users,
  Calendar,
  BarChart3
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import ProgressBar from '../ui/ProgressBar';
import { LearningPathSkeleton } from '../ui/SkeletonLoader';
import LoadingSpinner from '../ui/LoadingSpinner';

interface LearningPath {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  modules: number;
  completedModules: number;
  rating: number;
  students: number;
  instructor: string;
  skills: string[];
  progress: number;
  isEnrolled: boolean;
  thumbnail: string;
  estimatedSalary?: string;
}

const LearningPaths: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [selectedPath, setSelectedPath] = useState<LearningPath | null>(null);
  const [enrolling, setEnrolling] = useState(false);

  const categories = ['All', 'Technology', 'Business', 'Design', 'Marketing', 'Data Science'];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  // Simulate loading
  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  const learningPaths: LearningPath[] = [
    {
      id: '1',
      title: 'Full-Stack Web Development',
      description: 'Master modern web development with React, Node.js, and databases',
      category: 'Technology',
      difficulty: 'Intermediate',
      duration: '6 months',
      modules: 12,
      completedModules: 8,
      rating: 4.8,
      students: 15420,
      instructor: 'Sarah Chen',
      skills: ['React', 'Node.js', 'MongoDB', 'JavaScript', 'CSS'],
      progress: 67,
      isEnrolled: true,
      thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=400',
      estimatedSalary: '$75,000 - $120,000'
    },
    {
      id: '2',
      title: 'Data Science & Machine Learning',
      description: 'Learn Python, statistics, and ML algorithms for data-driven insights',
      category: 'Data Science',
      difficulty: 'Advanced',
      duration: '8 months',
      modules: 16,
      completedModules: 0,
      rating: 4.9,
      students: 12350,
      instructor: 'Dr. Michael Rodriguez',
      skills: ['Python', 'Pandas', 'Scikit-learn', 'TensorFlow', 'Statistics'],
      progress: 0,
      isEnrolled: false,
      thumbnail: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400',
      estimatedSalary: '$90,000 - $150,000'
    },
    {
      id: '3',
      title: 'Digital Marketing Mastery',
      description: 'Complete guide to SEO, social media, and content marketing',
      category: 'Marketing',
      difficulty: 'Beginner',
      duration: '4 months',
      modules: 10,
      completedModules: 10,
      rating: 4.7,
      students: 8920,
      instructor: 'Emma Thompson',
      skills: ['SEO', 'Google Ads', 'Social Media', 'Analytics', 'Content Strategy'],
      progress: 100,
      isEnrolled: true,
      thumbnail: 'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=400',
      estimatedSalary: '$45,000 - $80,000'
    },
    {
      id: '4',
      title: 'UX/UI Design Fundamentals',
      description: 'Design thinking, prototyping, and user research methodologies',
      category: 'Design',
      difficulty: 'Beginner',
      duration: '5 months',
      modules: 14,
      completedModules: 3,
      rating: 4.6,
      students: 11200,
      instructor: 'Alex Kim',
      skills: ['Figma', 'User Research', 'Prototyping', 'Design Systems', 'Usability'],
      progress: 21,
      isEnrolled: true,
      thumbnail: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
      estimatedSalary: '$60,000 - $100,000'
    },
    {
      id: '5',
      title: 'Project Management Professional',
      description: 'Agile, Scrum, and traditional project management methodologies',
      category: 'Business',
      difficulty: 'Intermediate',
      duration: '3 months',
      modules: 8,
      completedModules: 0,
      rating: 4.5,
      students: 6780,
      instructor: 'David Wilson',
      skills: ['Agile', 'Scrum', 'Risk Management', 'Leadership', 'Communication'],
      progress: 0,
      isEnrolled: false,
      thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
      estimatedSalary: '$70,000 - $110,000'
    },
    {
      id: '6',
      title: 'Cloud Computing with AWS',
      description: 'Master Amazon Web Services and cloud architecture',
      category: 'Technology',
      difficulty: 'Advanced',
      duration: '7 months',
      modules: 15,
      completedModules: 0,
      rating: 4.8,
      students: 9450,
      instructor: 'Jennifer Lee',
      skills: ['AWS', 'Docker', 'Kubernetes', 'DevOps', 'Security'],
      progress: 0,
      isEnrolled: false,
      thumbnail: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=400',
      estimatedSalary: '$85,000 - $140,000'
    }
  ];

  const filteredPaths = learningPaths.filter(path => {
    const matchesSearch = path.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         path.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         path.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || path.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || path.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  const enrolledPaths = learningPaths.filter(path => path.isEnrolled);
  const completedPaths = learningPaths.filter(path => path.progress === 100);
  const inProgressPaths = learningPaths.filter(path => path.isEnrolled && path.progress > 0 && path.progress < 100);

  const handleEnroll = (path: LearningPath) => {
    setSelectedPath(path);
    setShowEnrollModal(true);
  };

  const handleEnrollConfirm = async () => {
    setEnrolling(true);
    // Simulate enrollment process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setEnrolling(false);
    setShowEnrollModal(false);
    // In real app, update the path enrollment status
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div>
          <div className="h-8 bg-gray-300 rounded w-1/3 mb-2 animate-pulse"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2 animate-pulse"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="animate-pulse">
                <div className="w-12 h-12 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <div className="h-8 bg-gray-300 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 rounded"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <LearningPathSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Learning Paths</h1>
        <p className="text-gray-600 mt-2">
          Structured learning journeys to advance your career
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BookOpen className="h-6 w-6 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{enrolledPaths.length}</p>
          <p className="text-sm text-gray-600">Enrolled Paths</p>
        </Card>

        <Card className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{completedPaths.length}</p>
          <p className="text-sm text-gray-600">Completed</p>
        </Card>

        <Card className="text-center">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="h-6 w-6 text-orange-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{inProgressPaths.length}</p>
          <p className="text-sm text-gray-600">In Progress</p>
        </Card>

        <Card className="text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="h-6 w-6 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {Math.round(enrolledPaths.reduce((sum, path) => sum + path.progress, 0) / enrolledPaths.length) || 0}%
          </p>
          <p className="text-sm text-gray-600">Avg Progress</p>
        </Card>
      </div>

      {/* Continue Learning Section */}
      {inProgressPaths.length > 0 && (
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Continue Learning</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {inProgressPaths.slice(0, 2).map((path) => (
              <Card key={path.id} className="relative overflow-hidden">
                <div className="flex items-start space-x-4">
                  <img
                    src={path.thumbnail}
                    alt={path.title}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{path.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {path.completedModules} of {path.modules} modules completed
                    </p>
                    <ProgressBar progress={path.progress} className="mb-3" />
                    <Button size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      Continue Learning
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search learning paths, skills, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="h-4 w-4 text-gray-400" />}
            />
          </div>
          <div className="flex gap-4">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>{difficulty}</option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Learning Paths Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPaths.map((path) => (
          <Card key={path.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="relative">
              <img
                src={path.thumbnail}
                alt={path.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-4 left-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(path.difficulty)}`}>
                  {path.difficulty}
                </span>
              </div>
              {path.isEnrolled && (
                <div className="absolute top-4 right-4">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-white" />
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-primary-600 font-medium">{path.category}</span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-600">{path.rating}</span>
                </div>
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                {path.title}
              </h3>
              
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {path.description}
              </p>
              
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {path.duration}
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-1" />
                    {path.modules} modules
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {path.students.toLocaleString()}
                </div>
              </div>

              {path.estimatedSalary && (
                <div className="bg-green-50 rounded-lg p-3 mb-4">
                  <div className="flex items-center">
                    <BarChart3 className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm font-medium text-green-800">
                      Estimated Salary: {path.estimatedSalary}
                    </span>
                  </div>
                </div>
              )}
              
              <div className="flex flex-wrap gap-1 mb-4">
                {path.skills.slice(0, 3).map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                  >
                    {skill}
                  </span>
                ))}
                {path.skills.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                    +{path.skills.length - 3} more
                  </span>
                )}
              </div>

              {path.isEnrolled ? (
                <div className="space-y-3">
                  <ProgressBar progress={path.progress} />
                  <Button className="w-full" size="sm">
                    <Play className="h-4 w-4 mr-2" />
                    {path.progress === 100 ? 'Review Course' : 'Continue Learning'}
                  </Button>
                </div>
              ) : (
                <Button 
                  className="w-full" 
                  size="sm"
                  onClick={() => handleEnroll(path)}
                >
                  Enroll Now
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {filteredPaths.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No learning paths found</h3>
          <p className="text-gray-600">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Enrollment Modal */}
      <Modal
        isOpen={showEnrollModal}
        onClose={() => setShowEnrollModal(false)}
        title="Enroll in Learning Path"
        size="lg"
      >
        {selectedPath && (
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <img
                src={selectedPath.thumbnail}
                alt={selectedPath.title}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {selectedPath.title}
                </h3>
                <p className="text-gray-600 mb-4">{selectedPath.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{selectedPath.duration}</span>
                  <span>•</span>
                  <span>{selectedPath.modules} modules</span>
                  <span>•</span>
                  <span>{selectedPath.difficulty}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-medium text-blue-900 mb-2">What you'll learn:</h4>
              <div className="grid grid-cols-2 gap-2">
                {selectedPath.skills.map((skill) => (
                  <div key={skill} className="flex items-center text-blue-800">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span className="text-sm">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {selectedPath.estimatedSalary && (
              <div className="bg-green-50 rounded-lg p-4">
                <div className="flex items-center">
                  <Target className="h-5 w-5 text-green-600 mr-2" />
                  <div>
                    <p className="font-medium text-green-900">Career Outcome</p>
                    <p className="text-sm text-green-800">
                      Estimated salary range: {selectedPath.estimatedSalary}
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setShowEnrollModal(false)}
                className="flex-1"
                disabled={enrolling}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1"
                onClick={handleEnrollConfirm}
                loading={enrolling}
              >
                {enrolling ? 'Enrolling...' : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Start Learning
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default LearningPaths;