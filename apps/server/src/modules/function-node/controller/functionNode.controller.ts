import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { DeleteNodeDto } from '../dto/DeleteNode.dto';
import {
  CreateFunctionNodeDto,
  UpdateEditorBlockDto,
} from '../dto/functionNode.dto';
import { GetFunctionNodeDto } from '../dto/GetFunctionNode.dto';
import { UpdateFunctionNode } from '../dto/UpdateFunctionNode.dto';
import { FunctionNodeService } from '../service/functionNode.service';

@Controller('function-nodes')
export class FunctionNodeController {
  constructor(private readonly functionNodeService: FunctionNodeService) {}

  @Get('')
  getAllFunctionNodes(
    @Query('fileId')
    fileId: string,
  ) {
    return this.functionNodeService.getAllFunctionNodes(fileId);
  }

  @Get('/node')
  getFunctionNode(
    @Query()
    node: GetFunctionNodeDto,
  ) {
    return this.functionNodeService.getFunctionNode(node.id);
  }

  @Post()
  createFunctionNode(
    @Body()
    newFunctionNode: CreateFunctionNodeDto,
  ) {
    return this.functionNodeService.createFunctionNode(newFunctionNode);
  }

  @Delete()
  deleteFunctionNode(@Query() deleteNodeDto: DeleteNodeDto) {
    this.functionNodeService.deleteFunctionNode(deleteNodeDto);
  }

  @Patch('/editor-block')
  async updateEditorBlock(
    @Body()
    updateEditorBlockDto: UpdateEditorBlockDto,
  ) {
    await this.functionNodeService.updateEditorBlock(updateEditorBlockDto);
  }

  @Patch('/node')
  async updateFunctionNode(
    @Body()
    updateFunctionNodeDti: UpdateFunctionNode,
  ) {
    return await this.functionNodeService.updateFunctionNode(
      updateFunctionNodeDti,
    );
  }
}
