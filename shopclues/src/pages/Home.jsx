import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productsSlice";
import Banner from "../components/Banner";
import ProductCard from "../components/ProductCard"; // Import ProductCard

const Home = () => {
  const dispatch = useDispatch();
  const { products, selectedCategory } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts()); // Fetch products from the API
  }, [dispatch]);

  // Filter products by selected category
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);
console.log(selectedCategory)
  return (
    <div>
      <Banner />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4 text-center">Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <p className="text-center col-span-4 text-gray-600">
              No products available for this category.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
