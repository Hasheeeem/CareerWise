import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import Button from './Button';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  actionText,
  onAction,
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: {
      container: 'py-8',
      icon: 'h-12 w-12',
      title: 'text-base',
      description: 'text-sm',
      maxWidth: 'max-w-sm'
    },
    md: {
      container: 'py-12',
      icon: 'h-16 w-16',
      title: 'text-lg',
      description: 'text-base',
      maxWidth: 'max-w-md'
    },
    lg: {
      container: 'py-16',
      icon: 'h-20 w-20',
      title: 'text-xl',
      description: 'text-lg',
      maxWidth: 'max-w-lg'
    }
  };

  const styles = sizeClasses[size];

  return (
    <div className={`text-center ${styles.container} ${className}`}>
      <Icon className={`${styles.icon} text-gray-300 mx-auto mb-4`} />
      <h3 className={`${styles.title} font-medium text-gray-900 mb-2`}>{title}</h3>
      <p className={`text-gray-600 mb-6 ${styles.maxWidth} mx-auto ${styles.description}`}>
        {description}
      </p>
      {actionText && onAction && (
        <Button onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;