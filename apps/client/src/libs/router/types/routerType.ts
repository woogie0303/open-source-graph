import { Prettify } from "@/types/util";
import { RouterPathConfig } from "../constant/router";

export type RouterPath =
  (typeof RouterPathConfig)[keyof typeof RouterPathConfig];

export type RouterParams<T extends string> =
  T extends `${string}/:${infer Param}/${infer Rest}`
    ? Prettify<{ [K in Param]: string } & RouterParams<`/${Rest}`>>
    : T extends `${string}/:${infer Param}`
      ? {
          [K in Param]: string;
        }
      : never;
