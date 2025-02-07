import { Link } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes

const ProductCard = ({ product }) => {
  return (
    <Link key={product.id}
      to={`/product/${product.id}`}
      className="border p-4 rounded-lg shadow-md hover:shadow-lg transition"
    >
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-contain"
      />
      <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
      <p className="text-gray-600">${product.price}</p>
    </Link>
  );
};

// ✅ Add PropTypes validation
ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductCard;
