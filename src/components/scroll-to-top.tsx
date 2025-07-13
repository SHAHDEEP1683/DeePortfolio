"use client";

import { useEffect } from 'react';

const ScrollToTop = () => {
  useEffect(() => {
    // This will run when the component mounts, scrolling the window to the top.
    window.scrollTo(0, 0);
  }, []);

  return null; // This component does not render anything.
};

export default ScrollToTop;
