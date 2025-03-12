import { Controller, Get, Query } from '@nestjs/common';
import { FunctionNodeService } from '../service/functionNode.service';

@Controller('function-nodes')
export class FunctionNodeController {
  constructor(private readonly functionNodeService: FunctionNodeService) {}

  @Get('')
  getAllFunctionNodes(
    @Query(':fileId')
    fileId: string,
  ) {
    return this.functionNodeService.getAllFunctionNodes(fileId);
  }
}
