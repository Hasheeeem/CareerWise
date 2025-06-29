import { useEffect } from 'react';

interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  metaaKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  callback: () => void;
  description: string;
  preventDefault?: boolean;
}

export const useKeyboardShortcuts = (shortcuts: KeyboardShortcut[]) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const shortcut = shortcuts.find(s => 
        s.key.toLowerCase() === event.key.toLowerCase() &&
        !!s.ctrlKey === event.ctrlKey &&
        !!s.metaKey === event.metaKey &&
        !!s.shiftKey === event.shiftKey &&
        !!s.altKey === event.altKey
      );

      if (shortcut) {
        if (shortcut.preventDefault !== false) {
          event.preventDefault();
        }
        shortcut.callback();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
};

// Common shortcuts
export const commonShortcuts = {
  search: { key: 'k', ctrlKey: true, description: 'Open search' },
  newItem: { key: 'n', ctrlKey: true, description: 'Create new item' },
  save: { key: 's', ctrlKey: true, description: 'Save' },
  help: { key: '?', description: 'Show help' },
  escape: { key: 'Escape', description: 'Close modal/dialog' }
};