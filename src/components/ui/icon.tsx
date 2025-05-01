import { icons } from 'lucide-react'; // This is correct

type IconProps = {
  name: keyof typeof icons;
  color?: string;
  size?: number;
  className?: string;
};

export const Icon = ({ name, color, size = 40, className }: IconProps) => {
  const LucideIcon = icons[name]; // Should access the icon by its name

  if (!LucideIcon) {
    console.error(`Icon not found: ${name}`); // Log an error if the icon is undefined
    return null; // Or return a fallback icon
  }

  return <LucideIcon color={color} size={size} className={className} />;
};
