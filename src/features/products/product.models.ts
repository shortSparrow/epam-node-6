export interface ProductResponse {
  id: string;
  title: string;
  description: string;
  price: number;
}

export interface ProductDetailsResponse extends ProductResponse {}
