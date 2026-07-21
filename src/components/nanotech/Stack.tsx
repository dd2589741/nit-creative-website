import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, PanInfo, animate } from 'motion/react';
import { Atom } from 'lucide-react';
import './Stack.css';

interface CardRotateProps {
  children: React.ReactNode;
  onSendToBack: () => void;
  sensitivity: number;
  disableDrag?: boolean;
  key?: React.Key;
}

function CardRotate({ children, onSendToBack, sensitivity, disableDrag = false }: CardRotateProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [60, -60]);
  const rotateY = useTransform(x, [-100, 100], [-60, 60]);

  function handleDragEnd(_event: any, info: PanInfo) {
    const swipeThreshold = Math.min(sensitivity, 60);
    const isSwiped = Math.abs(info.offset.x) > swipeThreshold || 
                    Math.abs(info.offset.y) > swipeThreshold || 
                    Math.abs(info.velocity.x) > 300 || 
                    Math.abs(info.velocity.y) > 300;

    if (isSwiped) {
      onSendToBack();
      animate(x, 0, { type: 'spring', stiffness: 300, damping: 30 });
      animate(y, 0, { type: 'spring', stiffness: 300, damping: 30 });
    } else {
      animate(x, 0, { type: 'spring', stiffness: 300, damping: 30 });
      animate(y, 0, { type: 'spring', stiffness: 300, damping: 30 });
    }
  }

  if (disableDrag) {
    return (
      <div className="card-rotate-disabled" style={{ transform: 'none' }}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className="card-rotate"
      style={{ x, y, rotateX, rotateY }}
      drag
      dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
      dragElastic={0.6}
      whileTap={{ cursor: 'grabbing' }}
      onDragEnd={handleDragEnd}
    >
      {children}
    </motion.div>
  );
}

interface StackProps {
  images?: string[];
  randomRotation?: boolean;
  sensitivity?: number;
  cards?: React.ReactNode[];
  animationConfig?: { stiffness: number; damping: number };
  sendToBackOnClick?: boolean;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  mobileClickOnly?: boolean;
  mobileBreakpoint?: number;
}

interface StackItem {
  id: number;
  content: React.ReactNode;
}

export default function Stack({
  images,
  randomRotation = false,
  sensitivity = 200,
  cards = [],
  animationConfig = { stiffness: 260, damping: 20 },
  sendToBackOnClick = false,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  mobileClickOnly = false,
  mobileBreakpoint = 768
}: StackProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < mobileBreakpoint);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [mobileBreakpoint]);

  const shouldDisableDrag = mobileClickOnly && isMobile;
  const shouldEnableClick = sendToBackOnClick || shouldDisableDrag;

  const [stack, setStack] = useState<StackItem[]>(() => {
    if (images && images.length) {
      return images.map((src, index) => ({
        id: index + 1,
        content: (
          <div className="relative w-full h-full bg-slate-50 border border-slate-200/60 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300">
              <Atom className="h-8 w-8 text-blue-500/20 animate-spin-slow mb-1" />
              <span className="text-[7.5px] font-mono tracking-widest uppercase text-slate-400 font-bold">ECE LAB</span>
            </div>
            <img 
              src={src} 
              alt={`lab-card-${index + 1}`} 
              className="absolute inset-0 w-full h-full object-cover rounded-2xl z-10"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              referrerPolicy="no-referrer"
            />
          </div>
        )
      }));
    } else if (cards && cards.length) {
      return cards.map((content, index) => ({ id: index + 1, content }));
    } else {
      return [
        {
          id: 1,
          content: (
            <img
              src="https://images.unsplash.com/photo-1517420784867-114f6e4d89a4?q=80&w=500&auto=format"
              alt="card-1"
              className="card-image"
              referrerPolicy="no-referrer"
            />
          )
        },
        {
          id: 2,
          content: (
            <img
              src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=500&auto=format"
              alt="card-2"
              className="card-image"
              referrerPolicy="no-referrer"
            />
          )
        },
        {
          id: 3,
          content: (
            <img
              src="https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?q=80&w=500&auto=format"
              alt="card-3"
              className="card-image"
              referrerPolicy="no-referrer"
            />
          )
        },
        {
          id: 4,
          content: (
            <img
              src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=500&auto=format"
              alt="card-4"
              className="card-image"
              referrerPolicy="no-referrer"
            />
          )
        }
      ];
    }
  });

  const lastImagesRef = React.useRef<string[] | undefined>(undefined);
  const lastCardsRef = React.useRef<React.ReactNode[] | undefined>(undefined);

  useEffect(() => {
    if (images && images.length) {
      const isDifferent = !lastImagesRef.current || 
                          images.length !== lastImagesRef.current.length ||
                          images.some((img, idx) => img !== lastImagesRef.current?.[idx]);
      if (isDifferent) {
        setStack(images.map((src, index) => ({
          id: index + 1,
          content: (
            <div className="relative w-full h-full bg-slate-50 border border-slate-200/60 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-300">
                <Atom className="h-8 w-8 text-blue-500/20 animate-spin-slow mb-1" />
                <span className="text-[7.5px] font-mono tracking-widest uppercase text-slate-400 font-bold">ECE LAB</span>
              </div>
              <img 
                src={src} 
                alt={`lab-card-${index + 1}`} 
                className="absolute inset-0 w-full h-full object-cover rounded-2xl z-10"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                referrerPolicy="no-referrer"
              />
            </div>
          )
        })));
        lastImagesRef.current = images;
      }
    } else if (cards && cards.length) {
      const isDifferent = !lastCardsRef.current || cards !== lastCardsRef.current;
      if (isDifferent) {
        setStack(cards.map((content, index) => ({ id: index + 1, content })));
        lastCardsRef.current = cards;
      }
    }
  }, [images, cards]);

  const sendToBack = (id: number) => {
    setStack(prev => {
      const newStack = [...prev];
      const index = newStack.findIndex(card => card.id === id);
      if (index === -1) return prev;
      const [card] = newStack.splice(index, 1);
      newStack.unshift(card);
      return newStack;
    });
  };

  useEffect(() => {
    if (autoplay && stack.length > 1 && !isPaused) {
      const interval = setInterval(() => {
        const topCardId = stack[stack.length - 1].id;
        sendToBack(topCardId);
      }, autoplayDelay);

      return () => clearInterval(interval);
    }
    return undefined;
  }, [autoplay, autoplayDelay, stack, isPaused]);

  return (
    <div
      className="stack-container"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
    >
      {stack.map((card, index) => {
        // Use a deterministic pseudo-random rotation based on card.id
        // so it remains stable across state updates and hover transitions
        const randomRotate = randomRotation ? ((card.id * 37.13) % 10) - 5 : 0;
        return (
          <CardRotate
            key={card.id}
            onSendToBack={() => sendToBack(card.id)}
            sensitivity={sensitivity}
            disableDrag={shouldDisableDrag}
          >
            <motion.div
              className="card"
              onClick={() => shouldEnableClick && sendToBack(card.id)}
              animate={{
                rotateZ: (stack.length - index - 1) * 4 + randomRotate,
                scale: 1 + index * 0.06 - stack.length * 0.06,
                transformOrigin: '90% 90%'
              }}
              initial={false}
              transition={{
                type: 'spring',
                stiffness: animationConfig.stiffness,
                damping: animationConfig.damping
              }}
            >
              {card.content}
            </motion.div>
          </CardRotate>
        );
      })}
    </div>
  );
}
