import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateFunctionNodeDto } from '../dto/functionNode.dto';
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

  @Post()
  createFunctionNode(
    @Body()
    newFunctionNode: CreateFunctionNodeDto,
  ) {
    return this.functionNodeService.createFunctionNode(newFunctionNode);
  }
}
