import { IsArray, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { TransformValidationObjectId } from 'src/common/decorator/Expose.decorator';
import { EditorBlock } from '../types/functionNode.type';

export class CreateFunctionNodeDto {
  @IsString()
  name: string;

  @TransformValidationObjectId({ toClassOnly: true })
  fileId: Types.ObjectId;

  @IsString()
  codeText: string;

  @IsArray()
  @TransformValidationObjectId({ toClassOnly: true })
  connection: Types.ObjectId[] | null;
}

export class UpdateEditorBlockDto {
  @TransformValidationObjectId({ toClassOnly: true })
  functionNodeId: Types.ObjectId;
  editorBlock: EditorBlock[];
}
