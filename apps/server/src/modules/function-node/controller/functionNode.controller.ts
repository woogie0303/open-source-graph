import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  CreateFunctionNodeDto,
  UpdateEditorBlockDto,
} from '../dto/functionNode.dto';
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

  @Delete()
  deleteFunctionNode(@Query('nodeId') nodeId: string) {
    this.functionNodeService.deleteFunctionNode(nodeId);
  }

  @Patch('editor-block')
  updateEditorBlock(
    @Body()
    updateEditorBlockDto: UpdateEditorBlockDto,
  ) {
    this.functionNodeService.updateEditorBlock(updateEditorBlockDto);
  }
}
