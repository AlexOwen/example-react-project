import {DefaultCrudRepository} from '@loopback/repository';
import {Answer, AnswerRelations} from '../models';
import {DatabaseDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AnswerRepository extends DefaultCrudRepository<
  Answer,
  typeof Answer.prototype.id,
  AnswerRelations
> {
  constructor(
    @inject('datasources.database') dataSource: DatabaseDataSource,
  ) {
    super(Answer, dataSource);
  }
}
