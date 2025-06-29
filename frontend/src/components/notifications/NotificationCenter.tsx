import React, { useState } from 'react';
import { 
  Bell, 
  X, 
  CheckCircle, 
  AlertCircle, 
  Info, 
  Calendar,
  Award,
  TrendingUp,
  MessageSquare,
  Settings,
  Trash2,
  MoreVertical
} from 'lucide-react';
import { cn } from '../../lib/utils';
import Badge from '../ui/Badge';

interface Notification {
  id: string;
  type: 'success' | 'warning' | 'info' | 'reminder';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  actionText?: string;
  priority?: 'low' | 'medium' | 'high';
}

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'success',
      title: 'Assessment Completed!',
      message: 'You scored 85% on your Personality Assessment. View your detailed results.',
      timestamp: '2 hours ago',
      read: false,
      actionUrl: '/dashboard/assessments',
      actionText: 'View Results',
      priority: 'high'
    },
    {
      id: '2',
      type: 'reminder',
      title: 'Interview Practice Due',
      message: 'Your weekly interview practice session is scheduled for today.',
      timestamp: '4 hours ago',
      read: false,
      actionUrl: '/dashboard/interview',
      actionText: 'Start Practice',
      priority: 'medium'
    },
    {
      id: '3',
      type: 'info',
      title: 'New Learning Path Available',
      message: 'Check out the new "Cloud Computing with AWS" learning path.',
      timestamp: '1 day ago',
      read: true,
      actionUrl: '/dashboard/learning',
      actionText: 'Explore',
      priority: 'low'
    },
    {
      id: '4',
      type: 'warning',
      title: 'Goal Deadline Approaching',
      message: 'Your goal "Complete AWS Certification" is due in 5 days.',
      timestamp: '1 day ago',
      read: true,
      actionUrl: '/dashboard/goals',
      actionText: 'View Goal',
      priority: 'high'
    },
    {
      id: '5',
      type: 'success',
      title: 'Resume Updated',
      message: 'Your Software Engineer resume has been successfully updated.',
      timestamp: '2 days ago',
      read: true,
      priority: 'low'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const unreadCount = notifications.filter(n => !n.read).length;
  const filteredNotifications = filter === 'unread' 
    ? notifications.filter(n => !n.read)
    : notifications;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />;
      case 'reminder':
        return <Calendar className="h-5 w-5 text-purple-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high':
        return <Badge variant="error" size="sm">High</Badge>;
      case 'medium':
        return <Badge variant="warning" size="sm">Medium</Badge>;
      case 'low':
        return <Badge variant="success" size="sm">Low</Badge>;
      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-xl shadow-xl border border-gray-200 z-50 max-h-96 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <Bell className="h-5 w-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
          {unreadCount > 0 && (
            <Badge variant="error" size="sm">
              {unreadCount}
            </Badge>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-sm text-primary-600 hover:text-primary-700 transition-colors"
            >
              Mark all read
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-gray-100 transition-colors"
          >
            <X className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex border-b border-gray-100">
        <button
          onClick={() => setFilter('all')}
          className={cn(
            'flex-1 px-4 py-2 text-sm font-medium transition-colors',
            filter === 'all'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700'
          )}
        >
          All ({notifications.length})
        </button>
        <button
          onClick={() => setFilter('unread')}
          className={cn(
            'flex-1 px-4 py-2 text-sm font-medium transition-colors',
            filter === 'unread'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-500 hover:text-gray-700'
          )}
        >
          Unread ({unreadCount})
        </button>
      </div>

      {/* Notifications List */}
      <div className="max-h-80 overflow-y-auto">
        {filteredNotifications.length === 0 ? (
          <div className="p-8 text-center">
            <Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">
              {filter === 'unread' ? 'No unread notifications' : 'No notifications yet'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={cn(
                  'p-4 hover:bg-gray-50 transition-colors relative group',
                  !notification.read && 'bg-blue-50'
                )}
              >
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-2">
                        <h4 className={cn(
                          'text-sm font-medium',
                          notification.read ? 'text-gray-900' : 'text-gray-900 font-semibold'
                        )}>
                          {notification.title}
                        </h4>
                        {notification.priority && getPriorityBadge(notification.priority)}
                      </div>
                      <div className="flex items-center space-x-1">
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-gray-200 transition-all"
                        >
                          <Trash2 className="h-3 w-3 text-gray-400" />
                        </button>
                        <button className="opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-gray-200 transition-all">
                          <MoreVertical className="h-3 w-3 text-gray-400" />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-gray-500">
                        {notification.timestamp}
                      </span>
                      <div className="flex items-center space-x-2">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                          >
                            Mark as read
                          </button>
                        )}
                        {notification.actionUrl && (
                          <button
                            onClick={() => {
                              markAsRead(notification.id);
                              // Navigate to actionUrl
                            }}
                            className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                          >
                            {notification.actionText}
                          </button>
                        )}
                      </div>
                    </div>
                    {!notification.read && (
                      <div className="absolute top-4 right-4 w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-gray-100 bg-gray-50">
        <button className="w-full text-sm text-gray-600 hover:text-gray-900 flex items-center justify-center space-x-2 transition-colors">
          <Settings className="h-4 w-4" />
          <span>Notification Settings</span>
        </button>
      </div>
    </div>
  );
};

export default NotificationCenter;