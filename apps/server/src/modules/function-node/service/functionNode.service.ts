import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { ReturnValueToDto } from 'src/common/decorator/ReturnValueToDto.decorator';
import { DeleteNodeDto } from '../dto/DeleteNode.dto';
import {
  CreateFunctionNodeDto,
  UpdateEditorBlockDto,
} from '../dto/functionNode.dto';
import { UpdateFunctionNode } from '../dto/UpdateFunctionNode.dto';
import { FunctionNodeRepository } from '../repository/functionNode.repository';
import { FunctionNode } from '../schema/functionNode.schema';

@Injectable()
export class FunctionNodeService {
  constructor(
    private readonly functionNodeRepository: FunctionNodeRepository,
  ) {}

  @ReturnValueToDto(FunctionNode)
  async getAllFunctionNodes(fileId: string) {
    const data = await this.functionNodeRepository.findWithPopulate(
      { fileId: new Types.ObjectId(fileId), isDeleted: false },
      {
        path: 'connection',
        model: 'FunctionNode',
        match: {}, // match는 생략하고 필터링 직접 처리
      },
    );

    return data.map((fn: any) => {
      const populatedConnections = fn.connection || [];

      // 필터: isDeleted가 false인 문서만 남기고
      const validConnections = populatedConnections.filter(
        (conn: any) => conn && conn.isDeleted === false,
      );

      // ObjectId만 추출
      const connectionIds = validConnections.map((conn: any) => conn._id);

      return {
        ...fn.toObject(),
        connection: connectionIds, // ← 다시 ObjectId[] 로 변환
      };
    });
  }

  @ReturnValueToDto(FunctionNode)
  async getFunctionNode(id: Types.ObjectId) {
    return await this.functionNodeRepository.findOne({ _id: id });
  }

  @ReturnValueToDto(FunctionNode)
  async createFunctionNode(newFunctionNode: CreateFunctionNodeDto) {
    return await this.functionNodeRepository.create({
      name: newFunctionNode.name,
      codeText: newFunctionNode.codeText,
      fileId: newFunctionNode.fileId,
      connection: newFunctionNode.connection,
      isDeleted: false,
    });
  }

  deleteFunctionNode(deleteNodeDto: DeleteNodeDto) {
    this.functionNodeRepository.updateOne(
      { _id: deleteNodeDto.id },
      { isDeleted: true },
    );
  }

  async updateEditorBlock(updateEditorBlockDto: UpdateEditorBlockDto) {
    return await this.functionNodeRepository.findOneAndUpdate(
      { _id: updateEditorBlockDto.functionNodeId },
      { editorBlock: updateEditorBlockDto.editorBlock },
    );
  }

  async updateFunctionNode(updateFunctionNodeDto: UpdateFunctionNode) {
    await this.functionNodeRepository.findOneAndUpdate(
      {
        _id: updateFunctionNodeDto.id,
      },
      {
        name: updateFunctionNodeDto.name,
        connection: updateFunctionNodeDto.connection,
      },
    );
  }
}
