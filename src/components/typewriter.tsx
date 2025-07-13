"use client";

import { useState, useEffect } from 'react';

type TypewriterProps = {
  textArray: string[];
  speed?: number;
  delay?: number;
  className?: string;
};

const Typewriter = ({ textArray, speed = 150, delay = 2000, className }: TypewriterProps) => {
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!textArray || textArray.length === 0) return;

    const handleTyping = () => {
      const currentText = textArray[textIndex];
      if (isDeleting) {
        if (charIndex > 0) {
          setDisplayedText(currentText.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % textArray.length);
        }
      } else {
        if (charIndex < currentText.length) {
          setDisplayedText(currentText.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), delay);
        }
      }
    };

    const timeoutId = setTimeout(handleTyping, isDeleting ? speed / 2 : speed);
    return () => clearTimeout(timeoutId);
  }, [charIndex, isDeleting, textIndex, textArray, speed, delay]);

  return <span className={className}>{displayedText}</span>;
};

export default Typewriter;
