import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Expose } from 'class-transformer';
import { HydratedDocument, Types } from 'mongoose';
import { TransformObjectIdToString } from 'src/common/decorator/Expose.decorator';

@Schema({ timestamps: true })
export class File {
  @TransformObjectIdToString({ toClassOnly: true })
  @Expose()
  id: Types.ObjectId;

  @Prop({ required: true })
  @Expose()
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'File', default: null })
  @Expose()
  parentId: Types.ObjectId | null;

  // TODO: User Schema Id 추가
  @Prop({ required: true })
  @Exclude()
  userId: string;

  @Prop({ required: true })
  @Expose()
  isFolder: boolean;
}

export type FileDocument = HydratedDocument<File>;
export const FileSchema = SchemaFactory.createForClass(File);
