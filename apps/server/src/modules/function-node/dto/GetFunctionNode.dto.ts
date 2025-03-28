import { Types } from 'mongoose';
import { TransformValidationObjectId } from 'src/common/decorator/Expose.decorator';

export class GetFunctionNodeDto {
  @TransformValidationObjectId()
  id: Types.ObjectId;
}
