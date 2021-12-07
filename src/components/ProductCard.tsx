import { useContext } from "react";
import styled from "styled-components";
import { CardInterfaceContext } from "../stores/CardInterface";
import { Product } from "../stores/products.types";
import { ArrowButton } from "../styledComponents/Buttons";
import { isInteger } from "../utils";

type Props = {
    product: Product;
}

const StyledParagraph = styled.p`
    font-size: 14px;
    color: #000000;
    font-family: monospace;
    text-align: center;
`

const StyledButton = styled.button`
    border: 1px solid #ccc;
    width: 100%;
    height: 36px;
    background-color: #fff;
    cursor: pointer;
`

const ProductCard = (props: Props) => {
    const { productsState, addProduct, removeProduct, changeProductsCount } = useContext(CardInterfaceContext);

    const productState = productsState[props.product.productId.value];

    const renderButton = () => {
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
        
        if (productState?.count) {
            return (
                <StyledButton>
                    <ArrowButton onClick={() => changeProductsCount(props.product, productState?.count - 1)}>&darr;</ArrowButton>
                    <input value={productState.count} onChange={handleCountChange} />
                    <ArrowButton onClick={() => addProduct(props.product)}>&uarr;</ArrowButton>
                </StyledButton>
            )
        }

        return (
            <StyledButton onClick={() => addProduct(props.product)}>
                Add to card
            </StyledButton>
        )
    }

    return (
        <div style={{
            width: '200px',
            padding: '20px'
        }}>
            <img src={props.product.imageUrl} alt={props.product.name} style={{
                height: '154px',
                width: '200px',
                marginBottom: '26px',
                objectFit: 'contain'
            }} />
            <StyledParagraph>{props.product.name}</StyledParagraph>
            <StyledParagraph>${props.product.price}</StyledParagraph>
            {renderButton()}
        </div>
    )
}

export default ProductCard;