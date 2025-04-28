import { useNavigate } from "react-router";
import replaceRouterParams from "../libs/transformUrl";
import { RouterOption, RouterPath } from "../types/routerType";

export const useRouter = () => {
  const navigate = useNavigate();

  // 동작 라우트를 포함한 경우의 함수 타입 오버로딩
  function push<T extends Extract<RouterPath, `${string}/:${string}`>>(
    path: T,
    routerOption: RouterOption<T>,
  ): void;

  // 동작 라우트를 포함하지 않은 경우의 함수 타입 오버로딩
  function push<T extends Exclude<RouterPath, `${string}/:${string}`>>(
    path: T,
    routerOption?: RouterOption<T>, // Optional for static paths
  ): void;

  function push<T extends RouterPath>(path: T, routerOption?: RouterOption<T>) {
    if (routerOption && "params" in routerOption) {
      const pathWithParams = replaceRouterParams(
        path as Extract<RouterPath, `${string}/:${string}`>,
        routerOption.params,
      );

      navigate({
        pathname: pathWithParams,
        hash: routerOption.hash,
        search: routerOption.search,
      });

      return;
    }

    navigate({
      pathname: path,
      hash: routerOption?.hash,
      search: routerOption?.search,
    });
  }

  // 동작 라우트를 포함한 경우의 함수 타입 오버로딩
  function replace<T extends Extract<RouterPath, `${string}/:${string}`>>(
    path: T,
    routerOption: RouterOption<T>,
  ): void;

  // 동작 라우트를 포함하지 않은 경우의 함수 타입 오버로딩
  function replace<T extends Exclude<RouterPath, `${string}/:${string}`>>(
    path: T,
    routerOption?: RouterOption<T>,
  ): void;

  function replace<T extends RouterPath>(
    path: T,
    routerOption?: [RouterOption<T>] extends [never] ? never : RouterOption<T>,
  ) {
    if (routerOption && "params" in routerOption) {
      const pathWithParams = replaceRouterParams(
        path as Extract<RouterPath, `${string}/:${string}`>,
        routerOption.params,
      );

      navigate(
        {
          pathname: pathWithParams,
          hash: routerOption.hash,
          search: routerOption.search,
        },
        { replace: true },
      );
      return;
    }

    navigate(
      {
        pathname: path,
        hash: routerOption?.hash,
        search: routerOption?.search,
      },
      { replace: true },
    );
  }

  return {
    push,
    replace,
    forward: () => navigate(1),
    back: () => navigate(-1),
  };
};
