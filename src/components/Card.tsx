import { useContext } from "react";
import { CardInterfaceContext } from "../stores/CardInterface";
import ProductInCardList from './ProductInCardList';

const Card = () => {
    const { productsState } = useContext(CardInterfaceContext);

    return (
        <div style={{borderRight: '1px solid #ccc', minHeight: '100%'}}>
            <div style={{
                height: '60px', 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#000',
                fontSize: '12px',
                fontWeight: 700
            }}>
                Card header
            </div>
            <div style={{
                padding: '25px', 
                minHeight: '100%'
            }}>
                <div style={{backgroundColor: 'rgba(240, 231, 221, 0.5)', minHeight: 'calc(100vh - 60px)'}}>
                    {Object.entries(productsState).map(([idProduct, productState]) => (
                        <ProductInCardList key={idProduct} count={productState.count} product={productState.product} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Card;