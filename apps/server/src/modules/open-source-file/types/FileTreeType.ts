export interface FileTreeType {
  id: string;
  name: string;
  index: number;
  children?: FileTreeType[];
}
