import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart, incrementQuantity, decrementQuantity } from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id, currentQuantity) => {
    if (currentQuantity > 1) {
      dispatch(decrementQuantity(id));
    } else {
      dispatch(removeFromCart(id));
    }
  };

  // Calculate total amount
  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Function to handle Razorpay Payment
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const options = {
      key: "rzp_test_sn6rVYKPsHIp4c", 
      amount: totalAmount * 100, // Razorpay requires amount in paise (multiply by 100)
      currency: "INR",
      name: "ShopClues",
      description: "Checkout Payment",
      handler: function (response) {
        alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
        dispatch(clearCart()); // Clear cart after successful payment
      },
      prefill: {
        name: "John Doe",
        email: "johndoe@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="p-4 flex-grow min-h-[70vh]">
       <Link to="/" className="absolute top-11 left-4 text-blue-500 text-lg">Home</Link>
      <h1 className="text-2xl font-bold mb-4 text-center">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-gray-600 text-center">
          Your cart is empty. <Link to="/" className="text-blue-500">Continue Shopping</Link>
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cart.map((item) => (
              <div key={item.id} className="border p-4 rounded-lg shadow-md bg-white">
                <img src={item.image} alt={item.title} className="h-32 w-full object-contain mb-2" />
                <h2 className="text-lg font-semibold">{item.title}</h2>
                <p className="text-gray-600">${item.price}</p>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center space-x-2">
                    <button onClick={() => handleDecrement(item.id, item.quantity)} className="bg-gray-300 px-2 py-1 rounded">-</button>
                    <span className="text-lg font-semibold">{item.quantity}</span>
                    <button onClick={() => handleIncrement(item.id)} className="bg-gray-300 px-2 py-1 rounded">+</button>
                  </div>
                  <button onClick={() => dispatch(removeFromCart(item.id))} className="text-red-500">Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 border rounded-lg bg-white shadow-md">
            <h2 className="text-xl font-semibold">Total: ₹{totalAmount.toFixed(2)}</h2>
            <button onClick={() => dispatch(clearCart())} className="bg-red-500 text-white px-4 py-2 rounded mt-4">
              Clear Cart
            </button>
            <button onClick={handleCheckout} className="bg-green-500 text-white px-4 py-2 rounded mt-4 ml-4">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
