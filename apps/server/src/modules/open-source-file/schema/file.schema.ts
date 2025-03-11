import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true })
export class File {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Types.ObjectId, ref: 'File', default: null })
  parentId: Types.ObjectId | null;

  // TODO: User Schema Id 추가
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  isFolder: boolean;
}

export type FileDocument = HydratedDocument<File>;
export const FileSchema = SchemaFactory.createForClass(File);
