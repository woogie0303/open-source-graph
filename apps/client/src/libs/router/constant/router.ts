type RouterConfigType = {
  [key: string]: { path: string; query?: string | object };
};

export const RouterConfig: RouterConfigType = {
  root: { path: "/" },

  functionNode: {
    path: "/function-nodes",
  },
  functionNodeFileId: {
    path: "/function-nodes/:fileId",
  },
} as const;

export const RouterPathConfig = Object.fromEntries(
  Object.entries(RouterConfig).map(([key, value]) => [key, value.path]),
);

export const RouterQueryConfig = Object.fromEntries(
  Object.entries(RouterConfig).flatMap(([key, value]) => {
    if (value.query) {
      return [[key, value.query]];
    }
    return [];
  }),
);
