import React, { useState } from 'react';
import { 
  Plus, 
  FileText, 
  Brain, 
  MessageSquare, 
  Target,
  BookOpen,
  Zap,
  ChevronDown
} from 'lucide-react';
import { cn } from '../../lib/utils';
import Button from './Button';

interface QuickAction {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  action: () => void;
  shortcut?: string;
}

interface QuickActionsProps {
  className?: string;
  variant?: 'floating' | 'inline';
}

const QuickActions: React.FC<QuickActionsProps> = ({ 
  className,
  variant = 'floating' 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const actions: QuickAction[] = [
    {
      id: 'resume',
      title: 'Create Resume',
      description: 'Build a professional resume',
      icon: <FileText className="h-4 w-4" />,
      color: 'bg-blue-500 hover:bg-blue-600',
      action: () => console.log('Create resume'),
      shortcut: 'R'
    },
    {
      id: 'assessment',
      title: 'Take Assessment',
      description: 'Discover your strengths',
      icon: <Brain className="h-4 w-4" />,
      color: 'bg-purple-500 hover:bg-purple-600',
      action: () => console.log('Take assessment'),
      shortcut: 'A'
    },
    {
      id: 'interview',
      title: 'Practice Interview',
      description: 'Improve your skills',
      icon: <MessageSquare className="h-4 w-4" />,
      color: 'bg-green-500 hover:bg-green-600',
      action: () => console.log('Practice interview'),
      shortcut: 'I'
    },
    {
      id: 'goal',
      title: 'Set Goal',
      description: 'Define objectives',
      icon: <Target className="h-4 w-4" />,
      color: 'bg-orange-500 hover:bg-orange-600',
      action: () => console.log('Set goal'),
      shortcut: 'G'
    },
    {
      id: 'learning',
      title: 'Browse Learning',
      description: 'Explore courses',
      icon: <BookOpen className="h-4 w-4" />,
      color: 'bg-red-500 hover:bg-red-600',
      action: () => console.log('Browse learning'),
      shortcut: 'L'
    }
  ];

  if (variant === 'inline') {
    return (
      <div className={cn('grid grid-cols-2 md:grid-cols-5 gap-3', className)}>
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={action.action}
            className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all group"
          >
            <div className={cn(
              'w-10 h-10 rounded-lg flex items-center justify-center text-white mb-2 transition-transform group-hover:scale-110',
              action.color
            )}>
              {action.icon}
            </div>
            <span className="text-sm font-medium text-gray-900">{action.title}</span>
            <span className="text-xs text-gray-500 mt-1">{action.description}</span>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('fixed bottom-6 right-6 z-40', className)}>
      {/* Action Menu */}
      {isOpen && (
        <div className="mb-4 space-y-2">
          {actions.map((action, index) => (
            <div
              key={action.id}
              className="flex items-center space-x-3 animate-in slide-in-from-bottom-2 duration-200"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="bg-white rounded-lg shadow-lg border border-gray-200 px-3 py-2">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-900">{action.title}</span>
                  {action.shortcut && (
                    <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded">
                      {action.shortcut}
                    </kbd>
                  )}
                </div>
              </div>
              <button
                onClick={() => {
                  action.action();
                  setIsOpen(false);
                }}
                className={cn(
                  'w-12 h-12 rounded-full text-white shadow-lg transition-all transform hover:scale-110',
                  action.color
                )}
              >
                {action.icon}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Main FAB */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-14 h-14 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg hover:shadow-xl transition-all transform hover:scale-105',
          isOpen && 'rotate-45'
        )}
      >
        {isOpen ? (
          <Plus className="h-6 w-6 mx-auto" />
        ) : (
          <Zap className="h-6 w-6 mx-auto" />
        )}
      </button>
    </div>
  );
};

export default QuickActions;