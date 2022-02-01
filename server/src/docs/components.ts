export default {
  components: {
    schemas: {
      ProductId: {
        type: 'string',
        description: 'An id of a product',
        example: '61717f366466441a1936e9fa',
      },
      UserId: {
        type: 'string',
        description: 'An id of an user.',
        example: '6185584bc0d33bdb01a32966',
      },
      OrderId: {
        type: 'string',
        description: 'An id of an order.',
        example: '61a6bba3f5c7da3594512795',
      },
      User: {
        type: 'object',
        description: 'User data.',
        properties: {
          id: {
            type: 'string',
            description: 'User id.',
            example: '61855811efae7a5e849ebb9c',
          },
          email: {
            type: 'string',
            description: 'User email.',
            example: 'test1@example.com',
          },
          nombre: {
            type: 'string',
            description: 'User name.',
            example: 'Jon Doe',
          },
          direccion: {
            type: 'object',
            description: 'User address.',
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
            description: 'ID of the user.',
            example: '30403489',
          },
          admin: {
            type: 'boolean',
            description: 'Determines if an user is admin or not.',
            example: false,
          },
        },
      },

      Product: {
        type: 'object',
        description: 'A product.',
        properties: {
          id: {
            type: 'string',
            description: 'Product identification id',
            example: '61717f366466441a1936e9fa',
          },
          nombre: {
            type: 'string',
            description: 'Product name',
            example: 'Camiseta de Boca',
          },
          descripcion: {
            type: 'string',
            description: 'Product description',
            example: 'Camiseta suplente de Boca Juniors',
          },
          precio: {
            type: 'number',
            description: 'Product price',
            example: '123.4',
          },
          categoria: {
            type: 'string',
            description: 'Product category',
            example: 'camisetas',
          },
          fotos: {
            type: 'array',
            description: 'Product images names',
            items: {
              type: 'string',
              example: 'mypicture.jpg',
            },
          },
          stock: {
            type: 'number',
            description: 'Product stock',
            example: '21',
          },
        },
      },
      NewProduct: {
        type: 'object',
        description: 'Product data when saving a new product.',
        properties: {
          nombre: {
            type: 'string',
            description: 'Product name',
            example: 'Camiseta de Boca',
          },
          descripcion: {
            type: 'string',
            description: 'Product description',
            example: 'Camiseta suplente de Boca Juniors, con el logo de Boca Juniors',
          },
          precio: {
            type: 'number',
            description: 'Product price',
            example: '123.4',
          },
          categoria: {
            type: 'string',
            description: 'Product category',
            example: 'Games',
          },
          fotos: {
            type: 'array',
            description: 'Product images.',
            items: {
              type: 'string',
            },
          },
          stock: {
            type: 'number',
            description: 'Product stock',
            example: '21',
          },
        },
      },
      UpdateProduct: {
        type: 'object',
        description: 'Product data when updating a product.',
        properties: {
          nombre: {
            type: 'string',
            description: 'Product name',
            example: 'Test Product',
          },
          descripcion: {
            type: 'string',
            description: 'Product description',
            example:
              'Ac nulla fringilla, suscipit justo in, facilisis velit. Vivamus ac tempus ligula. Donec facilisis augue quis felis vestibulum, vitae semper est egestas.',
          },
          categoria: {
            type: 'string',
            description: 'Product category',
            example: 'Games',
          },
          precio: {
            type: 'number',
            description: 'Product price',
            example: '123.4',
          },
          fotos: {
            type: 'array',
            description: 'Product images.',
            example: '["myproduct.jpg", "myproduct2.jpg", "myproduct3.jpg"]',
          },
          stock: {
            type: 'number',
            description: 'Product stock',
            example: '21',
          },
        },
      },
      CartItem: {
        type: 'object',
        description: 'A product in the cart.',
        properties: {
          product: {
            $ref: '#/components/schemas/Product',
          },
          qty: {
            type: 'number',
            description: 'Amount of this product in the cart.',
            example: '1',
          },
        },
      },
      OrderItem: {
        type: 'object',
        description: 'A product in an order.',
        properties: {
          id: {
            type: 'string',
            description: 'Product id.',
            example: '61c9cb67a145f288c70acd8d',
          },
          precio: {
            type: 'number',
            description: 'Product price.',
            example: '100',
          },
          qty: {
            type: 'number',
            description: 'Product quantity ordered.',
            example: '1',
          },
        },
      },
      Order: {
        type: 'object',
        description: 'An Order.',
        properties: {
          user: {
            type: 'object',
            description: 'User id and email',
            properties: {
              id: {
                $ref: '#/components/schemas/UserId',
              },
              email: {
                type: 'string',
                description: 'Email of the user who created the order.',
                example: 'test1@example.com',
              },
            },
          },
          products: {
            $ref: '#/components/schemas/OrderItem',
          },
          total: {
            type: 'number',
            description: 'Total price of the order.',
            example: '1500',
          },
          estado: {
            type: 'string',
            description:
              'Order status, can be "generada" for generated but not completed orders, or "completada" for completed orders.',
            example: 'generada',
          },
          direccionEntrega: {
            type: 'string',
            description: 'Delivery Address.',
            example: 'Prueba 123, Piso 1, Depto. 121',
          },
          cp: {
            type: 'string',
            description: 'Postal code.',
            example: '12345678',
          },
          timestamp: {
            type: 'string',
            description: 'Date and time when the order was created.',
            example: '2021-12-01T00:02:43.013Z',
          },
          updatedAt: {
            type: 'string',
            description: 'Date and time when the order was last updated.',
            example: '2021-12-01T00:02:43.013Z',
          },
          id: {
            $ref: '#/components/schemas/OrderId',
          },
        },
      },
      Error: {
        type: 'object',
        description: 'Error structure.',
        properties: {
          error: {
            type: 'string',
            description: 'Error internal code.',
            example: '-4',
          },
          name: {
            type: 'string',
            description: 'Name of the error class.',
            example: 'NotFound',
          },
          message: {
            type: 'string',
            description: 'Error message.',
            example: 'Producto no encontrado',
          },
          stack: {
            type: 'string',
            description: 'Error stack trace',
            example:
              'NotFound: Producto no encontrado\n    at new BaseError (/home/alizardo/Projects/coderhouse-ecommerce/back/src/errors/index.ts:13:11)\n    at new NotFound (/home/alizardo/Projects/coderhouse-ecommerce/back/src/errors/index.ts:36:5)\n    at ProductosModelMongoDb.<anonymous> (/home/alizardo/Projects/coderhouse-ecommerce/back/src/models/mongoDb/producto.ts:83:15)\n    at Generator.throw (<anonymous>)\n    at rejected (/home/alizardo/Projects/coderhouse-ecommerce/back/src/models/mongoDb/producto.ts:6:65)\n    at processTicksAndRejections (internal/process/task_queues.js:93:5)',
          },
          descripcion: {
            type: 'string',
            description: 'Error description, can be present or not.',
            example: 'Faltan los siguientes campos: nombre',
          },
        },
      },
    },
  },
}
