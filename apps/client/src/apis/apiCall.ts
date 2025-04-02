type HTTPMethodType = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";

export interface FetchProps {
  path: string;
  body?: object;
  headers?: HeadersInit;
  method: HTTPMethodType;
}

const apiCall =
  (baseUrl: string) =>
  async ({ path, body, headers, method }: FetchProps) => {
    try {
      const url = `${baseUrl}${path}`;

      const response = await fetch(url, {
        headers,
        method,
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        const errRes = await response.body?.getReader().read();
        const errorText = new TextDecoder().decode(errRes?.value);
        console.log(JSON.parse(errorText));
      }

      return response;
    } catch (err) {
      throw new Error(String(err));
    }
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CallbackFunctionType = (...args: any[]) => Promise<any>;

export const singleRequest = <F extends CallbackFunctionType>(callback: F) => {
  const promiseKey = new Map<string, ReturnType<F>>();

  return async (...args: Parameters<F>) => {
    const key = JSON.stringify(args);

    console.log(key);
    if (promiseKey.get(key)) {
      console.log("cash");
      return promiseKey.get(key)!;
    }
    console.log("notCache");

    const promise = callback(...args);
    promise.then(() => {
      promiseKey.delete(key);
    });
    promiseKey.set(key, promise as ReturnType<F>);

    return promise;
  };
};

export const executeFetch = apiCall("http://localhost:3000");
