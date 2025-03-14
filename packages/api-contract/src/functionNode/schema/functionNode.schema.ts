import { z } from "zod";

export const FunctionNodeSchema = z.object({
  name: z.string(),
  codeText: z.string(),
  fileId: z.string(),
  connection: z.array(z.string()).nullable(),
  editorBlock: z
    .array(
      z.object({
        id: z.string(),
        type: z.string(),
        data: z.record(z.any()),
      }),
    )
    .optional(),
});

export const CreateFunctionNodeDtoSchema = FunctionNodeSchema.pick({
  name: true,
  fileId: true,
  codeText: true,
  connection: true,
});

export const UpdateEditorBlockDtoSchema = FunctionNodeSchema.pick({
  editorBlock: true,
});

export type FunctionNodeType = z.infer<typeof FunctionNodeSchema>;
