import React from 'react';
import { cn } from '../../lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  color?: 'primary' | 'white' | 'gray';
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className,
  color = 'primary'
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const colorClasses = {
    primary: 'border-gray-300 border-t-primary-600',
    white: 'border-gray-300 border-t-white',
    gray: 'border-gray-300 border-t-gray-600'
  };

  return (
    <div className={cn(
      'animate-spin rounded-full border-2',
      sizeClasses[size],
      colorClasses[color],
      className
    )} />
  );
};

export const PageLoader: React.FC = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <LoadingSpinner size="xl" className="mx-auto mb-4" />
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

export const ButtonLoader: React.FC<{ className?: string }> = ({ className }) => (
  <LoadingSpinner size="sm" color="white" className={cn('mr-2', className)} />
);

export const InlineLoader: React.FC<{ text?: string }> = ({ text = 'Loading...' }) => (
  <div className="flex items-center justify-center py-8">
    <LoadingSpinner size="md" className="mr-3" />
    <span className="text-gray-600">{text}</span>
  </div>
);

export default LoadingSpinner;