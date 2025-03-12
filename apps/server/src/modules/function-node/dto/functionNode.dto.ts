import { IsArray, IsString } from 'class-validator';

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
