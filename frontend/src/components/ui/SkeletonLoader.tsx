import React from 'react';
import { cn } from '../../lib/utils';

interface SkeletonLoaderProps {
  className?: string;
  lines?: number;
  avatar?: boolean;
  width?: string;
  height?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ 
  className, 
  lines = 3, 
  avatar = false,
  width = 'w-full',
  height = 'h-4'
}) => {
  return (
    <div className={cn('animate-pulse', className)}>
      <div className="flex items-start space-x-4">
        {avatar && (
          <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0"></div>
        )}
        <div className="flex-1 space-y-3">
          {Array.from({ length: lines }).map((_, index) => (
            <div
              key={index}
              className={cn(
                'bg-gray-300 rounded',
                height,
                index === lines - 1 ? 'w-3/4' : width
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const CardSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('bg-white rounded-xl shadow-sm border border-gray-100 p-6', className)}>
    <SkeletonLoader lines={4} />
  </div>
);

export const StatCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
    <div className="animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 bg-gray-300 rounded-xl"></div>
        <div className="text-right">
          <div className="w-16 h-8 bg-gray-300 rounded mb-2"></div>
          <div className="w-12 h-3 bg-gray-300 rounded"></div>
        </div>
      </div>
      <div className="w-24 h-4 bg-gray-300 rounded"></div>
    </div>
  </div>
);

export const LearningPathSkeleton: React.FC = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    <div className="animate-pulse">
      <div className="w-full h-48 bg-gray-300"></div>
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <div className="w-16 h-4 bg-gray-300 rounded"></div>
          <div className="w-12 h-4 bg-gray-300 rounded"></div>
        </div>
        <div className="w-3/4 h-6 bg-gray-300 rounded mb-2"></div>
        <div className="w-full h-4 bg-gray-300 rounded mb-4"></div>
        <div className="flex items-center justify-between text-sm mb-4">
          <div className="w-16 h-4 bg-gray-300 rounded"></div>
          <div className="w-12 h-4 bg-gray-300 rounded"></div>
        </div>
        <div className="flex flex-wrap gap-1 mb-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-16 h-6 bg-gray-300 rounded-full"></div>
          ))}
        </div>
        <div className="w-full h-8 bg-gray-300 rounded"></div>
      </div>
    </div>
  </div>
);

export const GoalCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
    <div className="animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 bg-gray-300 rounded"></div>
          <div className="w-16 h-6 bg-gray-300 rounded-full"></div>
        </div>
        <div className="w-12 h-4 bg-gray-300 rounded"></div>
      </div>
      <div className="w-3/4 h-6 bg-gray-300 rounded mb-4"></div>
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="w-16 h-4 bg-gray-300 rounded"></div>
          <div className="w-8 h-4 bg-gray-300 rounded"></div>
        </div>
        <div className="w-full h-3 bg-gray-300 rounded"></div>
      </div>
      <div className="flex items-center justify-between mb-4">
        <div className="w-20 h-4 bg-gray-300 rounded"></div>
        <div className="w-16 h-4 bg-gray-300 rounded"></div>
      </div>
      <div className="flex items-center justify-between">
        <div className="w-12 h-4 bg-gray-300 rounded"></div>
        <div className="w-20 h-8 bg-gray-300 rounded"></div>
      </div>
    </div>
  </div>
);

export default SkeletonLoader;