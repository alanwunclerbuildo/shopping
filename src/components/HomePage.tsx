import { useContext, useEffect, useState } from "react"
import { ProductsInterfaceContext } from "../stores/ProductsInterface"
import Card from "./Card";
import ProductCard from "./ProductCard";

const HomePage = () => {
    const { fetchProducts, products, categories, loading } = useContext(ProductsInterfaceContext);
    const [ selectedCategories, setSelectedCategories ] = useState<string[]>([]);

    const isCategorySelected = (category: string) => selectedCategories.includes(category);
    const handleSelectCategory = (category: string) => {
        const newSelectedCategories = selectedCategories.includes(category) ?
            selectedCategories.filter(c => c !== category) :
            selectedCategories.concat(category);
            
        setSelectedCategories(newSelectedCategories);

        fetchProducts(newSelectedCategories);
    }

    useEffect(() => {
        fetchProducts(selectedCategories);
    }, []);

    return (
        <div style={{display: 'flex'}}>
            <div style={{width: '75%', minHeight: '100vh', borderRight: '1px solid rgba(200, 200, 200, 0.5)'}}>
                <div style={{
                    height: '59px', 
                    borderBottom: '1px solid rgba(200, 200, 200, 0.5)', 
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <span style={{padding: '14px 23px'}}>Brand</span>
                    <input style={{
                        padding: '10px',
                        color: '#aeaeae',
                        borderRadius: '2px',
                        border: '1px solid rgba(200, 200, 200, 0.5)',
                        width: '500px'
                    }} placeholder='search here' />
                </div>
                <div style={{padding: '25px 80px'}}>
                    <div style={{padding: '15px 0', fontSize: '12px', fontWeight: 700, color: '#000'}}>
                        Shop by category
                    </div>
                    <div style={{display: 'flex', flexWrap: 'wrap', marginBottom: '40px'}}>
                        {categories.map(category => (
                            <span key={category} onClick={() => handleSelectCategory(category)} style={{
                                padding: '10px 16px',
                                background: isCategorySelected(category) ? "#000" : "#fff",
                                border: '1px solid #ccc',
                                borderRadius: '20px',
                                marginRight: '10px',
                                fontSize: '14px',
                                cursor: 'pointer',
                                color: isCategorySelected(category) ? "#fff" : "#000"
                            }}>
                                {category}
                            </span>
                        ))}
                    </div>
                   {
                       loading ? (
                           <div>loading</div>
                       ) : (
                            <div  style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexWrap: 'wrap'
                            }}>
                                {products.map(product => (
                                    <ProductCard key={product.productId.value} product={product} />
                                ))}
                            </div>
                       )
                   }
                </div>
            </div>
            <div style={{width: '25%', minHeight: '100vh'}}>
                <Card />
            </div>
        </div>
    )
}

export default HomePage;
