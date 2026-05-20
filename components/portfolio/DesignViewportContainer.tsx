import { forwardRef, type HTMLAttributes } from "react";
import { DESIGN_VIEWPORT_CLASS } from "./data";

type DesignViewportContainerProps = HTMLAttributes<HTMLDivElement>;

/**
 * Shared 2560×1440 design canvas: max width 2560px, height min(viewport, 1440px).
 * Use in hero now; wrap other sections in later phases.
 */
export const DesignViewportContainer = forwardRef<
  HTMLDivElement,
  DesignViewportContainerProps
>(function DesignViewportContainer({ className = "", children, ...rest }, ref) {
  return (
    <div
      ref={ref}
      className={[DESIGN_VIEWPORT_CLASS, className].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </div>
  );
});
