import { ComponentProps, PropsWithChildren, useMemo } from "react";
import { Link as RouterLink } from "react-router";
import replaceRouterParams from "./libs/transformUrl";
import isContainParams from "./types/isContainParams";
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
  ...rest
}: PropsWithChildren<CustomLinkProp<T>>) {
  const path = useMemo(() => {
    const propsWithoutChildren = { ...rest } as CustomLinkProp<T>;

    if (isContainParams(propsWithoutChildren)) {
      return replaceRouterParams(
        propsWithoutChildren.to,
        propsWithoutChildren.params,
      );
    }
    return propsWithoutChildren.to;
  }, [rest]);

  return (
    <RouterLink
      to={{
        pathname: path,
        search: query,
        hash,
      }}
    >
      {children}
    </RouterLink>
  );
}
