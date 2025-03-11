import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateFileDto, RenameFileDto } from '../dto/fileTreeDto';
import { FileService } from '../service/file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}
  @Get('/all')
  getUserFiles() {
    return this.fileService.getUserFiles('sdf');
  }

  @Post('/')
  createFile(@Body() fileData: CreateFileDto) {
    return this.fileService.createFile({
      userId: 'sdf',
      fileData,
    });
  }

  @Patch('/rename')
  renameFile(@Body() fileData: RenameFileDto) {
    this.fileService.renameFile({
      userId: 'sdf',
      id: fileData.id,
      newName: fileData.newName,
    });
  }

  @Delete('')
  deleteFile(
    @Query('id')
    fileId: string,
  ) {
    this.fileService.deleteFile(fileId);
  }
}
