import { MoonIcon, SunIcon } from 'lucide-react';

import { Button } from './ButtonTemp';
import { useTheme } from '../providers/ThemeProvider/useTheme';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const handleClick = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Button onClick={handleClick} size="icon" variant="outline">
      {theme === 'light' ? <MoonIcon /> : <SunIcon />}
    </Button>
  );
}
