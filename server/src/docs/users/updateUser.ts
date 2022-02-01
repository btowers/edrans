export default {
  get: {
    tags: ['User'],
    description: 'Update an specific user. Only available for logged in user',
    operationId: 'updateUser',
    responses: {
      200: {
        description: 'User was updated.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/User',
            },
          },
        },
      },
      400: {
        description: 'Missing fields to update',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
            },
          },
        },
      },
      404: {
        description: 'The user does not exist.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
            },
          },
        },
      },
    },
  },
}
