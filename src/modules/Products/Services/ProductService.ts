import ApiService from '../../../core/Axios/ApiService';

export type Product = {
  id?: number;
  code: string;
  name: string;
  price: number;
  description: string;
  photo: File | string;
  quantity?: number;
};

export type ProductNoImage = {
  id: number;
  name: string;
};

export default class ProductService {
  async getAllProducts(): Promise<Product[]> {
    const response = await ApiService.get('/api/products');

    return this._mapProducts(response.data);
  }

  async getAllProductsWithoutImage() {
    const response = await ApiService.get('/api/no-image');

    return response.data;
  }

  async getProductById(id: number): Promise<Product> {
    const response = await ApiService.get(`/api/products/${id}`);

    return this._mapProduct(response.data);
  }

  async createProduct(product: Product | FormData): Promise<any> {
    return await ApiService.post('/api/products', product);
  }

  async updateProduct(product: Product | FormData): Promise<any> {
    //@ts-ignore
    return await ApiService.put(`/api/products/${product.id}`, product);
  }

  async addProductToProject(
    projectId: number,
    productId: number,
    quantity: number
  ): Promise<any> {
    await ApiService.post(`/api/projects/${projectId}/products/add`, {
      project_id: projectId,
      product_id: productId,
      quantity: quantity,
    });
  }

  private _mapProducts(response: Product[]): Product[] {
    return response.map((product: Product) => this._mapProduct(product));
  }

  private _mapProduct(product: Product): Product {
    return {
      id: product.id,
      code: product.code,
      name: product.name,
      description: product.description,
      price: product.price,
      photo: product.photo,
      ...(product.quantity && { quantity: product.quantity }),
    };
  }
}
