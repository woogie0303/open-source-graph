import { IsArray, IsString } from 'class-validator';
import { EditorBlock } from '../types/functionNode.type';

export class CreateFunctionNodeDto {
  @IsString()
  name: string;

  @IsString()
  fileId: string;

  @IsString()
  codeText: string;

  @IsArray()
  @IsString({ each: true })
  connection: string[] | null;
}

export class UpdateEditorBlockDto {
  functionNodeId: string;
  editorBlock: EditorBlock[];
}
