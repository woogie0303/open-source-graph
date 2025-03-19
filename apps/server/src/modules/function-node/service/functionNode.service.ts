import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { Types } from 'mongoose';
import {
  CreateFunctionNodeDto,
  UpdateEditorBlockDto,
} from '../dto/functionNode.dto';
import { FunctionNodeRepository } from '../repository/functionNode.repository';
import { FunctionNode } from '../schema/functionNode.schema';

@Injectable()
export class FunctionNodeService {
  constructor(
    private readonly functionNodeRepository: FunctionNodeRepository,
  ) {}

  async getAllFunctionNodes(fileId: string) {
    const data = await this.functionNodeRepository.find({
      fileId: new Types.ObjectId(fileId),
    });
    return plainToInstance(FunctionNode, data, {
      excludeExtraneousValues: true,
    });
  }

  async createFunctionNode(newFunctionNode: CreateFunctionNodeDto) {
    return await this.functionNodeRepository.create({
      name: newFunctionNode.name,
      codeText: newFunctionNode.codeText,
      fileId: new Types.ObjectId(newFunctionNode.fileId),
      connection: newFunctionNode.connection,
    });
  }

  deleteFunctionNode(nodeId: string) {
    this.functionNodeRepository.deleteOne({ _id: new Types.ObjectId(nodeId) });
  }

  async updateEditorBlock(updateEditorBlockDto: UpdateEditorBlockDto) {
    return await this.functionNodeRepository.findOneAndUpdate(
      { id: updateEditorBlockDto.functionNodeId },
      {
        $set: updateEditorBlockDto.editorBlock,
      },
    );
  }
}
