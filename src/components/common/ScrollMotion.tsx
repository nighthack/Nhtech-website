import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'motion/react';
import React, { useEffect, useRef, useState } from 'react';

const defaultEase = [0.16, 1, 0.3, 1];

/**
 * MaskedHeading
 * Reveals headings with an overflow-hidden mask sliding upward on scroll entry.
 */
interface MaskedHeadingProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'div';
  className?: string;
  delay?: number;
}

export function MaskedHeading({ children, as: Component = 'h2', className = '' }: MaskedHeadingProps) {
  return <Component className={className}>{children}</Component>;
}

/**
 * ScrollText
 * Subtle fade + 12px upward translation on entry for paragraphs and descriptions.
 */
interface ScrollTextProps {
  children: React.ReactNode;
  as?: 'p' | 'div' | 'span';
  className?: string;
  delay?: number;
}

export function ScrollText({ children, as: Component = 'p', className = '' }: ScrollTextProps) {
  return <Component className={className}>{children}</Component>;
}

/**
 * AnimatedMetric
 * Counts up numbers or reveals complex metric strings (e.g. 100%, 0 KB, <10ms, 99.8%) when entering viewport.
 */
interface AnimatedMetricProps {
  value: string;
  className?: string;
  duration?: number;
}

export function AnimatedMetric({
  value,
  className = '',
  duration = 1.6,
}: AnimatedMetricProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [displayValue, setDisplayValue] = useState<string>(value);

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayValue(value);
      return;
    }

    if (!isInView) return;

    // Parse value pattern (e.g. "100%", "<10ms", "0 KB", "99.8%", "14.2x", "Select")
    const match = value.match(/^([^0-9.-]*)([0-9]+(?:\.[0-9]+)?)(.*)$/);

    if (!match) {
      // Non-numeric metric (e.g. "Select" or "Sub-second")
      setDisplayValue(value);
      return;
    }

    const prefix = match[1];
    const targetNum = parseFloat(match[2]);
    const suffix = match[3];
    const isFloat = match[2].includes('.');
    const decimalPlaces = isFloat ? (match[2].split('.')[1]?.length || 1) : 0;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Ease out cubic
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const current = targetNum * easedProgress;

      const formattedNum = isFloat
        ? current.toFixed(decimalPlaces)
        : Math.floor(current).toString();

      setDisplayValue(`${prefix}${formattedNum}${suffix}`);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, value, duration, shouldReduceMotion]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}

// Convenient aliases
export const AnimatedCounter = AnimatedMetric;
export const StaggerContainer = ScrollStagger;
export const StaggerItem = ScrollStaggerItem;

/**
 * ScrollStagger & ScrollStaggerItem
 * Staggers in child cards with slight vertical offset when scrolling into view.
 */
interface ScrollStaggerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function ScrollStagger({ children, className = '' }: ScrollStaggerProps) {
  return <div className={className}>{children}</div>;
}

export function ScrollStaggerItem({ children, className = '' }: { children: React.ReactNode; className?: string; key?: React.Key }) {
  return <div className={className}>{children}</div>;
}

/**
 * ScrollScaleStatement
 * Large statement section with gentle scale & position shifts as user scrolls through it.
 */
interface ScrollScaleStatementProps {
  children: React.ReactNode;
  className?: string;
}

export function ScrollScaleStatement({
  children,
  className = '',
}: ScrollScaleStatementProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.98]);
  const y = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.6, 1, 1, 0.7]);

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div style={{ scale, y, opacity }} className={className}>
        {children}
      </motion.div>
    </div>
  );
}

/**
 * SectionSceneWrapper
 * Section-level wrapper providing smooth scene transition and subtle visual depth when entering viewport.
 */
interface SectionSceneWrapperProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export function SectionSceneWrapper({
  children,
  id,
  className = '',
}: SectionSceneWrapperProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  if (shouldReduceMotion) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      ref={ref}
      id={id}
      initial={false}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.85, ease: defaultEase }}
      className={className}
    >
      {children}
    </motion.section>
  );
}

/**
 * ScrollProgressRail
 * Precision top scroll progress indicator tied to page scroll position.
 */
export function ScrollProgressRail() {
  const { scrollYProgress } = useScroll();

  return (
    <div
      aria-hidden="true"
      className="scroll-progress-rail fixed top-0 left-0 right-0 h-[2px] z-[60] pointer-events-none bg-transparent"
    >
      <motion.div
        style={{ scaleX: scrollYProgress, transformOrigin: '0% 50%' }}
        className="w-full h-full bg-gradient-to-r from-[#326B86] via-[#47849B] to-[#FF4800]"
      />
    </div>
  );
}

/**
 * ParallaxFrame
 * Subtle scroll-linked parallax container for editorial media without layout reflow.
 */
interface ParallaxFrameProps {
  children: React.ReactNode;
  className?: string;
  offset?: number;
}

export function ParallaxFrame({
  children,
  className = '',
  offset = 24
}: ParallaxFrameProps) {
  const shouldReduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="w-full h-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
