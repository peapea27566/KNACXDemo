export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
}

export const defaultProduct: Product = {
  id: '',
  title: '',
  description: '',
  image: './logo.png',
  price: 0.0,
};



export interface ProductCart extends Product {
  quantity: number;
}