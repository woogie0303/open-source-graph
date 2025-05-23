import { applyDecorators } from '@nestjs/common';
import { ExposeOptions, Transform } from 'class-transformer';
import { isArray, NotEquals } from 'class-validator';
import mongoose, { isValidObjectId, Types } from 'mongoose';

const failToConvertMongoId = 'mongoIdCheckFail';

const ObjectIdTransForm =
  (options?: ExposeOptions) => (target, propertyKey) => {
    Transform(({ value }) => {
      switch (true) {
        case Array.isArray(value):
          const objectIdArr = value.map((el) => {
            if (mongoose.isValidObjectId(el)) return new Types.ObjectId(el);
          });

          if (objectIdArr.length !== value.length) return failToConvertMongoId;
          return objectIdArr;
        // file parent id 때문
        case value === null:
          return null;
        default:
          if (!mongoose.isValidObjectId(value)) return failToConvertMongoId;
          return new Types.ObjectId(value);
      }
    }, options)(target, propertyKey);
  };

export const TransformObjectIdToString =
  (options?: ExposeOptions) => (target, propertyKey) => {
    Transform(({ value, obj }) => {
      switch (true) {
        case isValidObjectId(obj[propertyKey]?.toString()) &&
          !isArray(obj[propertyKey]):
          return obj[propertyKey].toString();
        // string값 체크 이유는 repository의 find메서드에 lean을 사용했기 때문
        case typeof obj[propertyKey] === 'string':
          return value;
        // parentId가 null일 경우
        case !value && propertyKey !== 'id':
          return value;
        case Array.isArray(obj[propertyKey]):
          return obj[propertyKey].map((el) => el.toString());
        default:
          return obj._id.toString();
      }
    }, options)(target, propertyKey);
  };

export const TransformValidationObjectId = (options?: ExposeOptions) => {
  return applyDecorators(
    ObjectIdTransForm(options),
    NotEquals(failToConvertMongoId, {
      message: 'MongoId 형식 오류',
    }),
  );
};
