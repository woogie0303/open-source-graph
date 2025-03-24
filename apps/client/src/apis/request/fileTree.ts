import { fetcher } from "../fetcher";

export type RequestCreateFileTreeNode = {
  name: string;
  parentId: string;
  isFolder: boolean;
};

export const requestCreateFileTreeNode = async ({
  name,
  parentId,
  isFolder,
}: RequestCreateFileTreeNode) => {
  const data = await fetcher.postWithResponse({
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
    path: "/file",
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
