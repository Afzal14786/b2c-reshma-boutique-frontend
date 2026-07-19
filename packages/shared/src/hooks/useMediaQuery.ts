import { useEffect, useState } from 'react';

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const listener = () => setMatches(media.matches);

    // Set initial value
    setMatches(media.matches);

    // Add listener
    media.addEventListener('change', listener);

    // Clean up
    return () => media.removeEventListener('change', listener);
  }, [query]);

  return matches;
}