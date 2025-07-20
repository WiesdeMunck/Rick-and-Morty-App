import { useState, useEffect } from 'react';

export default function useIsWidthUnder(limit) {
  const [isUnder, setIsUnder] = useState(() => window.innerWidth < limit);

  useEffect(() => {
    const handleResize = () => setIsUnder(window.innerWidth < limit);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [limit]);

  return isUnder;
}
