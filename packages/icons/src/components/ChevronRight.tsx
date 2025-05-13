
    import { forwardRef } from 'react';
    import type { IconProps } from "@/types/Icon";

    const ChevronRight = forwardRef<SVGSVGElement, IconProps>(
      ({ className, width="24", height="24", viewBox="0 0 24 24" , stroke = "currentColor", ...rest }, ref) => {
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox={viewBox}  stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"  aria-label="chevron-right icon" fill="none" ref={ref} className={className} {...rest}><path d="m9 18 6-6-6-6"/></svg>
        );
      }
    );    

    ChevronRight.displayName = 'ChevronRight';
    export default ChevronRight;
  