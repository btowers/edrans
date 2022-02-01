export default {
  post: {
    tags: ['User'],
    description: 'Sign up to the system (add a valid user).',
    operationId: 'signup',
    parameters: [],
    requestBody: {
      required: true,
      content: {
        'multipart/form-data': {
          schema: {
            type: 'object',
            properties: {
              email: {
                type: 'string',
                description: 'User email.',
                example: 'test5@example.com',
              },
              password: {
                type: 'string',
                description:
                  'User password, must have at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character',
                example: 'Secret5*',
              },
              repeatPassword: {
                type: 'string',
                description: 'Password validation. Must be the same as password.',
                example: 'Secret5*',
              },
              nombre: {
                type: 'string',
                description: 'User name.',
                example: 'Jon Doe',
              },

              direccion: {
                type: 'object',
                properties: {
                  calle: {
                    type: 'string',
                    description: 'User address street.',
                    example: 'San Martin',
                  },
                  altura: {
                    type: 'string',
                    description: 'User address street number.',
                    example: '1550',
                  },
                  piso: {
                    type: 'string',
                    description: 'User address floor number, optional.',
                    example: '1',
                  },
                  departamento: {
                    type: 'string',
                    description: 'User address department number, optional.',
                    example: '23',
                  },
                  cp: {
                    type: 'string',
                    description: 'User postal code.',
                    example: '1234567',
                  },
                },
              },
              identificador: {
                type: 'string',
                description: 'User phone number, with international code.',
                example: '+56912345678',
              },
              admin: {
                type: 'string',
                description:
                  'Determines if an user will be added as admin or not, can be "true" or "false", but only an admin user can create another admin user',
                example: 'false',
              },
            },
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Successful signup.',
      },
      400: {
        description: 'One of the fields values did not pass validation.',
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
