export type ProductId = {
    value: string
}

export type Product = {
    productId: ProductId;
    name: string;
    upcCode: string;
    price: number;
    description: string;
    imageUrl: string;
    category: string;
}