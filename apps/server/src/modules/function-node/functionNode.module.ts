import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FunctionNodeController } from './controller/functionNode.controller';
import { FunctionNodeRepository } from './repository/functionNode.repository';
import { FunctionNode, FunctionNodeSchema } from './schema/functionNode.schema';
import { FunctionNodeService } from './service/functionNode.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FunctionNode.name, schema: FunctionNodeSchema },
    ]),
  ],
  controllers: [FunctionNodeController],
  providers: [FunctionNodeService, FunctionNodeRepository],
})
export class FunctionNodeModule {}
