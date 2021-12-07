import { createContext, ReactNode, useEffect, useState } from 'react';
import { Product } from './products.types';
import productsJSON from '../products.json';

type Props = {
    children: ReactNode;
}

export const ProductsInterfaceContext = createContext({
    products: [] as Product[],
    categories: [] as string[],
    fetchProducts: (selectedCategories: string[]) => {},
    loading: false
});

/* Mock data promise start */

const fetchProductsPromise = (selectedCategories: string[]) => {
    return new Promise<Product[]>(res => {
        setTimeout(() => {
            const products = productsJSON as Product[];
    
            res(
                selectedCategories.length === 0 ? 
                products : 
                products.filter(product => selectedCategories.includes(product.category))
            );
        }, 400);
    })
}

const fetchCategoriesPromise = () => {
    return new Promise<string[]>(res => {
        setTimeout(() => {
            const products = productsJSON as Product[];
    
            const categories: string[] = [];
    
            products.forEach(product => {
                if(!categories.includes(product.category) && product.category) {
                    categories.push(product.category)
                }
            })
    
            res(categories);
        }, 50);
    });
}

/* Mock data promise end */

const ProductsInterface = (props: Props) => {
    const [ products, setProducts ] = useState<Product[]>([]);
    const [ categories, setCategories ] = useState<string[]>([]);
    const [ loading, setLoading ] = useState(false);

    const fetchProducts = async (selectedCategories: string[]) => {
        setLoading(true);

        const response = await fetchProductsPromise(selectedCategories);

        setProducts(response);
        setLoading(false);
    }
    useEffect(() => {
        async function fetchCategories() {
            const response = await fetchCategoriesPromise();

            setCategories(response);
        }

        fetchCategories();
    }, []);

    return (
        <ProductsInterfaceContext.Provider value={{
            fetchProducts,
            products,
            categories,
            loading,
        }}>
            {props.children}
        </ProductsInterfaceContext.Provider>
    )
}

export default ProductsInterface;
