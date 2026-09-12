import React from 'react';
import {
  ShoppingBagIcon,
  UserIcon,
  Volume2Icon,
  VolumeXIcon,
  SparklesIcon,
  EyeIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  PackageIcon,
  ClockIcon,
  XIcon,
  PlusIcon,
  CheckIcon,
  Trash2Icon,
} from '@animateicons/react/lucide';

export const AnimatedCartIcon: React.FC<{ size?: number; className?: string; color?: string }> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => {
  return (
    <span className={`inline-flex items-center justify-center transition-transform hover:scale-110 ${className}`}>
      <ShoppingBagIcon size={size} color={color} />
    </span>
  );
};

export const AnimatedUserIcon: React.FC<{ size?: number; className?: string; color?: string }> = ({
  size = 14,
  className = '',
  color = 'currentColor',
}) => {
  return (
    <span className={`inline-flex items-center justify-center transition-transform hover:scale-110 ${className}`}>
      <UserIcon size={size} color={color} />
    </span>
  );
};

export const AnimatedSoundIcon: React.FC<{ muted?: boolean; size?: number; className?: string; color?: string }> = ({
  muted = false,
  size = 15,
  className = '',
  color = 'currentColor',
}) => {
  return (
    <span className={`inline-flex items-center justify-center transition-transform hover:scale-110 ${className}`}>
      {muted ? <VolumeXIcon size={size} color={color} /> : <Volume2Icon size={size} color={color} />}
    </span>
  );
};

export const AnimatedEyeIcon: React.FC<{ size?: number; className?: string; color?: string }> = ({
  size = 14,
  className = '',
  color = 'currentColor',
}) => {
  return (
    <span className={`inline-flex items-center justify-center transition-transform hover:scale-110 ${className}`}>
      <EyeIcon size={size} color={color} />
    </span>
  );
};

export const AnimatedSparklesIcon: React.FC<{ size?: number; className?: string; color?: string }> = ({
  size = 15,
  className = '',
  color = 'currentColor',
}) => {
  return (
    <span className={`inline-flex items-center justify-center transition-transform hover:scale-110 ${className}`}>
      <SparklesIcon size={size} color={color} />
    </span>
  );
};

export const AnimatedArrowRightIcon: React.FC<{ size?: number; className?: string; color?: string }> = ({
  size = 15,
  className = '',
  color = 'currentColor',
}) => {
  return (
    <span className={`inline-flex items-center justify-center transition-transform hover:translate-x-0.5 ${className}`}>
      <ArrowRightIcon size={size} color={color} />
    </span>
  );
};

export const AnimatedShieldIcon: React.FC<{ size?: number; className?: string; color?: string }> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => {
  return (
    <span className={`inline-flex items-center justify-center transition-transform hover:scale-110 ${className}`}>
      <ShieldCheckIcon size={size} color={color} />
    </span>
  );
};

export const AnimatedPackageIcon: React.FC<{ size?: number; className?: string; color?: string }> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => {
  return (
    <span className={`inline-flex items-center justify-center transition-transform hover:scale-110 ${className}`}>
      <PackageIcon size={size} color={color} />
    </span>
  );
};

export const AnimatedClockIcon: React.FC<{ size?: number; className?: string; color?: string }> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => {
  return (
    <span className={`inline-flex items-center justify-center transition-transform hover:scale-110 ${className}`}>
      <ClockIcon size={size} color={color} />
    </span>
  );
};

export const AnimatedCloseIcon: React.FC<{ size?: number; className?: string; color?: string }> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => {
  return (
    <span className={`inline-flex items-center justify-center transition-transform hover:rotate-90 duration-300 ${className}`}>
      <XIcon size={size} color={color} />
    </span>
  );
};

export const AnimatedPlusIcon: React.FC<{ size?: number; className?: string; color?: string }> = ({
  size = 14,
  className = '',
  color = 'currentColor',
}) => {
  return (
    <span className={`inline-flex items-center justify-center transition-transform hover:scale-125 ${className}`}>
      <PlusIcon size={size} color={color} />
    </span>
  );
};

export const AnimatedCheckIcon: React.FC<{ size?: number; className?: string; color?: string }> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => {
  return (
    <span className={`inline-flex items-center justify-center transition-transform hover:scale-110 ${className}`}>
      <CheckIcon size={size} color={color} />
    </span>
  );
};

export const AnimatedTrashIcon: React.FC<{ size?: number; className?: string; color?: string }> = ({
  size = 16,
  className = '',
  color = 'currentColor',
}) => {
  return (
    <span className={`inline-flex items-center justify-center transition-transform hover:scale-110 text-red-500 ${className}`}>
      <Trash2Icon size={size} color={color} />
    </span>
  );
};
