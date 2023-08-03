import { HTMLMotionProps, motion } from 'framer-motion';
import React, { forwardRef } from 'react';

type PageTransitionProps = HTMLMotionProps<'div'>;
export type PageTransitionRef = React.ForwardedRef<HTMLDivElement>;

function PageTransition(
  { children, ...rest }: PageTransitionProps,
  ref: PageTransitionRef
) {
  const variants = {
    hidden: { opacity: 0, x: 0, y: 40 },
    enter: { opacity: 1, x: 0, y: 0 },
    exit: { opacity: 0, x: 0, y: -100 },
  };

  const transition = { duration: 0.6, ease: 'easeInOut' };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={transition}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export default forwardRef(PageTransition);
