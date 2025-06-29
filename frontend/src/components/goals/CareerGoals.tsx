import React, { useState } from 'react';
import { 
  Target, 
  Plus, 
  Calendar, 
  TrendingUp, 
  CheckCircle,
  Clock,
  AlertCircle,
  Edit3,
  Trash2,
  Flag,
  BarChart3,
  Award,
  Zap
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Modal from '../ui/Modal';
import ProgressBar from '../ui/ProgressBar';

interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'Career' | 'Skill' | 'Education' | 'Salary' | 'Network';
  priority: 'High' | 'Medium' | 'Low';
  status: 'Not Started' | 'In Progress' | 'Completed' | 'On Hold';
  progress: number;
  targetDate: string;
  createdDate: string;
  milestones: Milestone[];
  tags: string[];
}

interface Milestone {
  id: string;
  title: string;
  completed: boolean;
  dueDate?: string;
}

const CareerGoals: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterCategory, setFilterCategory] = useState('All');

  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Become a Senior Software Engineer',
      description: 'Advance to a senior role with leadership responsibilities and technical expertise',
      category: 'Career',
      priority: 'High',
      status: 'In Progress',
      progress: 65,
      targetDate: '2024-12-31',
      createdDate: '2024-01-15',
      milestones: [
        { id: '1', title: 'Complete advanced React course', completed: true },
        { id: '2', title: 'Lead a major project', completed: true },
        { id: '3', title: 'Mentor junior developers', completed: false, dueDate: '2024-08-15' },
        { id: '4', title: 'Get AWS certification', completed: false, dueDate: '2024-10-01' },
        { id: '5', title: 'Apply for senior positions', completed: false, dueDate: '2024-11-01' }
      ],
      tags: ['Leadership', 'Technical Skills', 'Mentoring']
    },
    {
      id: '2',
      title: 'Master Data Science',
      description: 'Develop expertise in machine learning, statistics, and data visualization',
      category: 'Skill',
      priority: 'High',
      status: 'In Progress',
      progress: 40,
      targetDate: '2025-06-30',
      createdDate: '2024-02-01',
      milestones: [
        { id: '1', title: 'Complete Python for Data Science', completed: true },
        { id: '2', title: 'Learn Pandas and NumPy', completed: true },
        { id: '3', title: 'Study machine learning algorithms', completed: false, dueDate: '2024-09-01' },
        { id: '4', title: 'Build portfolio projects', completed: false, dueDate: '2024-12-01' },
        { id: '5', title: 'Get Kaggle competition ranking', completed: false, dueDate: '2025-03-01' }
      ],
      tags: ['Python', 'Machine Learning', 'Statistics']
    },
    {
      id: '3',
      title: 'Increase Salary by 30%',
      description: 'Negotiate a significant salary increase through skill development and performance',
      category: 'Salary',
      priority: 'Medium',
      status: 'In Progress',
      progress: 25,
      targetDate: '2024-12-31',
      createdDate: '2024-03-01',
      milestones: [
        { id: '1', title: 'Research market salary rates', completed: true },
        { id: '2', title: 'Document achievements and impact', completed: false, dueDate: '2024-08-01' },
        { id: '3', title: 'Schedule performance review', completed: false, dueDate: '2024-09-15' },
        { id: '4', title: 'Prepare negotiation strategy', completed: false, dueDate: '2024-10-01' }
      ],
      tags: ['Negotiation', 'Performance', 'Market Research']
    },
    {
      id: '4',
      title: 'Build Professional Network',
      description: 'Expand professional connections and establish thought leadership',
      category: 'Network',
      priority: 'Medium',
      status: 'In Progress',
      progress: 55,
      targetDate: '2024-12-31',
      createdDate: '2024-01-01',
      milestones: [
        { id: '1', title: 'Join 3 professional organizations', completed: true },
        { id: '2', title: 'Attend 6 networking events', completed: true },
        { id: '3', title: 'Speak at 2 conferences', completed: false, dueDate: '2024-10-01' },
        { id: '4', title: 'Publish 5 thought leadership articles', completed: false, dueDate: '2024-11-01' }
      ],
      tags: ['Networking', 'Speaking', 'Content Creation']
    },
    {
      id: '5',
      title: 'Complete MBA Program',
      description: 'Earn an MBA to advance business knowledge and leadership skills',
      category: 'Education',
      priority: 'Low',
      status: 'Not Started',
      progress: 0,
      targetDate: '2026-05-31',
      createdDate: '2024-04-01',
      milestones: [
        { id: '1', title: 'Research MBA programs', completed: false, dueDate: '2024-08-01' },
        { id: '2', title: 'Take GMAT exam', completed: false, dueDate: '2024-10-01' },
        { id: '3', title: 'Submit applications', completed: false, dueDate: '2024-12-01' },
        { id: '4', title: 'Complete interviews', completed: false, dueDate: '2025-03-01' }
      ],
      tags: ['Education', 'Leadership', 'Business']
    }
  ]);

  const filteredGoals = goals.filter(goal => {
    const matchesStatus = filterStatus === 'All' || goal.status === filterStatus;
    const matchesCategory = filterCategory === 'All' || goal.category === filterCategory;
    return matchesStatus && matchesCategory;
  });

  const completedGoals = goals.filter(goal => goal.status === 'Completed').length;
  const inProgressGoals = goals.filter(goal => goal.status === 'In Progress').length;
  const averageProgress = Math.round(goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'On Hold': return 'bg-yellow-100 text-yellow-800';
      case 'Not Started': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Career': return <TrendingUp className="h-4 w-4" />;
      case 'Skill': return <Zap className="h-4 w-4" />;
      case 'Education': return <Award className="h-4 w-4" />;
      case 'Salary': return <BarChart3 className="h-4 w-4" />;
      case 'Network': return <Target className="h-4 w-4" />;
      default: return <Flag className="h-4 w-4" />;
    }
  };

  const getDaysUntilTarget = (targetDate: string) => {
    const target = new Date(targetDate);
    const today = new Date();
    const diffTime = target.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleEditGoal = (goal: Goal) => {
    setSelectedGoal(goal);
    setShowEditModal(true);
  };

  const toggleMilestone = (goalId: string, milestoneId: string) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const updatedMilestones = goal.milestones.map(milestone => 
          milestone.id === milestoneId 
            ? { ...milestone, completed: !milestone.completed }
            : milestone
        );
        const completedCount = updatedMilestones.filter(m => m.completed).length;
        const newProgress = Math.round((completedCount / updatedMilestones.length) * 100);
        
        return {
          ...goal,
          milestones: updatedMilestones,
          progress: newProgress,
          status: newProgress === 100 ? 'Completed' : goal.status
        };
      }
      return goal;
    }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Career Goals</h1>
          <p className="text-gray-600 mt-2">
            Set, track, and achieve your career objectives
          </p>
        </div>
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Goal
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="h-6 w-6 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{goals.length}</p>
          <p className="text-sm text-gray-600">Total Goals</p>
        </Card>

        <Card className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-6 w-6 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{completedGoals}</p>
          <p className="text-sm text-gray-600">Completed</p>
        </Card>

        <Card className="text-center">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="h-6 w-6 text-orange-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{inProgressGoals}</p>
          <p className="text-sm text-gray-600">In Progress</p>
        </Card>

        <Card className="text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="h-6 w-6 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{averageProgress}%</p>
          <p className="text-sm text-gray-600">Avg Progress</p>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex gap-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="All">All Status</option>
              <option value="Not Started">Not Started</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="All">All Categories</option>
              <option value="Career">Career</option>
              <option value="Skill">Skill</option>
              <option value="Education">Education</option>
              <option value="Salary">Salary</option>
              <option value="Network">Network</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredGoals.map((goal) => {
          const daysUntilTarget = getDaysUntilTarget(goal.targetDate);
          const isOverdue = daysUntilTarget < 0;
          const isUrgent = daysUntilTarget <= 30 && daysUntilTarget > 0;

          return (
            <Card key={goal.id} className="relative">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    goal.category === 'Career' ? 'bg-blue-100 text-blue-600' :
                    goal.category === 'Skill' ? 'bg-purple-100 text-purple-600' :
                    goal.category === 'Education' ? 'bg-green-100 text-green-600' :
                    goal.category === 'Salary' ? 'bg-yellow-100 text-yellow-600' :
                    'bg-red-100 text-red-600'
                  }`}>
                    {getCategoryIcon(goal.category)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{goal.title}</h3>
                    <p className="text-gray-600 text-sm mb-3">{goal.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleEditGoal(goal)}
                    className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <Edit3 className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2 mb-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(goal.priority)}`}>
                  {goal.priority} Priority
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
                  {goal.status}
                </span>
                <span className="text-xs text-gray-500">{goal.category}</span>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm text-gray-600">{goal.progress}%</span>
                </div>
                <ProgressBar progress={goal.progress} />
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Target Date</span>
                  <div className="flex items-center space-x-1">
                    {isOverdue && <AlertCircle className="h-4 w-4 text-red-500" />}
                    {isUrgent && <Clock className="h-4 w-4 text-yellow-500" />}
                    <span className={`text-sm ${
                      isOverdue ? 'text-red-600' : isUrgent ? 'text-yellow-600' : 'text-gray-600'
                    }`}>
                      {new Date(goal.targetDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  {isOverdue 
                    ? `${Math.abs(daysUntilTarget)} days overdue`
                    : `${daysUntilTarget} days remaining`
                  }
                </p>
              </div>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Milestones</h4>
                <div className="space-y-2">
                  {goal.milestones.slice(0, 3).map((milestone) => (
                    <div key={milestone.id} className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleMilestone(goal.id, milestone.id)}
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                          milestone.completed
                            ? 'bg-green-500 border-green-500'
                            : 'border-gray-300 hover:border-green-400'
                        }`}
                      >
                        {milestone.completed && (
                          <CheckCircle className="h-3 w-3 text-white" />
                        )}
                      </button>
                      <span className={`text-sm flex-1 ${
                        milestone.completed ? 'text-gray-500 line-through' : 'text-gray-700'
                      }`}>
                        {milestone.title}
                      </span>
                    </div>
                  ))}
                  {goal.milestones.length > 3 && (
                    <p className="text-xs text-gray-500 ml-6">
                      +{goal.milestones.length - 3} more milestones
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {goal.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      {filteredGoals.length === 0 && (
        <div className="text-center py-12">
          <Target className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No goals found</h3>
          <p className="text-gray-600 mb-4">Create your first career goal to get started</p>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Your First Goal
          </Button>
        </div>
      )}

      {/* Create Goal Modal */}
      <Modal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title="Create New Goal"
        size="lg"
      >
        <div className="space-y-6">
          <Input label="Goal Title" placeholder="e.g., Become a Senior Developer" />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows={3}
              placeholder="Describe your goal in detail..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="Career">Career</option>
                <option value="Skill">Skill</option>
                <option value="Education">Education</option>
                <option value="Salary">Salary</option>
                <option value="Network">Network</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
          <Input label="Target Date" type="date" />
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={() => setShowCreateModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button className="flex-1">
              Create Goal
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CareerGoals;