
    import { forwardRef } from 'react';
    import type { IconProps } from "@/types/Icon";

    const Code = forwardRef<SVGSVGElement, IconProps>(
      ({ className, width="24", height="24", viewBox="0 0 24 24" , stroke = "currentColor", ...rest }, ref) => {
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox={viewBox}  stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"  aria-label="code icon" fill="none" ref={ref} className={className} {...rest}><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
        );
      }
    );    

    Code.displayName = 'Code';
    export default Code;
  