export const extractLineNumberAndUrl = (oldUrl: string) => {
  const urlPattern = /(https:\/\/github\.com\/[^/]+\/[^/]+)\/blob\/(.+)/;
  const linePattern = /#L(\d+)$/;

  const urlMatch = oldUrl.match(urlPattern);
  const lineMatch = oldUrl.match(linePattern);

  if (!urlMatch || !lineMatch) {
    return null;
  }

  const baseUrl = urlMatch[1];
  const filePath = urlMatch[2].replace(linePattern, "");
  const newUrl = `https://raw.githubusercontent.com/${baseUrl.split("/").slice(-2).join("/")}/${filePath}`;
  const lineNumber = parseInt(lineMatch[1], 10);

  return { url: newUrl, startLine: lineNumber };
};
