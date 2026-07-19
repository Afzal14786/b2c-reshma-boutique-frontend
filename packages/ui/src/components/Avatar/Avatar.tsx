import React from 'react';

export interface AvatarProps {
  src?: string | null;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  /** Optional: use glass effect for fallback avatar (default: true) */
  glass?: boolean;
}

const sizeMap = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-14 h-14 text-lg',
  xl: 'w-20 h-20 text-2xl',
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  name,
  size = 'md',
  className = '',
  glass = true,
}) => {
  const initials = name
    ? name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : '';

  // If there's a valid image source, render the image
  if (src) {
    return (
      <img
        src={src}
        alt={name || 'Avatar'}
        className={`
          rounded-full object-cover 
          border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)]
          ${sizeMap[size]} ${className}
        `}
      />
    );
  }

  // Fallback: initials or "?" with glass effect
  const fallbackClasses = `
    rounded-full flex items-center justify-center font-medium
    border border-[rgba(0,0,0,0.08)] dark:border-[rgba(255,255,255,0.08)]
    ${glass 
      ? 'bg-[rgba(246,246,246,0.6)] dark:bg-[rgba(30,30,30,0.5)] backdrop-blur-[10px] saturate-[140%] dark:backdrop-blur-[20px] text-text-primary' 
      : 'bg-secondary/20 text-secondary'
    }
    ${sizeMap[size]} ${className}
  `;

  return (
    <div className={fallbackClasses}>
      {initials || '?'}
    </div>
  );
};