export default {
  put: {
    tags: ['Cart'],
    description: 'Add a product & quantity to the cart.',
    operationId: 'updateCartItem',
    parameters: [],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            description: 'Information of a product to add to the cart.',
            properties: {
              productId: {
                $ref: '#/components/schemas/ProductId',
              },
              qty: {
                type: 'number',
                description: 'Amount of this product to add to the cart.',
                example: '5',
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Product amount in cart was updated.',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              description: 'Array of products in cart.',
              items: {
                $ref: '#/components/schemas/CartItem',
              },
            },
          },
        },
      },
      404: {
        description:
          "The cart does not exists (there's no cart associated to the user), the product you want to edit is not in the cart, or the productId or amount are not valid.",
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Error',
            },
          },
        },
      },
      401: {
        description: 'Unauthorized route, login first and try again',
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
