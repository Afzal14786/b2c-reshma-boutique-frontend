import { useEffect, useCallback } from 'react';

export function useScrollLock(lock: boolean = true) {
  const lockScroll = useCallback(() => {
    document.body.style.overflow = 'hidden';
  }, []);

  const unlockScroll = useCallback(() => {
    document.body.style.overflow = '';
  }, []);

  useEffect(() => {
    if (lock) {
      lockScroll();
    } else {
      unlockScroll();
    }
    return unlockScroll;
  }, [lock, lockScroll, unlockScroll]);
}