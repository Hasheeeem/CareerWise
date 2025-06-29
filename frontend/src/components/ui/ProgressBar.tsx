import React from 'react';
import { cn } from '../../lib/utils';

interface ProgressBarProps {
  progress: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'green' | 'blue' | 'purple' | 'orange';
  showLabel?: boolean;
  animated?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  className,
  size = 'md',
  color = 'primary',
  showLabel = false,
  animated = true
}) => {
  const sizeClasses = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4'
  };

  const colorClasses = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600',
    green: 'bg-gradient-to-r from-green-500 to-green-600',
    blue: 'bg-gradient-to-r from-blue-500 to-blue-600',
    purple: 'bg-gradient-to-r from-purple-500 to-purple-600',
    orange: 'bg-gradient-to-r from-orange-500 to-orange-600'
  };

  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className={cn('w-full', className)}>
      <div className={cn(
        'w-full bg-gray-200 rounded-full overflow-hidden',
        sizeClasses[size]
      )}>
        <div
          className={cn(
            'h-full rounded-full transition-all duration-1000 ease-out',
            colorClasses[color],
            animated && 'transform-gpu'
          )}
          style={{ width: `${clampedProgress}%` }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between items-center mt-1">
          <span className="text-sm text-gray-600">Progress</span>
          <span className="text-sm font-medium text-gray-900">{clampedProgress}%</span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;