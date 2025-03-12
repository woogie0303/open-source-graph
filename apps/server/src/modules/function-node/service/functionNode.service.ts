import { Injectable } from '@nestjs/common';
import { FunctionNodeRepository } from '../repository/functionNode.repository';

@Injectable()
export class FunctionNodeService {
  constructor(
    private readonly functionNodeRepository: FunctionNodeRepository,
  ) {}
  async getAllFunctionNodes(fileId: string) {
    return await this.functionNodeRepository.find({ fileId });
  }
}
