import type { HTMLAttributes } from "react";

export interface IconProps extends HTMLAttributes<SVGSVGElement> {
  className?: string;
  width?: number | string;
  height?: number | string;
  viewBox?: string;
  fill?: string;
  stroke?: string;
}
