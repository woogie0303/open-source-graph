import { ComponentProps, PropsWithChildren } from "react";
import { Link as RouterLink } from "react-router";
import { RouterParams, RouterPath } from "./types/routerType";

export type CustomLinkProp<T extends RouterPath> = ([RouterParams<T>] extends [
  never,
]
  ? { to: T; query?: string; hash?: string }
  : { to: T; params: RouterParams<T>; query?: string; hash?: string }) &
  Omit<ComponentProps<typeof RouterLink>, "to">;

export default function Link<T extends RouterPath>({
  children,
  query,
  hash,
}: PropsWithChildren<CustomLinkProp<T>>) {
  return (
    <RouterLink
      to={{
        search: query,
        hash,
      }}
    >
      {children}
    </RouterLink>
  );
}
