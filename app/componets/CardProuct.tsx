"use client"
import { motion } from "framer-motion";
import { Product, ProductCart } from "../modals/Product";
import { useCart } from "../contexts/CartContext";

const CardProduct: React.FC<Product> = (item : Product) => {
  const {  addToCart } = useCart();
  const handleAddToCart = () => {
    const productCart: ProductCart = { ...item, quantity: 0 };
    addToCart(productCart);
  };

  return (
    <motion.div className="rounded-2xl shadow-md p-4 cursor-pointer bg-white/20 flex flex-col">
      <motion.img
        src={item.image}
        alt={item.title}
        className="w-full h-40 object-cover rounded-lg mb-4"
        whileHover={{ scale: 1.1, y: -5 }}
        transition={{
          type: "spring",
          stiffness: 1500,
          damping: 10,
          duration: 0.15,
        }}
      />
      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
      <p className="mb-2">{item.description}</p>
      <p className="text-green-600 font-bold text-lg mb-2">
        ${item.price.toFixed(2)}
      </p>

      <div className="flex-grow"></div>

      <button
        onClick={handleAddToCart}
        className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition mt-auto"
      >
        Add to Cart
      </button>
    </motion.div>
  );
};

export default CardProduct;
