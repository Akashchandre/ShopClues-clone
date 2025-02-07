import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setSelectedCategory } from "../redux/slices/productsSlice";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

const CategoryPage = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(setSelectedCategory(category));
    dispatch(fetchProducts());
  }, [category, dispatch]);

  const filteredProducts = products.filter((product) => product.category === category);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center capitalize">
        {category} Products
      </h1>
      <Link to="/" className="absolute top-30 left-4 text-blue-500 text-lg">Home</Link>
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center">No products found in this category.</p>
      )}
    </div>
  );
};

export default CategoryPage;
