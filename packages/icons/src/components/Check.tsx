
    import { forwardRef } from 'react';
    import type { IconProps } from "@/types/Icon";

    const Check = forwardRef<SVGSVGElement, IconProps>(
      ({ className, width="24", height="24", viewBox="0 0 24 24" , stroke = "currentColor", ...rest }, ref) => {
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox={viewBox}  stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"  aria-label="check icon" fill="none" ref={ref} className={className} {...rest}><path d="M20 6 9 17l-5-5"/></svg>
        );
      }
    );    

    Check.displayName = 'Check';
    export default Check;
  