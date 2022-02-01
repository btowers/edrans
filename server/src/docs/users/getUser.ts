export default {
  get: {
    tags: ['User'],
    description: 'Get logged in user data',
    operationId: 'getUser',
    responses: {
      200: {
        description: 'User was obtained.',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/User',
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
