import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Target, 
  Clock,
  Award,
  Calendar,
  Filter,
  Download
} from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

const PersonalAnalytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState('30d');

  const stats = {
    totalActivities: 47,
    completionRate: 78,
    averageScore: 82,
    timeSpent: '24h 30m',
    streak: 12,
    achievements: 8
  };

  const activityData = [
    { name: 'Resume Updates', value: 12, color: 'bg-blue-500' },
    { name: 'Assessments', value: 8, color: 'bg-green-500' },
    { name: 'Interview Practice', value: 15, color: 'bg-purple-500' },
    { name: 'Learning', value: 20, color: 'bg-orange-500' },
    { name: 'Goal Progress', value: 10, color: 'bg-red-500' }
  ];

  const skillProgress = [
    { skill: 'JavaScript', current: 85, target: 90, improvement: '+5%' },
    { skill: 'React', current: 78, target: 85, improvement: '+8%' },
    { skill: 'Node.js', current: 72, target: 80, improvement: '+12%' },
    { skill: 'Communication', current: 88, target: 90, improvement: '+3%' },
    { skill: 'Leadership', current: 65, target: 75, improvement: '+15%' }
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Personal Analytics</h1>
          <p className="text-gray-600 mt-2">
            Track your career development progress and insights
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 3 months</option>
            <option value="1y">Last year</option>
          </select>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <Card className="text-center">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <BarChart3 className="h-6 w-6 text-blue-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.totalActivities}</p>
          <p className="text-sm text-gray-600">Total Activities</p>
        </Card>

        <Card className="text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="h-6 w-6 text-green-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.completionRate}%</p>
          <p className="text-sm text-gray-600">Completion Rate</p>
        </Card>

        <Card className="text-center">
          <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <TrendingUp className="h-6 w-6 text-purple-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.averageScore}%</p>
          <p className="text-sm text-gray-600">Average Score</p>
        </Card>

        <Card className="text-center">
          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="h-6 w-6 text-orange-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.timeSpent}</p>
          <p className="text-sm text-gray-600">Time Spent</p>
        </Card>

        <Card className="text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calendar className="h-6 w-6 text-red-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.streak}</p>
          <p className="text-sm text-gray-600">Day Streak</p>
        </Card>

        <Card className="text-center">
          <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Award className="h-6 w-6 text-yellow-600" />
          </div>
          <p className="text-2xl font-bold text-gray-900">{stats.achievements}</p>
          <p className="text-sm text-gray-600">Achievements</p>
        </Card>
      </div>

      {/* Activity Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Activity Breakdown</h3>
          <div className="space-y-4">
            {activityData.map((activity, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${activity.color}`}></div>
                  <span className="text-sm font-medium text-gray-700">{activity.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${activity.color}`}
                      style={{ width: `${(activity.value / 25) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 w-8">{activity.value}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Skill Progress</h3>
          <div className="space-y-4">
            {skillProgress.map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">{skill.skill}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-green-600 font-medium">{skill.improvement}</span>
                    <span className="text-sm text-gray-600">{skill.current}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-primary-500 to-primary-600 h-2 rounded-full transition-all duration-1000"
                    style={{ width: `${skill.current}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Current: {skill.current}%</span>
                  <span>Target: {skill.target}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Weekly Activity Chart */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Weekly Activity</h3>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
            <div key={day} className="text-center">
              <div className="text-xs text-gray-500 mb-2">{day}</div>
              <div 
                className={`w-full rounded-lg ${
                  index < 5 ? 'bg-primary-500' : 'bg-gray-200'
                }`}
                style={{ height: `${Math.random() * 60 + 20}px` }}
              ></div>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-600 text-center">
          You've been most active on weekdays this week
        </p>
      </Card>

      {/* Achievements */}
      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: 'Assessment Master', description: 'Completed 5 assessments', icon: '🏆', date: '2 days ago' },
            { title: 'Learning Streak', description: '7 days of continuous learning', icon: '🔥', date: '1 week ago' },
            { title: 'Goal Achiever', description: 'Completed first career goal', icon: '🎯', date: '2 weeks ago' },
            { title: 'Interview Pro', description: 'Scored 90%+ in practice', icon: '⭐', date: '3 weeks ago' }
          ].map((achievement, index) => (
            <div key={index} className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-4 border border-yellow-200">
              <div className="text-2xl mb-2">{achievement.icon}</div>
              <h4 className="font-semibold text-gray-900 mb-1">{achievement.title}</h4>
              <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
              <p className="text-xs text-gray-500">{achievement.date}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default PersonalAnalytics;