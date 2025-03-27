import { RouterParams, RouterPath } from "../types/routerType";

const replaceRouterParams = <
  T extends Extract<RouterPath, `${string}/:${string}`>,
>(
  path: T,
  routerPath: RouterParams<T>,
) => {
  return path.replace(/:([a-zA-Z0-9_]+)/g, (_, key) =>
    String(routerPath[key as keyof typeof routerPath]),
  );
};

export default replaceRouterParams;
