"use client";

import type { Transition } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import { cn } from "@/lib/utils";

export interface ChevronLeftIconHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface ChevronLeftIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const defaultTransition: Transition = {
  times: [0, 0.4, 1],
  duration: 0.5,
};

const ChevronLeftIconAnimated = forwardRef<
  ChevronLeftIconHandle,
  ChevronLeftIconProps
>(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
  const controls = useAnimation();
  const isControlledRef = useRef(false);

  useImperativeHandle(ref, () => {
    isControlledRef.current = true;
    return {
      startAnimation: () => controls.start("animate"),
      stopAnimation: () => controls.start("normal"),
    };
  });

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isControlledRef.current) {
        controls.start("animate");
      } else {
        onMouseEnter?.(e);
      }
    },
    [controls, onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!isControlledRef.current) {
        controls.start("normal");
      } else {
        onMouseLeave?.(e);
      }
    },
    [controls, onMouseLeave]
  );

  return (
    <div
      className={cn(
        `cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <motion.path
          variants={{
            normal: { x: 0 },
            animate: { x: [0, -2, 0] },
          }}
          transition={defaultTransition}
          animate={controls}
          d="m15 18-6-6 6-6"
        />
      </svg>
    </div>
  );
});

ChevronLeftIconAnimated.displayName = "ChevronLeftIconAnimated";

export { ChevronLeftIconAnimated };
