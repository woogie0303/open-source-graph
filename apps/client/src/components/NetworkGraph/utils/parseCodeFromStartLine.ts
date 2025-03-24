export const parseCodeFromStartLine = ({
  code,
  startLine,
}: {
  code: string;
  startLine: number;
}) => {
  const startIndex = startLine - 1;
  const lines = code.split("\n");

  // 시작 라인이 유효한지 확인
  if (startIndex < 0 || startIndex >= lines.length) {
    console.error("시작 라인이 유효하지 않습니다:", startIndex);
    return "";
  }

  const firstLine = lines[startIndex];
  if (
    !firstLine.includes("const") &&
    !firstLine.includes("function") &&
    !firstLine.includes("class")
  ) {
    // TODO: rq 에러처리하기
    return lines[startIndex]; // 함수/변수 선언이 아니면 해당 라인만 반환
  }

  const extractedCode = [];
  let openBraces = 0;
  let openParens = 0;
  let startFound = false;

  // 시작 위치에서부터 코드 분석
  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i];
    extractedCode.push(line);

    // 중괄호와 괄호 카운팅
    for (const char of line) {
      if (char === "{") {
        openBraces++;
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
