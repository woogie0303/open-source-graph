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
        throw new Error("sdfsdf");
      }

      return response;
    } catch (err) {
      throw new Error(String(err));
    }
  };

export const executeFetch = apiCall("http://localhost:3000");
