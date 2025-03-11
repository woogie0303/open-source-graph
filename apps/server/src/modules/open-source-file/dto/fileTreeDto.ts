import { IsBoolean, IsString } from 'class-validator';

export class CreateFileDto {
  @IsString()
  name: string;
  @IsString()
  parentId: string;
  @IsBoolean()
  isFolder: boolean;
}

export class RenameFileDto {
  @IsString()
  id: string;
  @IsString()
  newName: string;
}
