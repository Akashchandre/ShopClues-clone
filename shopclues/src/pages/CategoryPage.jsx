import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setSelectedCategory, setSelectedSubCategory,fetchSubCategories  } from "../redux/slices/productsSlice";
import { useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

const CategoryPage = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { products, subCategories } = useSelector((state) => state.products);
  const [selectedSubCategory, setSelectedSubCategory] = useState('all');

  useEffect(() => {
    dispatch(setSelectedCategory(category));
    dispatch(fetchProducts());
    dispatch(fetchSubCategories(category));
  
  }, [category, dispatch]);

  const handleSubCategoryChange = (e) => {
    setSelectedSubCategory(e.target.value);
    dispatch(setSelectedSubCategory(e.target.value));
  };

  // Filter products based on selected category and sub-category
  const filteredProducts = products.filter((product) => {
    const categoryMatch = product.category === category.toLowerCase();
    const subCategoryMatch = selectedSubCategory === 'all' || product.subCategory === selectedSubCategory;
    return categoryMatch && subCategoryMatch;
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center capitalize">{category} Products</h1>
      <Link to="/" className="absolute top-30 left-4 text-blue-500 text-lg">Home</Link>

      {/* Sub-category filter */}
      <div className="mb-4">
        <select
          className="p-2 border border-gray-300 rounded"
          value={selectedSubCategory}
          onChange={handleSubCategoryChange}
        >
          {subCategories.map((subCategory) => (
            <option key={subCategory} value={subCategory}>
              {subCategory}
            </option>
          ))}
        </select>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center">No products found in this category or sub-category.</p>
      )}
    </div>
  );
};

export default CategoryPage;
