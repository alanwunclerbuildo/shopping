import { useContext } from "react";
import styled from "styled-components";
import { CardInterfaceContext } from "../stores/CardInterface";
import { Product } from "../stores/products.types";
import { ArrowButton } from "../styledComponents/Buttons";
import { isInteger } from "../utils";

type Props = {
    product: Product;
    count: number;
}

const StyledParagraph = styled.p`
    font-size: 14px;
    color: #000000;
    font-family: monospace;
    text-align: center;
    width: calc(100% - 30px)
`;

const ProductInCardList = (props: Props) => {
    const { productsState, addProduct, removeProduct, changeProductsCount } = useContext(CardInterfaceContext);

    const productState = productsState[props.product.productId.value];

    const handleCountChange: React.ChangeEventHandler<HTMLInputElement> = event => {
        const value = event.target.value;

        if(!value) {
            removeProduct(props.product);
            
            return
        }
        
        if(!isInteger(value)) {
            return
        }

        changeProductsCount(props.product, Number(value));
    }

    return (
        <div style={{display: 'flex', background: '#fff', justifyContent: 'space-between', alignItems: 'center'}}>
            <div>
                <img src={props.product.imageUrl} alt={props.product.name} style={{
                    height: '60px',
                    width: '60px',
                    objectFit: 'contain'
                }} />
            </div>
            <div style={{margin: '10px', position: 'relative'}}>
                <StyledParagraph>{props.product.name}</StyledParagraph>
                <StyledParagraph>Total price: ${props.product.price * props.count}</StyledParagraph>
                <div style={{padding: '0 10px'}}>
                    <ArrowButton onClick={() => changeProductsCount(props.product, productState?.count - 1)}>&darr;</ArrowButton>
                    <input value={props.count} onChange={handleCountChange} />
                    <ArrowButton onClick={() => addProduct(props.product)}>&uarr;</ArrowButton>
                </div>
                <button 
                    onClick={() => removeProduct(props.product)} 
                    style={{
                        position: 'absolute',
                        right: '0',
                        top: '0',
                        color: '#b80f0a',
                        border: 'none',
                        background: 'transparent',
                        cursor: 'pointer'
                    }}
                >&#10539;</button>
            </div>
        </div>
    )
}

export default ProductInCardList;