import { Injectable, NotFoundException } from '@nestjs/common';
import { FilterQuery, HydratedDocument, Model, UpdateQuery } from 'mongoose';

@Injectable()
export abstract class BaseRepository<T> {
  constructor(protected readonly model: Model<T>) {}

  async findOne(documentFilterQuery: FilterQuery<T>): Promise<T | null> {
    const document = await this.model.findOne(documentFilterQuery).exec();

    if (!document) {
      throw new NotFoundException(
        `document not found with id ${documentFilterQuery._id}`,
      );
    }

    return document;
  }

  async find(documentFilterQuery: FilterQuery<T>): Promise<T[]> {
    return await this.model
      .find(documentFilterQuery)
      .lean<T[]>({ default: true })
      .exec();
  }

  async create(createDocumentData: Partial<T>): Promise<T> {
    const document = new this.model(createDocumentData);

    return (await document.save()) as HydratedDocument<T>;
  }

  async updateOne(
    documentFilterQuery: FilterQuery<T>,
    updateFilterData: UpdateQuery<Partial<T>>,
  ) {
    return this.model
      .updateOne(
        documentFilterQuery,
        { $set: updateFilterData },
        {
          new: true,
        },
      )
      .exec();
  }

  async findOneAndUpdate(
    documentFilterQuery: FilterQuery<T>,
    updateFilterData: UpdateQuery<Partial<T>>,
  ) {
    return this.model
      .findOneAndUpdate(
        documentFilterQuery,
        { $set: updateFilterData },
        {
          new: true,
        },
      )
      .exec();
  }

  async findWithPopulate(
    documentFilterQuery: FilterQuery<T>,
    populateOptions: any,
  ): Promise<T[]> {
    return this.model
      .find(documentFilterQuery)
      .populate(populateOptions)
      .exec();
  }

  async deleteOne(documentFilterQuery: FilterQuery<T>): Promise<boolean> {
    const deleteResult = await this.model.deleteOne(documentFilterQuery).exec();

    return deleteResult.deletedCount === 1;
  }
}
