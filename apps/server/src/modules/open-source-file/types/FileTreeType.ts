export interface FileTreeType {
  id: string;
  name: string;
  createdAt: Date;
  children?: FileTreeType[];
}
