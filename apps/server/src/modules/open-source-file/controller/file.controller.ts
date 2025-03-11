import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateFileDto } from '../dto/fileTreeDto';
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
    console.log(fileData);
    return this.fileService.createFile({
      userId: 'sdf',
      fileData,
    });
  }
}
