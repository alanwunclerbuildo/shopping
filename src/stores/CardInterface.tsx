import { createContext, ReactNode, useState } from 'react';
import { Product } from './products.types';

type Props = {
    children: ReactNode;
}

type ProductsState = {
    [key: string]: {
        product: Product;
        count: number;
    }
}

export const CardInterfaceContext = createContext({
    productsState: {} as ProductsState,
    addProduct: (product: Product) => {},
    removeProduct: (product: Product) => {},
    changeProductsCount: (product: Product, count: number) => {},
});

const CardInterface = (props: Props) => {
    const [ productsState, setProductsState ] = useState<ProductsState>({});

    const addProduct = (product: Product) => {
        setProductsState(prevState => {
            if(prevState[product.productId.value]) {
                return {
                    ...prevState,
                    [product.productId.value]: {
                        product,
                        count: prevState[product.productId.value].count + 1
                    }
                }
            }

            return {
                ...prevState,
                [product.productId.value]: {
                    product,
                    count: 1
                }
            }
        })
    }
    const removeProduct = (product: Product) => {
        setProductsState(prevState => {
            const newState = {...prevState};

            delete newState[product.productId.value];

            return newState
        })
    }
    const changeProductsCount = (product: Product, count: number) => {
        if(count === 0) {
            removeProduct(product)
            return 
        }

        setProductsState({
            ...productsState,
            [product.productId.value]: {
                ...productsState[product.productId.value],
                count: count
            }
        });
    }

    return (
        <CardInterfaceContext.Provider value={{
            productsState,
            addProduct,
            removeProduct,
            changeProductsCount,
        }}>
            {props.children}
        </CardInterfaceContext.Provider>
    )
}

export default CardInterface;
