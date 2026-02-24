declare module 'framer-motion' {
  import * as React from 'react';

  interface MotionProps {
    initial?: any;
    animate?: any;
    exit?: any;
    transition?: any;
    whileHover?: any;
    whileTap?: any;
    whileInView?: any;
    viewport?: any;
    className?: string;
    style?: React.CSSProperties;
    onClick?: (e: React.MouseEvent) => void;
    href?: string;
    key?: string | number;
    ref?: React.Ref<any>;
    children?: React.ReactNode;
  }

  export const motion: {
    div: React.FC<MotionProps & React.HTMLAttributes<HTMLDivElement>>;
    span: React.FC<MotionProps & React.HTMLAttributes<HTMLSpanElement>>;
    a: React.FC<MotionProps & React.AnchorHTMLAttributes<HTMLAnchorElement>>;
    button: React.FC<MotionProps & React.ButtonHTMLAttributes<HTMLButtonElement>>;
    header: React.FC<MotionProps & React.HTMLAttributes<HTMLElement>>;
    section: React.FC<MotionProps & React.HTMLAttributes<HTMLElement>>;
    nav: React.FC<MotionProps & React.HTMLAttributes<HTMLElement>>;
    ul: React.FC<MotionProps & React.HTMLAttributes<HTMLUListElement>>;
    li: React.FC<MotionProps & React.LiHTMLAttributes<HTMLLIElement>>;
    p: React.FC<MotionProps & React.HTMLAttributes<HTMLParagraphElement>>;
    h1: React.FC<MotionProps & React.HTMLAttributes<HTMLHeadingElement>>;
    h2: React.FC<MotionProps & React.HTMLAttributes<HTMLHeadingElement>>;
    h3: React.FC<MotionProps & React.HTMLAttributes<HTMLHeadingElement>>;
    h4: React.FC<MotionProps & React.HTMLAttributes<HTMLHeadingElement>>;
    blockquote: React.FC<MotionProps & React.HTMLAttributes<HTMLQuoteElement>>;
    img: React.FC<MotionProps & React.ImgHTMLAttributes<HTMLImageElement>>;
    form: React.FC<MotionProps & React.FormHTMLAttributes<HTMLFormElement>>;
    input: React.FC<MotionProps & React.InputHTMLAttributes<HTMLInputElement>>;
    textarea: React.FC<MotionProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>>;
    label: React.FC<MotionProps & React.LabelHTMLAttributes<HTMLLabelElement>>;
  };

  export const AnimatePresence: React.FC<{
    children?: React.ReactNode;
    mode?: 'sync' | 'popLayout' | 'wait';
    initial?: boolean;
    onExitComplete?: () => void;
  }>;

  export function useInView(
    ref: React.RefObject<Element | null>,
    options?: {
      once?: boolean;
      margin?: string;
      amount?: 'some' | 'all' | number;
    }
  ): boolean;

  export function useScroll(options?: any): any;
  export function useTransform(input: any, inputRange: any, outputRange: any, options?: any): any;
}
