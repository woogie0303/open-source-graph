export const makeTriggerId = (baseId: string, value: string) => {
  return `${baseId}-trigger-${value}`;
};

export const makeContentId = (baseId: string, value: string) => {
  return `${baseId}-content-${value}`;
};
