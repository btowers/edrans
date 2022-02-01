export default {
  post: {
    tags: ['User'],
    description: 'Log in to the system.',
    operationId: 'login',
    parameters: [],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
                description: 'User email.',
                example: 'test1@example.com',
              },
              password: {
                type: 'string',
                description: 'User password.',
                example: 'MyPassword*',
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Successful Login.',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                  example:
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MWY4MTg5YjU0ZjRkODRkMDdlNDZkZDIiLCJhZG1pbiI6dHJ1ZSwiaWF0IjoxNjQzNjY3MDgwLCJleHAiOjE2NDM3NTM0ODB9.F9BNM8__v6OHpZQgV5GrreQMsbrFZ7iD6rzsH-An_vM',
                },
              },
            },
          },
        },
      },
      400: {
        description: 'Bad request, email and/or password missing.',
      },
      401: {
        description: 'Unauthorized, wrong email and/or password.',
      },
    },
  },
}
