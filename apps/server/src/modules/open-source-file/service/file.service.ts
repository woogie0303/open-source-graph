import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { ReturnValueToDto } from 'src/common/decorator/ReturnValueToDto.decorator';
import { CreateFileDto } from '../dto/CreateFile.dto';
import { DeleteFileDto } from '../dto/DeleteFile.dto';
import { FileTreeDto } from '../dto/FileTree.dto';
import { RenameFileDto } from '../dto/RenameFile.dto';
import { FileRepository } from '../repository/file.repository';
import { File, FileDocument } from '../schema/file.schema';
import { FileTreeType } from '../types/FileTreeType';

@Injectable()
export class FileService {
  constructor(private readonly fileRepository: FileRepository) {}

  @ReturnValueToDto(FileTreeDto)
  async getUserFiles(userId: string) {
    const files = await this.fileRepository.find({ userId });

    return this.buildFileTree(files);
  }

  private buildFileTree(files: FileDocument[]) {
    const fileMap = new Map<string, FileTreeType>();
    const tree: FileTreeType[] = [];

    files.forEach((file) => {
      if (file.isFolder) {
        fileMap.set(file._id.toString(), {
          id: file._id.toString(),
          name: file.name,
          children: [],
        });
      } else {
        fileMap.set(file._id.toString(), {
          id: file._id.toString(),
          name: file.name,
        });
      }
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

  @ReturnValueToDto(File)
  async createFile({
    userId,
    fileData,
  }: {
    userId: string;
    fileData: CreateFileDto;
  }) {
    return this.fileRepository.create({
      name: fileData.name,
      parentId: fileData.parentId,
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
      { name: fileData.newName },
    );
  }
  async deleteFile(deleteFileDto: DeleteFileDto) {
    const file = await this.fileRepository.findOne({ _id: deleteFileDto.id });
    if (file.isFolder) {
      this.recursiveDeleteChildFile(deleteFileDto.id);
    } else {
      this.fileRepository.deleteOne({ _id: deleteFileDto.id });
    }
  }

  async recursiveDeleteChildFile(fileId: Types.ObjectId) {
    await this.fileRepository.deleteOne({ _id: fileId });

    const childrenFile = await this.fileRepository.find({ parentId: fileId });

    if (childrenFile.length === 0) return;

    childrenFile.forEach((childFile) => {
      this.recursiveDeleteChildFile(childFile._id);
    });
  }
}
