import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  FileText, 
  Brain, 
  MessageSquare, 
  Target,
  BookOpen,
  Settings,
  User,
  Plus,
  ArrowRight,
  Command
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';

interface Command {
  id: string;
  title: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
  category: string;
  keywords: string[];
}

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const commands: Command[] = [
    {
      id: 'create-resume',
      title: 'Create New Resume',
      description: 'Build a professional resume',
      icon: <FileText className="h-4 w-4" />,
      action: () => console.log('Navigate to resume builder'),
      category: 'Create',
      keywords: ['resume', 'cv', 'create', 'new', 'build']
    },
    {
      id: 'take-assessment',
      title: 'Take Assessment',
      description: 'Discover your strengths',
      icon: <Brain className="h-4 w-4" />,
      action: () => console.log('Navigate to assessments'),
      category: 'Create',
      keywords: ['assessment', 'test', 'personality', 'skills', 'take']
    },
    {
      id: 'practice-interview',
      title: 'Practice Interview',
      description: 'Improve your interview skills',
      icon: <MessageSquare className="h-4 w-4" />,
      action: () => console.log('Navigate to interview practice'),
      category: 'Create',
      keywords: ['interview', 'practice', 'mock', 'preparation']
    },
    {
      id: 'set-goal',
      title: 'Set Career Goal',
      description: 'Define your career objectives',
      icon: <Target className="h-4 w-4" />,
      action: () => console.log('Navigate to goals'),
      category: 'Create',
      keywords: ['goal', 'objective', 'career', 'target', 'set']
    },
    {
      id: 'browse-learning',
      title: 'Browse Learning Paths',
      description: 'Explore skill development courses',
      icon: <BookOpen className="h-4 w-4" />,
      action: () => console.log('Navigate to learning'),
      category: 'Navigate',
      keywords: ['learning', 'course', 'skill', 'development', 'path']
    },
    {
      id: 'view-profile',
      title: 'View Profile',
      description: 'Manage your account settings',
      icon: <User className="h-4 w-4" />,
      action: () => console.log('Navigate to profile'),
      category: 'Navigate',
      keywords: ['profile', 'account', 'settings', 'personal']
    },
    {
      id: 'settings',
      title: 'Settings',
      description: 'Configure your preferences',
      icon: <Settings className="h-4 w-4" />,
      action: () => console.log('Navigate to settings'),
      category: 'Navigate',
      keywords: ['settings', 'preferences', 'configuration', 'options']
    }
  ];

  const filteredCommands = commands.filter(command =>
    command.title.toLowerCase().includes(query.toLowerCase()) ||
    command.description?.toLowerCase().includes(query.toLowerCase()) ||
    command.keywords.some(keyword => keyword.toLowerCase().includes(query.toLowerCase()))
  );

  const groupedCommands = filteredCommands.reduce((groups, command) => {
    const category = command.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(command);
    return groups;
  }, {} as Record<string, Command[]>);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation
  useKeyboardShortcuts([
    {
      key: 'ArrowDown',
      callback: () => {
        if (isOpen) {
          setSelectedIndex(prev => 
            prev < filteredCommands.length - 1 ? prev + 1 : prev
          );
        }
      },
      description: 'Navigate down',
      preventDefault: true
    },
    {
      key: 'ArrowUp',
      callback: () => {
        if (isOpen) {
          setSelectedIndex(prev => prev > 0 ? prev - 1 : 0);
        }
      },
      description: 'Navigate up',
      preventDefault: true
    },
    {
      key: 'Enter',
      callback: () => {
        if (isOpen && filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
          onClose();
        }
      },
      description: 'Execute command',
      preventDefault: true
    },
    {
      key: 'Escape',
      callback: () => {
        if (isOpen) {
          onClose();
        }
      },
      description: 'Close command palette'
    }
  ]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center p-4 border-b border-gray-200">
          <Command className="h-5 w-5 text-gray-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-lg outline-none"
          />
          <div className="flex items-center space-x-1 ml-3">
            <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded">
              ↑↓
            </kbd>
            <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded">
              ↵
            </kbd>
          </div>
        </div>

        {/* Commands */}
        <div className="max-h-80 overflow-y-auto">
          {Object.keys(groupedCommands).length > 0 ? (
            Object.entries(groupedCommands).map(([category, commands]) => (
              <div key={category}>
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50 border-b border-gray-100">
                  {category}
                </div>
                {commands.map((command, index) => {
                  const globalIndex = filteredCommands.indexOf(command);
                  return (
                    <div
                      key={command.id}
                      className={cn(
                        'flex items-center p-4 cursor-pointer transition-colors',
                        selectedIndex === globalIndex ? 'bg-primary-50' : 'hover:bg-gray-50'
                      )}
                      onClick={() => {
                        command.action();
                        onClose();
                      }}
                    >
                      <div className="flex items-center space-x-3 flex-1">
                        <div className={cn(
                          'p-2 rounded-lg',
                          selectedIndex === globalIndex ? 'bg-primary-100 text-primary-600' : 'bg-gray-100 text-gray-600'
                        )}>
                          {command.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-medium text-gray-900">
                            {command.title}
                          </h3>
                          {command.description && (
                            <p className="text-xs text-gray-500">
                              {command.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                    </div>
                  );
                })}
              </div>
            ))
          ) : (
            <div className="p-8 text-center">
              <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No commands found</p>
              <p className="text-sm text-gray-400 mt-1">
                Try searching for "create", "navigate", or specific features
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded">↑↓</kbd>
                <span>to navigate</span>
              </div>
              <div className="flex items-center space-x-1">
                <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded">↵</kbd>
                <span>to select</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <kbd className="px-1.5 py-0.5 bg-white border border-gray-200 rounded">esc</kbd>
              <span>to close</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;