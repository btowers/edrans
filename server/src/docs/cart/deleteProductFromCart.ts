export default {
  delete: {
    tags: ['Cart'],
    description: 'Delete a product from the cart.',
    operationId: 'deleteCartItem',
    parameters: [],
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            description: 'Information of a product to delete from the cart.',
            properties: {
              productId: {
                $ref: '#/components/schemas/ProductId',
              },
              qty: {
                type: 'number',
                description: 'Amount of this product to delete from the cart.',
                example: '5',
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Product was removed successfully from the cart.',
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
          "The cart does not exists (there's no cart associated to the user) or the product you want to delete is not in the cart.",
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
