import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const sectionVariants = cva("w-full", {
  variants: {
    spacing: {
      default: "py-12 md:py-16 lg:py-24",
      none: "py-0",
      sm: "py-8 md:py-12",
      lg: "py-16 md:py-24 lg:py-32",
    },
    background: {
      default: "bg-transparent",
      surface: "bg-surface",
      elevated: "bg-surface-elevated",
    },
  },
  defaultVariants: {
    spacing: "default",
    background: "default",
  },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {}

const Section = React.forwardRef<HTMLElement, SectionProps>(
  ({ className, spacing, background, ...props }, ref) => {
    return (
      <section
        ref={ref}
        className={cn(sectionVariants({ spacing, background }), className)}
        {...props}
      />
    );
  }
);
Section.displayName = "Section";

export { Section, sectionVariants };
