import * as LucideIcons from 'lucide-react';
import { LucideProps } from 'lucide-react';
import { ComponentType } from 'react';

interface LucideIconProps extends Omit<LucideProps, 'color' | 'size'> {
    icon: keyof typeof LucideIcons;
    color?: string;
    size?: 'small' | 'medium' | 'large' | number | string;
}

export const LucideIcon = ({ icon, color, size = 'medium', style, ...props }: LucideIconProps) => {
    const maybeIcon = LucideIcons[icon];

    // ✅ Ensure it's a valid React component
    const IconComponent = typeof maybeIcon === 'function' ? (maybeIcon as ComponentType<LucideProps>) : null;

    if (!IconComponent) {
        console.warn(`Lucide icon "${icon}" is not a valid component.`);
        return null;
    }

    const sizeMap: Record<string, number> = {
        small: 16,
        medium: 24,
        large: 32,
    };

    const resolvedSize = typeof size === 'string' && sizeMap[size] ? sizeMap[size] : size;

    return (
        <IconComponent
            color={color}
            size={resolvedSize}
            style={style}
            {...props}
        />
    );
};
