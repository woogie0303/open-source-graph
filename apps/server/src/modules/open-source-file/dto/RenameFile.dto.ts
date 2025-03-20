import { IsString } from 'class-validator';

export class RenameFileDto {
  @IsString()
  id: string;
  @IsString()
  newName: string;
}
