import { AggregateOptions, Document, FilterQuery, Model, PipelineStage, QueryOptions, UpdateQuery } from 'mongoose';

export abstract class EntityAbstractRepositoryMongo<T extends Document> {
  constructor(protected readonly enityModel: Model<T>) {}

  async findOne(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T | null> {

    return await this.enityModel
      .findOne(entityFilterQuery, {
        _id: 0,
        __v: 0,
        ...projection,
      })
      .exec();
  }

  async find(
    entityFilterQuery: FilterQuery<T>,
    projection?: Record<string, unknown>,
  ): Promise<T[] | null> {
    
    return await this.enityModel.find(entityFilterQuery, {
      _id: 0,
      __v: 0,
      ...projection,
    });
  }

  async create(entityData: unknown): Promise<T | null> {
    const doc = await this.enityModel.create(entityData);
    return await doc.save();
  }

  async findOneAndUpdate(
    entityFilterQuery: FilterQuery<T>,
    updatedData: UpdateQuery<T>,
  ): Promise<T | null> {
    return await this.enityModel.findOneAndUpdate(
      entityFilterQuery,
      updatedData,
      {
        new: true,
      },
    );
  }

  async findOneAndDelete(entityFilterQuery: FilterQuery<T>): Promise<T | null> {
    return await this.enityModel.findOneAndDelete(entityFilterQuery);
  }

  async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<number> {
    const result = await this.enityModel.deleteMany(entityFilterQuery);
    return result.deletedCount;
  }

  async findWithAggrigattion(pipeline:PipelineStage[],aggregateOptions?:AggregateOptions):Promise<T[] | null>{
    
    const result = await this.enityModel.aggregate(pipeline,aggregateOptions)
    return result;
  }
}
