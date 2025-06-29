import React, { useState } from 'react';
import { 
  HelpCircle, 
  X, 
  Search, 
  Book, 
  MessageSquare, 
  Video,
  FileText,
  ExternalLink,
  ChevronRight,
  Star,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { cn } from '../../lib/utils';
import Modal from './Modal';
import Input from './Input';
import Button from './Button';
import Badge from './Badge';

interface HelpArticle {
  id: string;
  title: string;
  description: string;
  category: string;
  type: 'article' | 'video' | 'guide';
  readTime?: string;
  rating: number;
  helpful: number;
  url: string;
}

interface HelpCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

const HelpCenter: React.FC<HelpCenterProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedArticle, setSelectedArticle] = useState<HelpArticle | null>(null);

  const categories = [
    { id: 'all', name: 'All Topics', icon: Book },
    { id: 'getting-started', name: 'Getting Started', icon: Star },
    { id: 'resumes', name: 'Resumes', icon: FileText },
    { id: 'assessments', name: 'Assessments', icon: HelpCircle },
    { id: 'interviews', name: 'Interviews', icon: MessageSquare },
    { id: 'goals', name: 'Goals & Planning', icon: Star },
    { id: 'account', name: 'Account & Billing', icon: HelpCircle }
  ];

  const helpArticles: HelpArticle[] = [
    {
      id: '1',
      title: 'Getting Started with CareerWise',
      description: 'Learn the basics of using CareerWise to advance your career',
      category: 'getting-started',
      type: 'guide',
      readTime: '5 min read',
      rating: 4.8,
      helpful: 156,
      url: '#'
    },
    {
      id: '2',
      title: 'How to Create an ATS-Friendly Resume',
      description: 'Best practices for building resumes that pass applicant tracking systems',
      category: 'resumes',
      type: 'article',
      readTime: '8 min read',
      rating: 4.9,
      helpful: 243,
      url: '#'
    },
    {
      id: '3',
      title: 'Understanding Your Assessment Results',
      description: 'How to interpret and use your personality and skills assessment results',
      category: 'assessments',
      type: 'video',
      readTime: '12 min watch',
      rating: 4.7,
      helpful: 189,
      url: '#'
    },
    {
      id: '4',
      title: 'Preparing for Behavioral Interviews',
      description: 'Master the STAR method and common behavioral interview questions',
      category: 'interviews',
      type: 'guide',
      readTime: '10 min read',
      rating: 4.8,
      helpful: 312,
      url: '#'
    },
    {
      id: '5',
      title: 'Setting SMART Career Goals',
      description: 'Learn how to set specific, measurable, achievable career objectives',
      category: 'goals',
      type: 'article',
      readTime: '6 min read',
      rating: 4.6,
      helpful: 198,
      url: '#'
    },
    {
      id: '6',
      title: 'Managing Your Subscription',
      description: 'How to upgrade, downgrade, or cancel your CareerWise subscription',
      category: 'account',
      type: 'article',
      readTime: '3 min read',
      rating: 4.5,
      helpful: 87,
      url: '#'
    }
  ];

  const filteredArticles = helpArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4 text-red-500" />;
      case 'guide':
        return <Book className="h-4 w-4 text-blue-500" />;
      default:
        return <FileText className="h-4 w-4 text-green-500" />;
    }
  };

  const getTypeBadge = (type: string) => {
    switch (type) {
      case 'video':
        return <Badge variant="error" size="sm">Video</Badge>;
      case 'guide':
        return <Badge variant="info" size="sm">Guide</Badge>;
      default:
        return <Badge variant="success" size="sm">Article</Badge>;
    }
  };

  const popularQuestions = [
    'How do I update my resume?',
    'What do my assessment scores mean?',
    'How can I practice interviews?',
    'How do I set career goals?',
    'Can I export my resume as PDF?'
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Help Center" size="xl">
      <div className="space-y-6">
        {/* Search */}
        <div className="relative">
          <Input
            placeholder="Search help articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            leftIcon={<Search className="h-4 w-4 text-gray-400" />}
          />
        </div>

        {/* Popular Questions */}
        {!searchQuery && (
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Popular Questions</h3>
            <div className="space-y-2">
              {popularQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setSearchQuery(question)}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{question}</span>
                    <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Categories */}
        <div>
          <h3 className="text-sm font-medium text-gray-900 mb-3">Browse by Category</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  'flex items-center space-x-2 p-3 rounded-lg border transition-colors text-left',
                  selectedCategory === category.id
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                )}
              >
                <category.icon className="h-4 w-4" />
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Articles */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-medium text-gray-900">
              {searchQuery ? `Search Results (${filteredArticles.length})` : 'Help Articles'}
            </h3>
            {selectedCategory !== 'all' && (
              <button
                onClick={() => setSelectedCategory('all')}
                className="text-sm text-primary-600 hover:text-primary-700"
              >
                View all categories
              </button>
            )}
          </div>

          {filteredArticles.length > 0 ? (
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {filteredArticles.map((article) => (
                <div
                  key={article.id}
                  className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => setSelectedArticle(article)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        {getTypeIcon(article.type)}
                        <h4 className="text-sm font-medium text-gray-900">{article.title}</h4>
                        {getTypeBadge(article.type)}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{article.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>{article.readTime}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span>{article.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <ThumbsUp className="h-3 w-3" />
                          <span>{article.helpful}</span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <HelpCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No articles found matching your search</p>
            </div>
          )}
        </div>

        {/* Contact Support */}
        <div className="border-t border-gray-200 pt-6">
          <div className="bg-gradient-to-r from-primary-50 to-blue-50 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <MessageSquare className="h-5 w-5 text-primary-600 mt-0.5" />
              <div className="flex-1">
                <h4 className="text-sm font-medium text-gray-900 mb-1">
                  Still need help?
                </h4>
                <p className="text-sm text-gray-600 mb-3">
                  Can't find what you're looking for? Our support team is here to help.
                </p>
                <div className="flex space-x-3">
                  <Button size="sm" variant="primary">
                    Contact Support
                  </Button>
                  <Button size="sm" variant="outline">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Live Chat
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <Modal
          isOpen={!!selectedArticle}
          onClose={() => setSelectedArticle(null)}
          title={selectedArticle.title}
          size="lg"
        >
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              {getTypeBadge(selectedArticle.type)}
              <span className="text-sm text-gray-500">{selectedArticle.readTime}</span>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-600">{selectedArticle.rating}</span>
              </div>
            </div>
            
            <p className="text-gray-700">{selectedArticle.description}</p>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-sm text-gray-600 mb-3">
                This article will help you understand the key concepts and provide step-by-step guidance.
              </p>
              <Button className="w-full">
                <ExternalLink className="h-4 w-4 mr-2" />
                Read Full Article
              </Button>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <p className="text-sm text-gray-600 mb-3">Was this article helpful?</p>
              <div className="flex space-x-3">
                <Button size="sm" variant="outline">
                  <ThumbsUp className="h-4 w-4 mr-2" />
                  Yes
                </Button>
                <Button size="sm" variant="outline">
                  <ThumbsDown className="h-4 w-4 mr-2" />
                  No
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </Modal>
  );
};

export default HelpCenter;