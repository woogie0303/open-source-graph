import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsString } from 'class-validator';
import { Types } from 'mongoose';
import { TransformValidationObjectId } from 'src/common/decorator/Expose.decorator';

export class CreateFileDto {
  @IsString()
  name: string;

  @TransformValidationObjectId({ toClassOnly: true })
  parentId: Types.ObjectId | null;

  @IsBoolean()
  isFolder: boolean;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  index: number;
}
