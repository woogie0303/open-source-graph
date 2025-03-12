import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseRepository } from 'src/database/repository';
import {
  FunctionNode,
  FunctionNodeDocument,
} from '../schema/functionNode.schema';

export class FunctionNodeRepository extends BaseRepository<FunctionNodeDocument> {
  constructor(
    @InjectModel(FunctionNode.name)
    private readonly functionNodeModel: Model<FunctionNodeDocument>,
  ) {
    super(functionNodeModel);
  }
}
