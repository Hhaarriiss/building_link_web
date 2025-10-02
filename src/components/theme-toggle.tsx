'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = theme === 'dark' || (theme === 'system' && 
    window.matchMedia('(prefers-color-scheme: dark)').matches);

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return (
    <div className="flex items-center justify-between gap-2 px-2 py-1.5 rounded-lg hover:bg-sidebar-accent group transition-colors">
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-sidebar-primary/10 group-hover:bg-sidebar-primary/15 transition-colors">
          {isDark ? (
            <Moon className="h-4 w-4 text-sidebar-foreground" />
          ) : (
            <Sun className="h-4 w-4 text-sidebar-foreground" />
          )}
        </div>
        <Label 
          htmlFor="theme-toggle" 
          className="text-sm font-medium text-sidebar-foreground cursor-pointer"
        >
          {isDark ? 'Dark Mode' : 'Light Mode'}
        </Label>
      </div>
      <Switch
        id="theme-toggle"
        checked={isDark}
        onCheckedChange={toggleTheme}
        aria-label="Toggle theme"
      />
    </div>
  );
}
