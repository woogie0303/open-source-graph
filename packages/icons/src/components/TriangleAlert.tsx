
    import { forwardRef } from 'react';
    import type { IconProps } from "@/types/Icon";

    const TriangleAlert = forwardRef<SVGSVGElement, IconProps>(
      ({ className, width="24", height="24", viewBox="0 0 24 24" , stroke = "currentColor", ...rest }, ref) => {
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox={viewBox}  stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"  aria-label="triangle-alert icon" fill="none" ref={ref} className={className} {...rest}><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
        );
      }
    );    

    TriangleAlert.displayName = 'TriangleAlert';
    export default TriangleAlert;
  