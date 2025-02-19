import { useMemo, useState } from "react";

interface CheckBoxItemType {
  id: string;
  name: string;
  children?: CheckBoxItemType[];
}

interface CheckBoxNodeType extends CheckBoxItemType {
  id: string;
  name: string;
  isChecked: boolean;
  children?: CheckBoxNodeType[];
  parent?: CheckBoxNodeType;
}

const MOCK_JOB_DATA = [
  {
    id: "1",
    name: "회계",
    children: [
      {
        id: "11",
        name: "회계사",
        children: [
          {
            id: "111",
            name: "회계사사",
            children: [{ id: "11111", name: "회계사사사" }],
          },
          { id: "111111", name: "회계사사2" },
        ],
      },
      {
        id: "12",
        name: "회계사2",
        children: [
          { id: "122", name: "회계사사2" },
          { id: "1222", name: "회계사사21" },
        ],
      },
      { id: "13", name: "회계사3" },
    ],
  },
  { id: "123", name: "sdfsdf", children: [{ id: "124124", name: "sdfsdf" }] },
  { id: "523", name: "sdfsfsdf" },
  { id: "323", name: "sdfsdfsfs" },
];

const toggleChildrenCheckBox = (node: CheckBoxNodeType) => {
  const checked = node.isChecked;

  if (node.children) {
    node.children.forEach((node) => {
      node.isChecked = checked;
      toggleChildrenCheckBox(node);
    });
  }
};

const toggleParentsCheckBox = (node: CheckBoxNodeType) => {
  if (!node.parent) return;

  const parent = node.parent;

  if (parent.isChecked && !node.isChecked) {
    parent.isChecked = false;
    toggleParentsCheckBox(parent);
    return;
  }

  if (!parent.isChecked && node.isChecked) {
    if (parent.children?.every((node) => node.isChecked)) {
      parent.isChecked = true;
      toggleParentsCheckBox(parent);
      return;
    }
  }
};

const transformCheckBoxData = ({
  data,
  parent,
  parentIds,
}: {
  data: CheckBoxItemType[];
  parent?: CheckBoxNodeType;
  parentIds: Map<string, string[]>;
}) => {
  const storeParentRelation = (el: CheckBoxItemType) => {
    if (parent) {
      const parentIdArr = parentIds.get(parent.id);

      if (parentIdArr) {
        parentIds.set(el.id, [...parentIdArr, parent.id]);
      } else {
        parentIds.set(el.id, [parent.id]);
      }
    }
  };

  return data.map((el) => {
    const node: CheckBoxNodeType = {
      id: el.id,
      name: el.name,
      isChecked: false,
      parent,
    };

    storeParentRelation(el);

    if (el.children) {
      const children = transformCheckBoxData({
        data: el.children,
        parent: node,
        parentIds,
      });

      node.children = children;
    }

    return node;
  });
};

const useCheckBoxItemDataController = () => {
  const parentIds = useMemo(() => new Map<string, string[]>(), []);
  const transFormData = useMemo(
    () => transformCheckBoxData({ data: MOCK_JOB_DATA, parentIds: parentIds }),
    [parentIds],
  );

  const [checkBoxItems, setCheckBoxItems] = useState(transFormData);

  const findById = (id: string) => {
    const parentRelationIds = parentIds.get(id);
    let node: undefined | CheckBoxNodeType;

    if (!parentRelationIds) {
      return checkBoxItems.filter((node) => node.id === id)[0];
    }

    for (const parentId of parentRelationIds) {
      const candidate = node ? node.children : checkBoxItems;

      node = candidate?.filter((node) => node.id === parentId)[0];
    }

    return node?.children?.filter(
      (node) => node.id === id,
    )[0] as CheckBoxNodeType;
  };

  const selectOne = ({ id, checked }: { id: string; checked: boolean }) => {
    const node = findById(id);
    node.isChecked = checked;

    toggleChildrenCheckBox(node);
    toggleParentsCheckBox(node);

    // TODO: clone deep 직접 구현해보기
    // setCheckBoxItems(cloneDeep(checkBoxItems));
    setCheckBoxItems(checkBoxItems);
  };
  return {
    items: MOCK_JOB_DATA,
    findById,
    selectOne,
  };
};

export default useCheckBoxItemDataController;
