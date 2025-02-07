import { Link } from 'react-router-dom';

const AboutUs = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-2xl relative">
      <Link to="/" className="absolute top-4 left-4 text-blue-500 text-lg">Home</Link>
      <h1 className="text-2xl font-bold text-left text-gray-800 mb-6 mt-4">About Us</h1>
      <img src="https://cdn.shopclues.com/images/banners/Work/FooterPages/AboutUs/banner_AboutUs.jpg" alt="About ShopClues" className="w-full rounded-lg mb-4" />
      <p className="text-gray-600 mb-4">
        Welcome to <strong>ShopClues</strong>, your one-stop destination for an unparalleled online shopping experience.
        As one of India’s leading eCommerce platforms, we bring you a wide range of high-quality products at unbeatable prices,
        ensuring affordability, convenience, and customer satisfaction.
      </p>
      <h2 className="text-2xl font-semibold text-gray-700 mt-6">Our Story</h2>
      <img src="https://cdn.shopclues.com/images/banners/Work/FooterPages/AboutUs/aboutUs_text_Launched2011.png" alt="Our Story" className="w-full mb-4" />
      <p className="text-gray-600 mb-4">
        Founded with the vision to make online shopping accessible to all, ShopClues has been revolutionizing the eCommerce
        landscape since its inception. We take pride in being a platform that connects millions of buyers and sellers, offering
        everything from fashion, electronics, home essentials, and more.
      </p>
      <h2 className="text-2xl font-semibold text-gray-700 mt-6">What We Offer</h2>
      <ul className="list-disc list-inside text-gray-600">
        <li>Diverse Range of Products</li>
        <li>Best Prices & Deals</li>
        <li>Secure Shopping Experience</li>
        <li>Fast & Reliable Delivery</li>
        <li>Customer Satisfaction</li>
      </ul>
      <h2 className="text-2xl font-semibold text-gray-700 mt-6">Our Mission</h2>
      <img src="https://cdn.shopclues.com/images/banners/Work/FooterPages/AboutUs/logo_shopclues.jpg" alt="Our Mission" className="w-full rounded-lg mb-4" />
      <p className="text-gray-600 mb-4">
        At ShopClues, we aim to provide an affordable, seamless, and enjoyable shopping experience for our customers. We empower
        small businesses and entrepreneurs by giving them a platform to reach a wider audience and grow their business.
      </p>
      <h2 className="text-2xl font-semibold text-gray-700 mt-6">Join the ShopClues Family</h2>
      <p className="text-gray-600">
        With millions of happy customers, ShopClues is committed to enhancing your online shopping experience. Download our app
        or visit our website to explore an extensive range of products tailored to your needs.
      </p>
    </div>
  );
};

export default AboutUs;
