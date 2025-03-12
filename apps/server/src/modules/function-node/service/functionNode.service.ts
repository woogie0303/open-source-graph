import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import {
  CreateFunctionNodeDto,
  UpdateEditorBlockDto,
} from '../dto/functionNode.dto';
import { FunctionNodeRepository } from '../repository/functionNode.repository';

@Injectable()
export class FunctionNodeService {
  constructor(
    private readonly functionNodeRepository: FunctionNodeRepository,
  ) {}

  async getAllFunctionNodes(fileId: string) {
    return await this.functionNodeRepository.find({ fileId });
  }

  async createFunctionNode(newFunctionNode: CreateFunctionNodeDto) {
    const changeIdToObjectId = newFunctionNode.connection?.map(
      (id) => new Types.ObjectId(id),
    );
    console.log({
      name: newFunctionNode.name,
      codeText: newFunctionNode.codeText,
      fileId: new Types.ObjectId(newFunctionNode.fileId),
      connection: changeIdToObjectId,
    });

    return await this.functionNodeRepository.create({
      name: newFunctionNode.name,
      codeText: newFunctionNode.codeText,
      fileId: new Types.ObjectId(newFunctionNode.fileId),
      connection: changeIdToObjectId,
    });
  }

  deleteFunctionNode(nodeId: string) {
    this.functionNodeRepository.deleteOne({ _id: new Types.ObjectId(nodeId) });
  }

  async updateEditorBlock(updateEditorBlockDto: UpdateEditorBlockDto) {
    return await this.functionNodeRepository.findOneAndUpdate(
      { _id: new Types.ObjectId(updateEditorBlockDto.functionNodeId) },
      {
        $set: updateEditorBlockDto.editorBlock,
      },
    );
  }
}
