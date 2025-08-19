import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  ReactNode,
  TouchEvent,
  WheelEvent,
} from 'react';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = 'image',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
}: ScrollExpandMediaProps) => {
  const [showContent, setShowContent] = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);
  
  // Use Framer Motion's spring for smooth animations - 50% faster total
  const scrollProgress = useMotionValue(0);
  const smoothProgress = useSpring(scrollProgress, {
    stiffness: 500,
    damping: 20,
    mass: 0.5
  });

  useEffect(() => {
    scrollProgress.set(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
  }, [mediaType, scrollProgress]);

  // Control body overflow and position to prevent background scrolling
  useEffect(() => {
    if (!mediaFullyExpanded) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = '0';
      document.body.style.left = '0';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.position = 'static';
      document.body.style.top = 'auto';
      document.body.style.left = 'auto';
      document.body.style.width = 'auto';
      document.body.style.height = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.position = 'static';
      document.body.style.top = 'auto';
      document.body.style.left = 'auto';
      document.body.style.width = 'auto';
      document.body.style.height = 'auto';
    };
  }, [mediaFullyExpanded]);

  // Smooth progress tracking
  const updateProgress = useCallback((delta: number) => {
    const current = scrollProgress.get();
    const newProgress = Math.min(Math.max(current + delta, 0), 1);
    scrollProgress.set(newProgress);

    if (newProgress >= 0.99 && !mediaFullyExpanded) {
      // Use RAF for smooth transition to fully expanded
      requestAnimationFrame(() => {
        setMediaFullyExpanded(true);
        setShowContent(true);
        // Dispatch event for nav to appear and allow normal scrolling
        setTimeout(() => {
          const contentShowEvent = new Event('heroContentShown');
          window.dispatchEvent(contentShowEvent);
          // Allow normal scrolling to next sections
          document.body.style.overflow = 'auto';
          document.body.style.position = 'static';
        }, 200);
      });
    } else if (newProgress < 0.75 && showContent) {
      setShowContent(false);
    }
  }, [scrollProgress, mediaFullyExpanded, showContent]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (mediaFullyExpanded) {
        // Allow normal scrolling when fully expanded
        return;
      }
      
      e.preventDefault();
      
      if (!mediaFullyExpanded) {
        // Much smoother scroll delta with momentum consideration - 50% faster total
        const normalizedDelta = Math.max(-10, Math.min(10, e.deltaY));
        const scrollDelta = (normalizedDelta / 10) * 0.015;
        updateProgress(scrollDelta);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return;
      if (mediaFullyExpanded) return; // Allow normal touch scrolling when expanded

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      e.preventDefault();

      if (!mediaFullyExpanded) {
        // Much smoother touch handling with momentum - 50% faster total
        const normalizedDelta = Math.max(-50, Math.min(50, deltaY));
        const touchDelta = (normalizedDelta / 50) * 0.022;
        updateProgress(touchDelta);
        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = (): void => {
      setTouchStartY(0);
    };

    const handleScroll = (): void => {
      if (!mediaFullyExpanded) {
        // Force scroll to stay at top during expansion
        if (window.scrollY !== 0) {
          window.scrollTo(0, 0);
        }
      } else {
        // Allow normal scrolling only when media is fully expanded
        const scrollPosition = window.scrollY;
        if (scrollPosition <= 5) {
          // User scrolled back to very top, allow them to go back to expansion mode
          return;
        }
      }
    };

    const handleReset = () => {
      scrollProgress.set(0);
      setShowContent(false);
      setMediaFullyExpanded(false);
    };

    // Add event listeners only during expansion phase
    const scrollElement = sectionRef.current;
    
    if (!mediaFullyExpanded) {
      window.addEventListener('wheel', handleWheel as unknown as EventListener, {
        passive: false,
      });
      window.addEventListener('scroll', handleScroll as EventListener, { passive: false });
      window.addEventListener(
        'touchstart',
        handleTouchStart as unknown as EventListener,
        { passive: false }
      );
      window.addEventListener(
        'touchmove',
        handleTouchMove as unknown as EventListener,
        { passive: false }
      );
      window.addEventListener('touchend', handleTouchEnd as EventListener);
    }
    
    window.addEventListener('resetSection', handleReset as EventListener);
    
    // Also prevent scrolling on the element itself during expansion
    if (scrollElement && !mediaFullyExpanded) {
      scrollElement.addEventListener('wheel', handleWheel as unknown as EventListener, {
        passive: false,
      });
      scrollElement.addEventListener('scroll', handleScroll as EventListener, { passive: false });
    }

    return () => {
      window.removeEventListener(
        'wheel',
        handleWheel as unknown as EventListener
      );
      window.removeEventListener('scroll', handleScroll as EventListener);
      window.removeEventListener(
        'touchstart',
        handleTouchStart as unknown as EventListener
      );
      window.removeEventListener(
        'touchmove',
        handleTouchMove as unknown as EventListener
      );
      window.removeEventListener('touchend', handleTouchEnd as EventListener);
      window.removeEventListener('resetSection', handleReset as EventListener);
      
      // Remove element-specific listeners
      if (scrollElement) {
        scrollElement.removeEventListener(
          'wheel',
          handleWheel as unknown as EventListener
        );
        scrollElement.removeEventListener('scroll', handleScroll as EventListener);
      }
    };
  }, [mediaFullyExpanded, touchStartY, updateProgress, scrollProgress]);

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Much smoother easing with continuous curve
  const easeOutCubic = (t: number): number => {
    return 1 - Math.pow(1 - t, 3);
  };

  // Transform the smooth progress using easing
  const easedProgress = useTransform(smoothProgress, [0, 1], [0, 1], {
    ease: easeOutCubic
  });
  
  // Animated values derived from the eased progress - original dimensions
  const mediaWidth = useTransform(easedProgress, [0, 1], [300, isMobileState ? 950 : 1550]);
  const mediaHeight = useTransform(easedProgress, [0, 1], [400, isMobileState ? 600 : 800]);
  const textTranslateX = useTransform(easedProgress, [0, 1], [0, isMobileState ? 180 : 150]);
  const backgroundOpacity = useTransform(smoothProgress, [0, 1], [1, 0]);

  // Keep title as one line instead of splitting

  return (
    <div
      ref={sectionRef}
      className='transition-colors duration-700 ease-in-out overflow-x-hidden'
      style={{
        position: mediaFullyExpanded ? 'relative' : 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: mediaFullyExpanded ? 'auto' : '100vh',
        zIndex: mediaFullyExpanded ? 'auto' : 9999,
      }}
    >
      <section className='relative flex flex-col items-center justify-start min-h-[100dvh]'>
        <div className='relative w-full flex flex-col items-center min-h-[100dvh]'>
          <motion.div
            className='absolute inset-0 z-0 h-full'
            style={{ opacity: backgroundOpacity }}
          >
            <img
              src={bgImageSrc}
              alt='Background'
              className='w-screen h-screen object-cover'
              style={{
                objectPosition: 'center',
              }}
            />
            <div className='absolute inset-0 bg-black/10' />
          </motion.div>

          <div className='container mx-auto flex flex-col items-center justify-start relative z-10'>
            <div className='flex flex-col items-center justify-center w-full h-[100dvh] relative'>
              <motion.div
                className='absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl'
                style={{
                  width: mediaWidth,
                  height: mediaHeight,
                  maxWidth: '95vw',
                  maxHeight: '85vh',
                  boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.3)',
                }}
              >
                {mediaType === 'video' ? (
                  <div className='relative w-full h-full pointer-events-none'>
                    <video
                      src={mediaSrc}
                      poster={posterSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload='auto'
                      className='w-full h-full object-cover rounded-xl'
                      controls={false}
                    />
                    <div
                      className='absolute inset-0 z-10'
                      style={{ pointerEvents: 'none' }}
                    ></div>

                    <motion.div
                      className='absolute inset-0 bg-black/30 rounded-xl'
                      style={{ opacity: useTransform(smoothProgress, [0, 1], [0.7, 0.2]) }}
                    />
                  </div>
                ) : (
                  <div className='relative w-full h-full'>
                    <img
                      src={mediaSrc}
                      alt={title || 'Media content'}
                      className='w-full h-full object-cover rounded-xl'
                    />

                    <motion.div
                      className='absolute inset-0 bg-black/50 rounded-xl'
                      style={{ opacity: useTransform(smoothProgress, [0, 1], [0.7, 0.4]) }}
                    />
                  </div>
                )}

                <div className='flex flex-col items-center text-center relative z-10 mt-4'>
                  {date && (
                    <motion.p
                      className='text-2xl text-blue-200'
                      style={{ x: useTransform(textTranslateX, (x) => `-${x}vw`) }}
                    >
                      {date}
                    </motion.p>
                  )}
                  {scrollToExpand && (
                    <motion.p
                      className='text-blue-200 font-medium text-center'
                      style={{ x: useTransform(textTranslateX, (x) => `${x}vw`) }}
                    >
                      {scrollToExpand}
                    </motion.p>
                  )}
                </div>
              </motion.div>

              <div
                className={`flex items-center justify-center text-center w-full relative z-10 ${
                  textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
                }`}
              >
                <motion.h2
                  className='text-4xl md:text-5xl lg:text-6xl font-bold text-white whitespace-nowrap'
                  style={{ opacity: useTransform(easedProgress, [0, 0.3], [1, 0]) }}
                >
                  {title}
                </motion.h2>
              </div>
            </div>

            <motion.section
              className='absolute inset-0 w-full h-full'
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
            >
              {React.isValidElement(children) ? React.cloneElement(children as React.ReactElement<any>, { showContent }) : children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;