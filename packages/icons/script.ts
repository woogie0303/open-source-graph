import { existsSync, promises as fs } from "fs";
import path from "path";

const SVG_DIR = "./src/svg";
const COMPONENT_DIR = "./src/components";

type SVGComponentMap = { [key: string]: string };

const extractSvgAttributes = (svgContent: string) => {
  const widthMatch = svgContent.match(/width="(\d+)"/g);
  const heightMatch = svgContent.match(/height="(\d+)"/g);
  const viewBoxMatch = svgContent.match(/viewBox="([^"]*)"/g);

  return {
    width: widthMatch ? widthMatch[0] : "width = 24",
    height: heightMatch ? heightMatch[0] : "height = 24",
    viewBox: viewBoxMatch ? viewBoxMatch[0] : "viewBox = 0 0 24 24",
  };
};

const createComponentContent = (
  componentName: string,
  svgContent: string,
  svgFile: string,
): string => {
  const iconName = path.basename(svgFile, ".svg");
  const hasStroke = svgContent.includes("stroke=");
  const fillAttributes = (svgContent.match(/fill="([^"]*)"/g) || []).filter(
    (attr) => attr !== 'fill="none"',
  );
  const hasFill = fillAttributes.length;

  const { width, height, viewBox } = extractSvgAttributes(svgContent);

  const propsString = `{ className, ${width}, ${height}, ${viewBox}${hasStroke || hasFill ? ` ${hasStroke ? ', stroke = "currentColor"' : ""}${hasFill ? ', fill = "#000000"' : ""}` : ""}, ...rest }`;

  // === 1. 보호: d="..." 속성 백업 ===
  const dRegex = /d="[^"]*"/g;
  const dMatches = svgContent.match(dRegex) || [];
  let protectedSvg = svgContent.replace(dRegex, "__d_placeholder__");

  // === 2. camelCase 처리 (stroke-width → strokeWidth 등) ===
  protectedSvg = protectedSvg.replace(/-(\w)/g, (_, letter) =>
    letter.toUpperCase(),
  );

  // === 3. d 속성 복원 ===
  dMatches.forEach((d) => {
    protectedSvg = protectedSvg.replace("__d_placeholder__", d);
  });

  // === 4. JSX-friendly 속성 및 구조 변경 ===
  const modifiedSvgContent = protectedSvg
    .replace(/width="[^"]*"/, `width={width}`)
    .replace(/height="[^"]*"/, `height={height}`)
    .replace(/viewBox="[^"]*"/, `viewBox={viewBox}`)
    .replace(/<svg([^>]*)fill="[^"]*"([^>]*)>/, "<svg$1$2>")
    .replace(/fill="([^"]+)"/g, `fill={fill}`)
    .replace(/stroke="([^"]+)"/g, `stroke={stroke}`)
    .replace(/class="([^"]+)"/g, "")
    .replace(
      /<svg([^>]*)>/,
      `<svg$1 aria-label="${iconName} icon" fill="none" ref={ref} className={className} {...rest}>`,
    );

  return `
    import { forwardRef } from 'react';
    import type { IconProps } from "@/types/Icon";

    const ${componentName} = forwardRef<SVGSVGElement, IconProps>(
      (${propsString}, ref) => {
        return (
          ${modifiedSvgContent}
        );
      }
    );    

    ${componentName}.displayName = '${componentName}';
    export default ${componentName};
  `;
};

const generateSVGComponentMap = async () => {
  const svgFiles = (await fs.readdir(SVG_DIR)).reduce<SVGComponentMap>(
    (acc, svgFile) => {
      const componentName = path
        .basename(svgFile, ".svg")
        .replace(/(^\w|-\w)/g, (match) => match.replace("-", "").toUpperCase());
      acc[componentName] = svgFile;
      return acc;
    },
    {},
  );

  return svgFiles;
};

const generateComponentFiles = async (svgComponentMap: SVGComponentMap) => {
  const components = [];

  for (const [componentName, svgFile] of Object.entries(svgComponentMap)) {
    const componentFilePath = path.resolve(
      COMPONENT_DIR,
      `${componentName}.tsx`,
    );
    if (existsSync(componentFilePath)) {
      components.push(componentName);
      continue;
    }

    const svgFilePath = path.resolve(SVG_DIR, svgFile);
    const svgFileContent = (await fs.readFile(svgFilePath)).toString();

    const componentContent = createComponentContent(
      componentName,
      svgFileContent,
      svgFile,
    );

    await fs.writeFile(componentFilePath, componentContent);
    components.push(componentName);
  }

  return components;
};

const generateExportFile = async (components: string[]) => {
  const EXPORT_FILE_PATH = "./src/components/index.ts";
  const exportFileContent = components
    .map(
      (component) =>
        `export { default as ${component} } from "./${component}";`,
    )
    .join("\n");

  const resolvedExportFileContent = `export * from "../types/Icon";\n${exportFileContent}`;

  await fs.writeFile(EXPORT_FILE_PATH, resolvedExportFileContent);
};

(async () => {
  try {
    const svgComponentMap = await generateSVGComponentMap();

    const components = await generateComponentFiles(svgComponentMap);
    await generateExportFile(components);
  } catch (error) {
    console.log("Error generating components:", error);
  }
})();
