import React from 'react';
import { Code2 } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return <Code2 className={className} />;
};

export default Logo;