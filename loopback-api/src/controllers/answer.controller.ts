import {
  Filter,
  repository,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  del,
  requestBody,
} from '@loopback/rest';
import {Answer} from '../models';
import {AnswerRepository} from '../repositories';

export class AnswerController {
  constructor(
    @repository(AnswerRepository)
    public answerRepository : AnswerRepository,
  ) {}

  @post('/answers', {
    responses: {
      '200': {
        description: 'Answer model instance',
        content: {'application/json': {schema: getModelSchemaRef(Answer)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Answer, {
            title: 'NewAnswer',
            exclude: ['id'],
          }),
        },
      },
    })
    answer: Omit<Answer, 'id'>,
  ): Promise<Answer> {
    return this.answerRepository.create(answer);
  }

  @get('/answers', {
    responses: {
      '200': {
        description: 'Array of Answer model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(Answer, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(Answer) filter?: Filter<Answer>,
  ): Promise<Answer[]> {
    return this.answerRepository.find(filter);
  }

  @del('/answers', {
    responses: {
      '204': {
        description: 'Answers DELETE success',
      },
    },
  })
  async deleteAll(): Promise<void> {
    await this.answerRepository.deleteAll();
  }
}
