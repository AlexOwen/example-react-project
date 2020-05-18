import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';

export class ListController {

  @get('/list', {
    responses: {
      '200': {
        description: 'Array of List model instances',
        content: {
          'application/json': {},
        },
      },
    },
  })
  async find(): Promise<string[]> {
    return [
      'Lots',
      'Loads',
      'More than a reasonable amount',
    ];
  }
}
