import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/database/repository';
import { File, FileDocument } from '../schema/file.schema';

export class FileRepository extends BaseRepository<FileDocument> {
  constructor(
    @InjectModel(File.name)
    private readonly fileModel: Model<FileDocument>,
  ) {
    super(fileModel);
  }
}
