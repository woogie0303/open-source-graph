import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { returnValueToDto } from 'src/common/decorator/returnValueToDto.decorator';
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

  @returnValueToDto(FunctionNode)
  async getAllFunctionNodes(fileId: string) {
    return await this.functionNodeRepository.find({
      fileId: new Types.ObjectId(fileId),
    });
  }

  @returnValueToDto(FunctionNode)
  async createFunctionNode(newFunctionNode: CreateFunctionNodeDto) {
    return await this.functionNodeRepository.create({
      name: newFunctionNode.name,
      codeText: newFunctionNode.codeText,
      fileId: newFunctionNode.fileId,
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
