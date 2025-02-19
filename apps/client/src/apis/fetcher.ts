import { executeFetch, FetchProps } from "./apiCall";

export type FetcherArg = Omit<FetchProps, "method">;

export const fetcher = {
  get: async <T>(props: FetcherArg) => {
    const response = await executeFetch({ ...props, method: "GET" }).then(
      (res) => res.json(),
    );

    return response as Promise<T>;
  },
  postWithoutResponse: async (props: FetcherArg & { body: object }) => {
    await executeFetch({
      ...props,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  postWithResponse: async <T>(props: FetcherArg) => {
    const response = await executeFetch({
      ...props,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    return response as T;
  },
  patch: async (props: FetcherArg) => {
    await executeFetch({
      ...props,
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  delete: async (props: FetcherArg) => {
    await executeFetch({ ...props, method: "DELETE" });
  },
};
