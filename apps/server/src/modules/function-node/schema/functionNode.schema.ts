import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true })
export class FunctionNode {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  codeText: string;

  @Prop({ type: Types.ObjectId, ref: 'file' })
  fileId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'FunctionNode', default: null })
  connection: Types.ObjectId[] | null;
}

export type FunctionNodeDocument = HydratedDocument<FunctionNode>;
export const FunctionNodeSchema = SchemaFactory.createForClass(FunctionNode);
