import { IsString } from 'class-validator';
import { Types } from 'mongoose';
import { TransformValidationObjectId } from 'src/common/decorator/Expose.decorator';

export class RenameFileDto {
  @TransformValidationObjectId()
  id: Types.ObjectId;

  @IsString()
  newName: string;
}
