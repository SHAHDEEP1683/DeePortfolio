"use client";

import { useState, useEffect } from 'react';

type TypewriterProps = {
  text: string;
  speed?: number;
  className?: string;
};

const Typewriter = ({ text, speed = 150, className }: TypewriterProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeoutId);
    }
  }, [index, text, speed]);

  return <span className={className}>{displayedText}</span>;
};

export default Typewriter;
