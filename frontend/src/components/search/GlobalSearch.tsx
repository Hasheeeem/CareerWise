import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Clock, 
  FileText, 
  Brain, 
  MessageSquare, 
  Target,
  BookOpen,
  TrendingUp,
  X,
  ArrowRight,
  Zap,
  Filter
} from 'lucide-react';
import { cn } from '../../lib/utils';
import Badge from '../ui/Badge';

interface SearchResult {
  id: string;
  title: string;
  description: string;
  type: 'resume' | 'assessment' | 'goal' | 'learning' | 'interview' | 'general';
  url: string;
  metadata?: string;
  category?: string;
  relevanceScore?: number;
}

interface GlobalSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([
    'React interview questions',
    'Data science learning path',
    'Resume templates',
    'Salary negotiation tips'
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [filter, setFilter] = useState<string>('all');
  const inputRef = useRef<HTMLInputElement>(null);

  // Mock search results
  const mockResults: SearchResult[] = [
    {
      id: '1',
      title: 'Software Engineer Resume',
      description: 'Your latest resume with React and Node.js experience',
      type: 'resume',
      url: '/dashboard/resume',
      metadata: 'Last updated 2 days ago',
      category: 'Documents',
      relevanceScore: 95
    },
    {
      id: '2',
      title: 'Personality Assessment',
      description: 'Completed assessment with 85% score',
      type: 'assessment',
      url: '/dashboard/assessments',
      metadata: 'Completed yesterday',
      category: 'Assessments',
      relevanceScore: 90
    },
    {
      id: '3',
      title: 'Become Senior Developer',
      description: 'Career goal with 65% progress',
      type: 'goal',
      url: '/dashboard/goals',
      metadata: 'Due Dec 31, 2024',
      category: 'Goals',
      relevanceScore: 88
    },
    {
      id: '4',
      title: 'Full-Stack Web Development',
      description: 'Learning path with React, Node.js, and databases',
      type: 'learning',
      url: '/dashboard/learning',
      metadata: '67% complete',
      category: 'Learning',
      relevanceScore: 85
    },
    {
      id: '5',
      title: 'Behavioral Interview Practice',
      description: 'Practice session completed 2 days ago',
      type: 'interview',
      url: '/dashboard/interview',
      metadata: 'Score: 78%',
      category: 'Interview Prep',
      relevanceScore: 82
    },
    {
      id: '6',
      title: 'JavaScript Fundamentals',
      description: 'Master the basics of JavaScript programming',
      type: 'learning',
      url: '/dashboard/learning',
      metadata: 'Beginner level',
      category: 'Learning',
      relevanceScore: 80
    }
  ];

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.length > 0) {
      setIsLoading(true);
      // Simulate API call with debouncing
      const timer = setTimeout(() => {
        let filtered = mockResults.filter(result =>
          result.title.toLowerCase().includes(query.toLowerCase()) ||
          result.description.toLowerCase().includes(query.toLowerCase()) ||
          result.category?.toLowerCase().includes(query.toLowerCase())
        );

        // Apply type filter
        if (filter !== 'all') {
          filtered = filtered.filter(result => result.type === filter);
        }

        // Sort by relevance score
        filtered.sort((a, b) => (b.relevanceScore || 0) - (a.relevanceScore || 0));

        setResults(filtered);
        setIsLoading(false);
        setSelectedIndex(-1);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setResults([]);
      setIsLoading(false);
      setSelectedIndex(-1);
    }
  }, [query, filter]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < results.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0 && results[selectedIndex]) {
            handleResultClick(results[selectedIndex]);
          }
          break;
        case 'Escape':
          onClose();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'resume':
        return <FileText className="h-4 w-4 text-blue-500" />;
      case 'assessment':
        return <Brain className="h-4 w-4 text-purple-500" />;
      case 'goal':
        return <Target className="h-4 w-4 text-green-500" />;
      case 'learning':
        return <BookOpen className="h-4 w-4 text-orange-500" />;
      case 'interview':
        return <MessageSquare className="h-4 w-4 text-red-500" />;
      default:
        return <Search className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'resume':
        return 'Resume';
      case 'assessment':
        return 'Assessment';
      case 'goal':
        return 'Goal';
      case 'learning':
        return 'Learning';
      case 'interview':
        return 'Interview';
      default:
        return 'General';
    }
  };

  const handleRecentSearch = (search: string) => {
    setQuery(search);
  };

  const handleResultClick = (result: SearchResult) => {
    // Add to recent searches if not already there
    if (!recentSearches.includes(query) && query.trim()) {
      setRecentSearches(prev => [query, ...prev.slice(0, 4)]);
    }
    // Navigate to result.url
    onClose();
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
  };

  const filterOptions = [
    { value: 'all', label: 'All Results', icon: Search },
    { value: 'resume', label: 'Resumes', icon: FileText },
    { value: 'assessment', label: 'Assessments', icon: Brain },
    { value: 'goal', label: 'Goals', icon: Target },
    { value: 'learning', label: 'Learning', icon: BookOpen },
    { value: 'interview', label: 'Interview', icon: MessageSquare }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl mx-4 max-h-96 overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center p-4 border-b border-gray-200">
          <Search className="h-5 w-5 text-gray-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search resumes, assessments, goals, and more..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-lg outline-none"
          />
          <div className="flex items-center space-x-2 ml-3">
            <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded">
              ↑↓
            </kbd>
            <kbd className="px-2 py-1 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded">
              ↵
            </kbd>
            <button
              onClick={onClose}
              className="p-1 rounded-md hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        {query.length > 0 && (
          <div className="flex items-center space-x-2 p-3 border-b border-gray-100 bg-gray-50">
            <Filter className="h-4 w-4 text-gray-500" />
            <div className="flex space-x-1 overflow-x-auto">
              {filterOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setFilter(option.value)}
                  className={cn(
                    'flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors',
                    filter === option.value
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  )}
                >
                  <option.icon className="h-3 w-3" />
                  <span>{option.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results */}
        <div className="max-h-80 overflow-y-auto">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
              <p className="text-gray-500 mt-2">Searching...</p>
            </div>
          ) : query.length > 0 ? (
            results.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {results.map((result, index) => (
                  <div
                    key={result.id}
                    className={cn(
                      'p-4 cursor-pointer transition-colors',
                      selectedIndex === index ? 'bg-primary-50' : 'hover:bg-gray-50'
                    )}
                    onClick={() => handleResultClick(result)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        {getTypeIcon(result.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-sm font-medium text-gray-900 truncate">
                            {result.title}
                          </h3>
                          <Badge variant="secondary" size="sm">
                            {getTypeLabel(result.type)}
                          </Badge>
                          {result.relevanceScore && result.relevanceScore > 90 && (
                            <Badge variant="success" size="sm">
                              <Zap className="h-3 w-3 mr-1" />
                              Best Match
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mb-1 line-clamp-1">
                          {result.description}
                        </p>
                        {result.metadata && (
                          <p className="text-xs text-gray-500">
                            {result.metadata}
                          </p>
                        )}
                      </div>
                      <ArrowRight className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center">
                <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No results found for "{query}"</p>
                <p className="text-sm text-gray-400 mt-1">
                  Try searching for resumes, assessments, goals, or learning paths
                </p>
              </div>
            )
          ) : (
            /* Recent Searches & Quick Actions */
            <div className="p-4">
              {recentSearches.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-900">Recent Searches</h3>
                    <button
                      onClick={clearRecentSearches}
                      className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="space-y-2">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleRecentSearch(search)}
                        className="flex items-center space-x-3 w-full text-left p-2 rounded-lg hover:bg-gray-50 transition-colors group"
                      >
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-700 flex-1">{search}</span>
                        <ArrowRight className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    <FileText className="h-4 w-4 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Create Resume</p>
                      <p className="text-xs text-gray-500">Build a new resume</p>
                    </div>
                  </button>
                  <button className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    <Brain className="h-4 w-4 text-purple-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Take Assessment</p>
                      <p className="text-xs text-gray-500">Discover your strengths</p>
                    </div>
                  </button>
                  <button className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    <Target className="h-4 w-4 text-green-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Set Goal</p>
                      <p className="text-xs text-gray-500">Define career objectives</p>
                    </div>
                  </button>
                  <button className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left">
                    <MessageSquare className="h-4 w-4 text-red-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Practice Interview</p>
                      <p className="text-xs text-gray-500">Improve your skills</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GlobalSearch;