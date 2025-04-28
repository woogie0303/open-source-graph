export const parseCodeFromStartLine = ({
  code,
  startLine,
}: {
  code: string;
  startLine: number;
}) => {
  const startIndex = startLine - 1;
  const lines = code.split("\n");

  if (startIndex < 0 || startIndex >= lines.length) {
    throw new Error(`시작 라인이 유효하지 않습니다: ${startIndex}`);
  }

  const extractedCode = [];
  let openBraces = 0;
  let openParens = 0;
  let startFound = false;

  const firstLine = lines[startIndex].trim();

  // TODO: react-hook-form 에러도입
  // 첫 줄에 '('가 있는지 확인
  if (!firstLine.includes("(")) {
    throw new Error("첫 줄에 '(' 가 포함되어야 합니다.");
  }

  if (firstLine.includes(")") && !firstLine.includes("{")) {
    throw new Error("첫 줄에 '{' 가 포함되어야 합니다.");
  }

  // 코드 블록을 분석하여 추출
  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i];
    extractedCode.push(line);

    // 중괄호와 괄호 카운팅
    for (const char of line) {
      if (char === "{") {
        openBraces++;
        if (openBraces === 1 && !line.replace(/\s/g, "").includes(")")) {
          throw new Error("함수 형식이 아닙니다.");
        }
        startFound = true;
      } else if (char === "}") openBraces--;
      else if (char === "(") openParens++;
      else if (char === ")") openParens--;
    }

    if (startFound && openBraces === 0 && openParens === 0 && i > startIndex) {
      break;
    }
  }

  return extractedCode.join("\n");
};
