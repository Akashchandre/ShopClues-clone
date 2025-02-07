import { Link } from 'react-router-dom';

const FAQs = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-2xl relative">
      <Link to="/" className="absolute top-4 left-4 text-blue-500 text-lg">Home</Link>
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Frequently Asked Questions</h1>
      <img src="https://cdn.shopclues.com/images/banners/Work/FooterPages/BuyerCentral/faq-banners.jpg" alt="FAQs ShopClues" className="w-full rounded-lg mb-4" />
      <h2 className="text-2xl font-semibold text-gray-700 mt-6">1. How do I place an order?</h2>
      <p className="text-gray-600 mb-4">
        You can place an order by browsing our website, adding items to your cart, and proceeding to checkout. Follow the instructions for payment and shipping details.
      </p>
      <h2 className="text-2xl font-semibold text-gray-700 mt-6">2. What payment methods do you accept?</h2>
      <p className="text-gray-600 mb-4">
        We accept credit/debit cards, net banking, UPI, and cash on delivery (COD) in select locations.
      </p>
      <h2 className="text-2xl font-semibold text-gray-700 mt-6">3. How can I track my order?</h2>
      <p className="text-gray-600 mb-4">
        Once your order is shipped, you will receive a tracking number via email or SMS. You can use this to track your order on our website.
      </p>
      <h2 className="text-2xl font-semibold text-gray-700 mt-6">4. What is your return policy?</h2>
      <p className="text-gray-600 mb-4">
        We have a hassle-free return policy. If you are not satisfied with your purchase, you can return it within 7 days for a refund or exchange.
      </p>
      <h2 className="text-2xl font-semibold text-gray-700 mt-6">5. How do I contact customer support?</h2>
      <p className="text-gray-600 mb-4">
        You can reach out to our customer support team via email at support@shopclues.com or call us at +91 12345 67890.
      </p>
    </div>
  );
};

export default FAQs;
