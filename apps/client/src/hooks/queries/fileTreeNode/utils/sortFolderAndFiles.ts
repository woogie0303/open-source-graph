import { ResponseFileTreeNode } from "@/apis/request/fileTree";

function sortFoldersAndFiles(data: ResponseFileTreeNode[]) {
  // 문자열 날짜를 Date 객체로 변환
  const treeData = [...data];

  const parseDate = (createdAt: string) => new Date(createdAt).getTime();

  // 폴더는 항상 파일보다 먼저, 같은 타입이면 생성 순서대로 정렬
  treeData.sort((a, b) => {
    const isAFolder = Array.isArray(a.children);
    const isBFolder = Array.isArray(b.children);

    if (isAFolder && !isBFolder) return -1; // 폴더가 파일보다 앞에
    if (!isAFolder && isBFolder) return 1; // 파일이 폴더보다 뒤에
    return parseDate(a.createdAt) - parseDate(b.createdAt); // 같은 타입이면 createdAt 기준 정렬
  });

  // 폴더 내부의 children도 정렬 적용
  treeData.forEach((item) => {
    if (Array.isArray(item.children)) {
      item.children = sortFoldersAndFiles(item.children);
    }
  });

  return treeData;
}

export default sortFoldersAndFiles;
