export const RouterConfig = {
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
) as Record<
  keyof typeof RouterConfig,
  (typeof RouterConfig)[keyof typeof RouterConfig]["path"]
>;

export const RouterQueryConfig = Object.fromEntries(
  Object.entries(RouterConfig).flatMap(([, value]) => {
    if ("query" in value) {
      return [[value.path, value.query]];
    }
    return [];
  }),
);
