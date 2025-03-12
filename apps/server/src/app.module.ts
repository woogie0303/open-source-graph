import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { FunctionNodeModule } from './modules/function-node/functionNode.module';
import { FileModule } from './modules/open-source-file/file.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    FileModule,
    FunctionNodeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
