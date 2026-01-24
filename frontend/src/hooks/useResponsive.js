import { useState, useEffect } from 'react';

/**
 * Hook to detect responsive breakpoints
 * Returns an object with boolean values for different screen sizes
 * 
 * @returns {Object} Responsive breakpoints
 * - isMobile: screen width < 600px
 * - isTablet: screen width >= 600px and < 1024px
 * - isDesktop: screen width >= 1024px
 * - isSmallDesktop: screen width >= 1024px and < 1440px
 * - isLargeDesktop: screen width >= 1440px
 */
export const useResponsive = () => {
  const [breakpoint, setBreakpoint] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isSmallDesktop: false,
    isLargeDesktop: false,
    width: 0,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      setBreakpoint({
        isMobile: width < 600,
        isTablet: width >= 600 && width < 1024,
        isDesktop: width >= 1024,
        isSmallDesktop: width >= 1024 && width < 1440,
        isLargeDesktop: width >= 1440,
        width,
      });
    };

    // Initial call
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
};

export default useResponsive;
