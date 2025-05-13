
    import { forwardRef } from 'react';
    import type { IconProps } from "@/types/Icon";

    const Close = forwardRef<SVGSVGElement, IconProps>(
      ({ className, width="24", height="24", viewBox="0 0 24 24" , stroke = "currentColor", ...rest }, ref) => {
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox={viewBox}  stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"  aria-label="close icon" fill="none" ref={ref} className={className} {...rest}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        );
      }
    );    

    Close.displayName = 'Close';
    export default Close;
  