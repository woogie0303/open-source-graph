import { Model } from 'mongoose';
import { BaseRepository } from 'src/database/repository';
import { FileDocument } from '../schema/file.schema';

export class FileRepository extends BaseRepository<FileDocument> {
  constructor(private readonly fileModel: Model<FileDocument>) {
    super(fileModel);
  }
}
