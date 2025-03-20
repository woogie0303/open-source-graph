import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expose } from 'class-transformer';
import { HydratedDocument, Types } from 'mongoose';
import { TransformObjectIdToString } from 'src/common/decorator/Expose.decorator';
import { EditorBlock } from '../types/functionNode.type';

@Schema({ timestamps: true })
export class FunctionNode {
  @TransformObjectIdToString({ toClassOnly: true })
  @Expose()
  id: Types.ObjectId;

  @Prop({ required: true })
  @Expose()
  name: string;

  @Prop({ required: true })
  @Expose()
  codeText: string;

  @TransformObjectIdToString({ toClassOnly: true })
  @Prop({ type: Types.ObjectId, ref: 'file' })
  @Expose()
  fileId: Types.ObjectId;

  @TransformObjectIdToString({ toClassOnly: true })
  @Prop({ type: Types.ObjectId, ref: 'FunctionNode', default: null })
  @Expose()
  connection: Types.ObjectId[] | null;

  @Prop()
  @Expose()
  editorBlock?: EditorBlock[];
}

export type FunctionNodeDocument = HydratedDocument<FunctionNode>;
export const FunctionNodeSchema = SchemaFactory.createForClass(FunctionNode);
