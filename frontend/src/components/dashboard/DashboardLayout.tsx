import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Brain, 
  MessageSquare, 
  BookOpen, 
  Target,
  Settings,
  User,
  Menu,
  X,
  Briefcase,
  Bell,
  Search,
  LogOut,
  Crown,
  BarChart3
} from 'lucide-react';
import { cn } from '../../lib/utils';
import NotificationCenter from '../notifications/NotificationCenter';
import GlobalSearch from '../search/GlobalSearch';
import { useKeyboardShortcuts, commonShortcuts } from '../../hooks/useKeyboardShortcuts';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Resume Builder', href: '/dashboard/resume', icon: FileText },
  { name: 'Assessments', href: '/dashboard/assessments', icon: Brain },
  { name: 'Interview Prep', href: '/dashboard/interview', icon: MessageSquare },
  { name: 'Learning Paths', href: '/dashboard/learning', icon: BookOpen },
  { name: 'Career Goals', href: '/dashboard/goals', icon: Target },
  { name: 'Analytics', href: '/dashboard/analytics', icon: BarChart3 },
];

const bottomNavigation = [
  { name: 'Profile', href: '/dashboard/profile', icon: User },
  { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();

  // Listen for global search shortcut
  useEffect(() => {
    const handleOpenSearch = () => setShowSearch(true);
    window.addEventListener('openGlobalSearch', handleOpenSearch);
    return () => window.removeEventListener('openGlobalSearch', handleOpenSearch);
  }, []);

  // Keyboard shortcuts
  useKeyboardShortcuts([
    {
      ...commonShortcuts.search,
      callback: () => setShowSearch(true)
    },
    {
      ...commonShortcuts.escape,
      callback: () => {
        setShowSearch(false);
        setShowNotifications(false);
        setSidebarOpen(false);
      }
    }
  ]);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Fixed positioning for desktop, overlay for mobile */}
      <div className={cn(
        'fixed inset-y-0 left-0 w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out border-r border-gray-200',
        'lg:translate-x-0 lg:static lg:inset-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                <Briefcase className="h-6 w-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-dark-900">
                  Career<span className="text-primary-600">Wise</span>
                </span>
                <div className="flex items-center space-x-1 mt-1">
                  <Crown className="h-3 w-3 text-yellow-500" />
                  <span className="text-xs text-gray-500 font-medium">Premium</span>
                </div>
              </div>
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group',
                    isActive
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/25'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className={cn(
                    'h-5 w-5 mr-3 transition-transform duration-200',
                    isActive ? 'text-white' : 'text-gray-500 group-hover:text-gray-700',
                    'group-hover:scale-110'
                  )} />
                  {item.name}
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Navigation */}
          <div className="px-4 py-4 border-t border-gray-100">
            <div className="space-y-2 mb-4">
              {bottomNavigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      'flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200',
                      isActive
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    )}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* User Profile */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-md">
                  <User className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">John Doe</p>
                  <p className="text-xs text-gray-500 truncate">john@example.com</p>
                </div>
                <button className="p-1 rounded-lg hover:bg-gray-200 transition-colors">
                  <LogOut className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 lg:px-6 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Menu className="h-5 w-5 text-gray-600" />
              </button>
              
              {/* Search */}
              <div className="hidden md:block relative">
                <button
                  onClick={() => setShowSearch(true)}
                  className="flex items-center space-x-2 w-80 px-3 py-2 text-left border border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                >
                  <Search className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-500">Search anything...</span>
                  <div className="ml-auto flex items-center space-x-1">
                    <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded">
                      ⌘
                    </kbd>
                    <kbd className="px-1.5 py-0.5 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded">
                      K
                    </kbd>
                  </div>
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Mobile Search */}
              <button
                onClick={() => setShowSearch(true)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Search className="h-5 w-5 text-gray-600" />
              </button>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Bell className="h-5 w-5 text-gray-600" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                </button>
                <NotificationCenter 
                  isOpen={showNotifications} 
                  onClose={() => setShowNotifications(false)} 
                />
              </div>

              {/* AI Chat Button */}
              <Link
                to="/chat"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-200 shadow-lg shadow-primary-500/25 font-medium"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                AI Chat
              </Link>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 xl:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Global Search Modal */}
      <GlobalSearch isOpen={showSearch} onClose={() => setShowSearch(false)} />
    </div>
  );
};

export default DashboardLayout;