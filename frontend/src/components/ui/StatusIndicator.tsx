import React from 'react';
import { cn } from '../../lib/utils';
import { CheckCircle, Clock, AlertCircle, XCircle, Loader } from 'lucide-react';

interface StatusIndicatorProps {
  status: 'success' | 'pending' | 'warning' | 'error' | 'loading';
  text?: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  className?: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
  status,
  text,
  size = 'md',
  showIcon = true,
  className
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'success':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          borderColor: 'border-green-200'
        };
      case 'pending':
        return {
          icon: Clock,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100',
          borderColor: 'border-yellow-200'
        };
      case 'warning':
        return {
          icon: AlertCircle,
          color: 'text-orange-600',
          bgColor: 'bg-orange-100',
          borderColor: 'border-orange-200'
        };
      case 'error':
        return {
          icon: XCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-100',
          borderColor: 'border-red-200'
        };
      case 'loading':
        return {
          icon: Loader,
          color: 'text-blue-600',
          bgColor: 'bg-blue-100',
          borderColor: 'border-blue-200'
        };
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          container: 'px-2 py-1',
          icon: 'h-3 w-3',
          text: 'text-xs'
        };
      case 'md':
        return {
          container: 'px-3 py-1.5',
          icon: 'h-4 w-4',
          text: 'text-sm'
        };
      case 'lg':
        return {
          container: 'px-4 py-2',
          icon: 'h-5 w-5',
          text: 'text-base'
        };
    }
  };

  const config = getStatusConfig();
  const sizeClasses = getSizeClasses();
  const Icon = config.icon;

  return (
    <div
      className={cn(
        'inline-flex items-center space-x-2 rounded-full border font-medium',
        config.bgColor,
        config.borderColor,
        sizeClasses.container,
        className
      )}
    >
      {showIcon && (
        <Icon
          className={cn(
            sizeClasses.icon,
            config.color,
            status === 'loading' && 'animate-spin'
          )}
        />
      )}
      {text && (
        <span className={cn(sizeClasses.text, config.color)}>
          {text}
        </span>
      )}
    </div>
  );
};

export default StatusIndicator;