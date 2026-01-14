import { IconButton } from '@radix-ui/themes';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const handleClick = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <IconButton onClick={handleClick} variant="ghost">
      {theme === 'light' ? (
        <MoonIcon color="black" size={16} />
      ) : (
        <SunIcon color="white" size={16} />
      )}
    </IconButton>
  );
}
