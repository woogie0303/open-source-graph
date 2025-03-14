import { initContract } from "@ts-rest/core";
import { functionNodeApi } from "./functionNode/api";

const c = initContract();

export const contract = c.router(
  {
    ...functionNodeApi,
  },
  { strictStatusCodes: true },
);
