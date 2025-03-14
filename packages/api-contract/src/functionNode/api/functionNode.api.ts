import { initContract } from "@ts-rest/core";
import { z } from "zod";
import {
  CreateFunctionNodeDtoSchema,
  FunctionNodeSchema,
  UpdateEditorBlockDtoSchema,
} from "../schema";

const c = initContract();
const functionNodeApi = c.router({
  functionNode: {
    getAll: {
      method: "GET",
      path: "/function-nodes",
      query: z.object({
        fileId: z.string(),
      }),
      responses: {
        200: FunctionNodeSchema.array(),
        404: z.object({ message: z.string() }),
      },
    },
    create: {
      method: "POST",
      path: "/function-nodes",
      body: CreateFunctionNodeDtoSchema,
      responses: {
        201: z.object({ message: z.string() }),
        404: z.object({ message: z.string() }),
      },
    },

    updateEditorBlock: {
      method: "PATCH",
      path: "/function-nodes",
      body: UpdateEditorBlockDtoSchema,
      responses: {
        201: z.object({ message: z.string() }),
        404: z.object({ message: z.string() }),
      },
    },

    delete: {
      method: "DELETE",
      path: "/function-nodes",
      query: z.object({ nodeId: z.string() }),
      responses: {
        201: z.object({ message: z.string() }),
        404: z.object({ message: z.string() }),
      },
    },
  },
});

export default functionNodeApi;
