import { OutputBlockData } from "@editorjs/editorjs";
import { fetcher } from "../fetcher";
import { extractLineNumberAndUrl } from "./utils/extractLineNumberAndUrl";

export type RequestCreateFunctionNode = {
  name: string;
  fileId: string;
  codeText: string;
  connection: string[] | null;
};

export const requestCreateFunctionNode = async ({
  name,
  fileId,
  codeText,
  connection,
}: RequestCreateFunctionNode) => {
  const data = await fetcher.postWithResponse({
    path: "/function-nodes",
    body: { name, fileId, codeText, connection },
  });

  return data;
};

export const requestGetGithubCode = async (path: string) => {
  const parseGithubUrl = extractLineNumberAndUrl(path);

  if (!parseGithubUrl) return null;

  const data = await fetch(parseGithubUrl.url).then((res) => res.text());

  return {
    codeText: data,
    startLine: parseGithubUrl.startLine,
  };
};

export type ResponseGetFunctionNode = {
  id: string;
  name: string;
  codeText: string;
  fileId: string;
  connection: string[];
  editorBlock: OutputBlockData[];
};
export const requestGetFunctionNode = async ({
  nodeId,
}: {
  nodeId: string;
}) => {
  const data = await fetcher.get({
    path: `/function-nodes/node/?id=${nodeId}`,
  });

  return data;
};

export const requestGetFunctionNodes = async ({
  fileId,
}: {
  fileId: string;
}) => {
  const data = await fetcher.get<ResponseGetFunctionNode[]>({
    path: `/function-nodes/?fileId=${fileId}`,
  });

  return data;
};

export const requestPatchEditorBlock = async (args: {
  functionNodeId: string;
  editorBlock: OutputBlockData[];
}) => {
  const data = await fetcher.patch({
    path: "/function-nodes/editor-block",
    body: args,
  });

  return data;
};
