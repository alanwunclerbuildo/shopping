import ProductsInterface from './stores/ProductsInterface';
import HomePage from './components/HomePage'
import CardInterface from './stores/CardInterface';

function App() {
  return (
    <ProductsInterface>
      <CardInterface>
        <HomePage />
      </CardInterface>
    </ProductsInterface>
  );
}

export default App;
