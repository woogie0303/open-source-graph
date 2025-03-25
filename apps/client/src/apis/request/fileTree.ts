import { fetcher } from "../fetcher";

export type ResponseFileTreeNode = {
  id: string;
  name: string;
  createdAt: string;
  children?: ResponseFileTreeNode[];
};

export const requestGetFileTreeNode = async () => {
  const data = await fetcher.get<ResponseFileTreeNode[]>({
    path: "/file/all",
  });

  return data;
};

export type RequestCreateFileTreeNode = {
  name: string;
  parentId: string | null;
  isFolder: boolean;
};

export type ResponseCreateFileTreeNode = {
  id: string;
  name: string;
  parentId: string | null;
  isFolder: boolean;
};

export const requestCreateFileTreeNode = async ({
  name,
  parentId,
  isFolder,
}: RequestCreateFileTreeNode) => {
  const data = await fetcher.postWithResponse<ResponseCreateFileTreeNode>({
    path: "/file",
    body: { name, parentId, isFolder },
  });

  return data;
};

export type RequestUpdateFileTreeNodeName = {
  id: string;
  newName: string;
};

export const requestUpdateFileTreeNodeName = async ({
  id,
  newName,
}: RequestUpdateFileTreeNodeName) => {
  const data = await fetcher.patch({
    path: "/file/rename",
    body: { id, newName },
  });

  return data;
};

export type RequestDeleteFileTreeNode = {
  id: string;
};

export const requestDeleteFileTreeNode = async ({
  id,
}: RequestDeleteFileTreeNode) => {
  const data = await fetcher.delete({ path: `/file?id=${id}` });

  return data;
};
