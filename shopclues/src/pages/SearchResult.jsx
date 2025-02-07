import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { Link } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search); // Get query params
  const query = queryParams.get('query');                 // Get query param 'query'
  const category = queryParams.get('category');               // Get query param 'category'

  const { products } = useSelector((state) => state.products);

  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Filter products based on query and category
    const results = products.filter(
      (product) =>
        product.title.toLowerCase().includes(query.toLowerCase()) &&
        (category === 'all' || product.category === category)
    );
    setFilteredProducts(results);
  }, [products, query, category]);

  return (
    <div className="p-4 min-h-[70vh]">
       <Link to="/" className="absolute  left-4 text-blue-500 text-lg">Home</Link>
      <h1 className="text-2xl font-bold mb-4 text-center">Search Results</h1>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} /> 
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No results found for {query}.</p>
      )}
    </div>
  );
};

export default SearchResults;