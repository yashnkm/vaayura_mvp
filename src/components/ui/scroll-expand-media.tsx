import {
  useEffect,
  useRef,
  useState,
  ReactNode,
  TouchEvent,
  WheelEvent,
} from 'react';
import { motion } from 'framer-motion';

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
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
  }, [mediaType]);

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

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (mediaFullyExpanded && e.deltaY < 0) {
        // Only allow scrolling back when scrolled to top
        if (window.scrollY <= 10) {
          setMediaFullyExpanded(false);
          setShowContent(false);
          setScrollProgress(0.95); // Start slightly before full to smooth transition
          // Hide nav when going back to expansion mode
          const contentHideEvent = new Event('heroContentHidden');
          window.dispatchEvent(contentHideEvent);
        }
      } else if (!mediaFullyExpanded) {
        // Smoother scroll delta calculation
        const scrollDelta = e.deltaY * 0.0012;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          // Add a small delay before setting fully expanded for smoother transition
          setTimeout(() => {
            setMediaFullyExpanded(true);
          }, 150);
          setShowContent(true);
          // Dispatch event for nav to appear after a short delay
          setTimeout(() => {
            const contentShowEvent = new Event('heroContentShown');
            window.dispatchEvent(contentShowEvent);
          }, 400);
        } else if (newProgress < 0.8) {
          setShowContent(false);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      e.preventDefault();

      if (mediaFullyExpanded && deltaY < -30) {
        // Only allow scrolling back when scrolled to top
        if (window.scrollY <= 10) {
          setMediaFullyExpanded(false);
          setShowContent(false);
          setScrollProgress(0.95);
          // Hide nav when going back to expansion mode
          const contentHideEvent = new Event('heroContentHidden');
          window.dispatchEvent(contentHideEvent);
        }
      } else if (!mediaFullyExpanded) {
        // Smoother touch sensitivity
        const scrollFactor = deltaY < 0 ? 0.006 : 0.004;
        const scrollDelta = deltaY * scrollFactor;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          // Add a small delay before setting fully expanded for smoother transition
          setTimeout(() => {
            setMediaFullyExpanded(true);
          }, 150);
          setShowContent(true);
          // Dispatch event for nav to appear after a short delay
          setTimeout(() => {
            const contentShowEvent = new Event('heroContentShown');
            window.dispatchEvent(contentShowEvent);
          }, 400);
        } else if (newProgress < 0.8) {
          setShowContent(false);
        }

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
      setScrollProgress(0);
      setShowContent(false);
      setMediaFullyExpanded(false);
    };

    // Add multiple event listeners to ensure no scrolling during expansion
    const scrollElement = sectionRef.current;
    
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
    window.addEventListener('resetSection', handleReset as EventListener);
    
    // Also prevent scrolling on the document itself
    if (scrollElement) {
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
  }, [scrollProgress, mediaFullyExpanded, touchStartY]);

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Smoother easing function for animations with gentler end
  const easeOutQuart = (t: number): number => {
    if (t >= 0.95) {
      // Slow down significantly near the end for smoother final transition
      const endProgress = (t - 0.95) / 0.05;
      return 0.95 + (endProgress * endProgress * 0.05);
    }
    return 1 - Math.pow(1 - t, 4);
  };
  const easedProgress = easeOutQuart(scrollProgress);
  
  const mediaWidth = 300 + easedProgress * (isMobileState ? 650 : 1250);
  const mediaHeight = 400 + easedProgress * (isMobileState ? 200 : 400);
  const textTranslateX = easedProgress * (isMobileState ? 180 : 150);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  return (
    <div
      ref={sectionRef}
      className='transition-colors duration-700 ease-in-out overflow-x-hidden'
      style={{
        position: mediaFullyExpanded ? 'relative' : 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100vh',
        zIndex: mediaFullyExpanded ? 'auto' : 9999,
      }}
    >
      <section className='relative flex flex-col items-center justify-start min-h-[100dvh]'>
        <div className='relative w-full flex flex-col items-center min-h-[100dvh]'>
          <motion.div
            className='absolute inset-0 z-0 h-full'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
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
              <div
                className='absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl'
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: '95vw',
                  maxHeight: '85vh',
                  boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.3)',
                  transition: scrollProgress >= 0.95 
                    ? 'width 0.3s ease-out, height 0.3s ease-out, box-shadow 0.3s ease-out' 
                    : 'width 0.1s ease-out, height 0.1s ease-out',
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
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.5 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.2 }}
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
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.7 - scrollProgress * 0.3 }}
                      transition={{ duration: 0.2 }}
                    />
                  </div>
                )}

                <div className='flex flex-col items-center text-center relative z-10 mt-4 transition-none'>
                  {date && (
                    <p
                      className='text-2xl text-blue-200'
                      style={{ transform: `translateX(-${textTranslateX}vw)` }}
                    >
                      {date}
                    </p>
                  )}
                  {scrollToExpand && (
                    <p
                      className='text-blue-200 font-medium text-center'
                      style={{ transform: `translateX(${textTranslateX}vw)` }}
                    >
                      {scrollToExpand}
                    </p>
                  )}
                </div>
              </div>

              <div
                className={`flex items-center justify-center text-center gap-4 w-full relative z-10 flex-col ${
                  textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
                }`}
              >
                <motion.h2
                  className='text-4xl md:text-5xl lg:text-6xl font-bold text-white'
                  style={{ 
                    transform: `translateX(-${textTranslateX}vw)`,
                    transition: 'transform 0.1s ease-out'
                  }}
                >
                  {firstWord}
                </motion.h2>
                <motion.h2
                  className='text-4xl md:text-5xl lg:text-6xl font-bold text-center text-white'
                  style={{ 
                    transform: `translateX(${textTranslateX}vw)`,
                    transition: 'transform 0.1s ease-out'
                  }}
                >
                  {restOfTitle}
                </motion.h2>
              </div>
            </div>

            <motion.section
              className='flex flex-col w-full px-8 py-10 md:px-16 lg:py-20'
              initial={{ opacity: 0 }}
              animate={{ opacity: showContent ? 1 : 0 }}
              transition={{ duration: 0.7 }}
            >
              {children}
            </motion.section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ScrollExpandMedia;