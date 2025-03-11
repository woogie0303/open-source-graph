import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModule } from './modules/open-source-file/file.module';

@Module({
  imports: [FileModule, MongooseModule.forRoot(process.env.MONGODB_URI)],
  controllers: [],
  providers: [],
})
export class AppModule {}
