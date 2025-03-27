import { CustomLinkProp } from "../Link";
import { RouterParams, RouterPath } from "./routerType";

export default function isContainParams<T extends RouterPath>(
  props: CustomLinkProp<T>,
): props is Omit<CustomLinkProp<T>, "to"> & {
  params: RouterParams<T>;
  to: Extract<T, `${string}/:${string}`>;
} {
  return "params" in props && props.params !== undefined;
}
