import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { CreateFileDto, RenameFileDto } from '../dto/fileTreeDto';
import { FileRepository } from '../repository/file.repository';
import { FileDocument } from '../schema/file.schema';
import { FileTreeType } from '../types/FileTreeType';

@Injectable()
export class FileService {
  constructor(private readonly fileRepository: FileRepository) {}
  async getUserFiles(userId: string) {
    const files = await this.fileRepository.find({ userId });

    return this.buildFileTree(files);
  }

  private buildFileTree(files: FileDocument[]) {
    const fileMap = new Map<string, FileTreeType>();
    const tree: FileTreeType[] = [];

    files.forEach((file) => {
      fileMap.set(file._id.toString(), {
        id: file._id.toString(),
        name: file.name,
        children: file.isFolder ? [] : null,
      });
    });

    files.forEach((file) => {
      const fileId = file._id.toString();
      const fileNode = fileMap.get(fileId);

      if (file.parentId) {
        const parentId = file.parentId._id.toString();
        const parent = fileMap.get(parentId);

        if (parent.children) parent.children.push(fileNode);
      } else {
        tree.push(fileNode);
      }
    });

    return tree;
  }

  async createFile({
    userId,
    fileData,
  }: {
    userId: string;
    fileData: CreateFileDto;
  }) {
    return this.fileRepository.create({
      name: fileData.name,
      parentId: fileData.parentId
        ? new Types.ObjectId(fileData.parentId)
        : null,
      isFolder: fileData.isFolder,
      userId,
    });
  }

  async renameFile(fileData: RenameFileDto & { userId: string }) {
    return await this.fileRepository.findOneAndUpdate(
      {
        _id: new Types.ObjectId(fileData.id),
        userId: fileData.userId,
      },
      {
        $set: { name: fileData.newName },
      },
    );
  }
}
