import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number; // delay between elements in ms
  duration?: number; // duration of animation in seconds
  ease?: string;
  splitType?: 'chars' | 'words';
  from?: React.CSSProperties & { y?: number | string; x?: number | string; scale?: number };
  to?: React.CSSProperties & { y?: number | string; x?: number | string; scale?: number };
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  onLetterAnimationComplete?: () => void;
  showCallback?: boolean;
}

export default function SplitText({
  text,
  className = '',
  delay = 30, // default stagger delay
  duration = 0.8,
  ease = 'easeOut',
  splitType = 'chars',
  from = { opacity: 0, y: 25 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-50px',
  textAlign = 'center',
  tag = 'p',
  onLetterAnimationComplete
}: SplitTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, {
    once: true,
    amount: threshold,
    margin: rootMargin as any
  });

  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      if (onLetterAnimationComplete) {
        // Trigger complete callback after total duration + stagger delay completes
        const totalDuration = (duration + (items.length * delay) / 1000) * 1000;
        const timer = setTimeout(() => {
          onLetterAnimationComplete();
        }, totalDuration);
        return () => clearTimeout(timer);
      }
    }
  }, [isInView, hasAnimated]);

  // Handle CSS Easing conversion if standard cubic-bezier mapping is needed
  const getTransitionEase = (easeStr: string) => {
    if (easeStr.startsWith('power')) {
      if (easeStr.includes('out')) return [0.25, 1, 0.5, 1]; // standard smooth cubic
      if (easeStr.includes('inOut')) return [0.76, 0, 0.24, 1];
    }
    if (easeStr === 'backOut') return [0.34, 1.56, 0.64, 1];
    return easeStr;
  };

  const items = splitType === 'chars' ? text.split('') : text.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: delay / 1000,
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: from.opacity !== undefined ? from.opacity : 0,
      y: from.y !== undefined ? from.y : 0,
      x: from.x !== undefined ? from.x : 0,
      scale: from.scale !== undefined ? from.scale : 1
    },
    visible: { 
      opacity: to.opacity !== undefined ? to.opacity : 1,
      y: to.y !== undefined ? to.y : 0,
      x: to.x !== undefined ? to.x : 0,
      scale: to.scale !== undefined ? to.scale : 1,
      transition: {
        duration: duration,
        ease: getTransitionEase(ease)
      }
    }
  };

  const Tag = tag;

  return (
    <div 
      ref={containerRef} 
      className="inline-block w-full"
      style={{ textAlign }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="inline-block"
      >
        <Tag className={`inline-block whitespace-normal ${className}`}>
          {splitType === 'chars' ? (
            text.split(' ').map((word, wordIdx, wordArr) => (
              <span key={wordIdx} className="inline-block whitespace-nowrap">
                {word.split('').map((char, charIdx) => (
                  <motion.span
                    key={charIdx}
                    variants={itemVariants}
                    className="inline-block"
                    style={{ willChange: 'transform, opacity' }}
                  >
                    {char}
                  </motion.span>
                ))}
                {wordIdx < wordArr.length - 1 && (
                  <span className="inline-block">&nbsp;</span>
                )}
              </span>
            ))
          ) : (
            items.map((word, idx) => (
              <motion.span
                key={idx}
                variants={itemVariants}
                className="inline-block mr-1.5"
                style={{ willChange: 'transform, opacity' }}
              >
                {word}
              </motion.span>
            ))
          )}
        </Tag>
      </motion.div>
    </div>
  );
}
