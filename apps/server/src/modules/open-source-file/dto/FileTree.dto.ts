import { Expose, Transform, Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class FileTreeDto {
  @IsString()
  @Expose()
  id: string;

  @IsString()
  @Expose()
  name: string;

  @Type(() => FileTreeDto)
  @Expose()
  children?: FileTreeDto[];

  @Transform(({ value }) => value.toString())
  @Expose()
  createdAt: string;
}
