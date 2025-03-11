export type DataType = {
  id: string;
  name: string;
  children?: DataType[];
};

export const data: DataType[] = [
  {
    id: "1",
    name: "public",
    children: [
      {
        id: "c1-1",
        name: "useState 톺아보기",
      },
    ],
  },
  {
    id: "2",
    name: "src",
    children: [
      {
        id: "c2-1",
        name: "App.js",
      },
      {
        id: "c2-2",
        name: "nextjs 톺아보기",
      },
      { id: "c2-3", name: "styles.css" },
    ],
  },
  { id: "3", name: "package.json" },
  { id: "4", name: "README.md" },
];
