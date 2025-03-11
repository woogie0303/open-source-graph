import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileController } from './controller/file.controller';
import { FileRepository } from './repository/file.repository';
import { File, FileSchema } from './schema/file.schema';
import { FileService } from './service/file.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: File.name,
        schema: FileSchema,
      },
    ]),
  ],
  controllers: [FileController],
  providers: [FileService, FileRepository],
})
export class FileModule {}
