import { Expose } from 'class-transformer';
import { Types } from 'mongoose';
import { TransformValidationObjectId } from 'src/common/decorator/Expose.decorator';

export class DeleteNodeDto {
  @TransformValidationObjectId()
  @Expose()
  id: Types.ObjectId;
}
