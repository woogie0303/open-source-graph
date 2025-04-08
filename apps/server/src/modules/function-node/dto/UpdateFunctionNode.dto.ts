import { Types } from 'mongoose';
import { TransformValidationObjectId } from 'src/common/decorator/Expose.decorator';

export class UpdateFunctionNode {
  @TransformValidationObjectId()
  id: Types.ObjectId;

  name?: string;

  @TransformValidationObjectId()
  connection?: Types.ObjectId[];
}
