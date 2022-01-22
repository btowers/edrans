import Joi from "joi";

export interface ProductI extends NewProductI {
  _id: string;
  fotos: Array<string>;
}

export interface NewProductI {
  nombre: string;
  descripcion: string;
  categoria: string;
  precio: number;
  stock: number;
}

export interface updateProductI {
  nombre?: string;
  descripcion?: string;
  categoria?: string;
  fotos?: Array<string>;
  precio?: number;
  stock?: number;
}

export interface ProductQuery {
  categoria?: string;
  _id?: string;
  nombre?: string;
  codigo?: string;
  minPrice?: number;
  maxPrice?: number;
  minStock?: number;
  maxStock?: number;
}

export interface ProductBaseClass {
  getProducts(query?: ProductQuery): Promise<ProductI[]>;
  createProduct(data: NewProductI): Promise<ProductI>;
  updateProduct(id: string, product: NewProductI): Promise<ProductI>;
  updateStockProduct(id: string, qty: number): Promise<ProductI>;
  deleteProduct(id: string): Promise<ProductI>;
}

export const NewProductJoiSchema = Joi.object({
  nombre: Joi.string().required(),
  categoria: Joi.string().required(),
  descripcion: Joi.string().required(),
  stock: Joi.number().required(),
  precio: Joi.number().required(),
});

export const ProductJoiSchema = Joi.object({
  nombre: Joi.string(),
  descripcion: Joi.string(),
  categoria: Joi.string(),
  foto: Joi.string(),
  stock: Joi.number().min(0),
  precio: Joi.number().min(0),
});
