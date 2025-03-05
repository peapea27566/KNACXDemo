"use client";
import React from 'react';
import { useCart } from '../contexts/CartContext';
import { motion } from 'framer-motion';
import { ProductCart } from '../modals/Product';
import { convertCartToCSV, downloadCSV } from '../utils/CsvGobal';



export const ProductCartModal: React.FC = () => {
    const { cart, clearCart, removeFromCart, closeModal, isModalCart } = useCart();
    const cartLength = cart.reduce((total, product) => total + product.quantity, 0);

    const handleExportCSV = () => {
        const csvContent = convertCartToCSV(cart);
        downloadCSV(csvContent, 'cart_data.csv');
    };

    return (
        isModalCart ?
            <motion.div
                className="fixed inset-0 bg-black/50 flex justify-center items-center z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            >
                <div className="bg-white rounded-lg p-6 w-full sm:w-[600px] max-h-[80%] overflow-hidden shadow-lg flex flex-col">
                    <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800 ">Cart items</h2>

                    <div className="flex flex-row justify-between   mt-2">
                        <p className="text-lg font-semibold text-gray-800">
                            Item: {cart.reduce((total, product) => total + product.quantity, 0)}
                        </p>
                        <p className="text-lg font-semibold text-red-500 cursor-pointer" onClick={clearCart}>
                            Clear All
                        </p>

                      

                    </div>

                    <div className="flex flex-row justify-end  mt-2">
                            <p className="text-lg font-semibold text-gray-800">
                                Total: ${cart.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2)}
                            </p>
                        </div>
                    {cartLength === 0 ? (
                        <p className="text-center text-gray-600">Your cart is empty.</p>
                    ) : (
                        <div className="flex-grow overflow-y-auto">

                            {cart.map((product: ProductCart) => (
                                <div key={product.id} className="flex items-center justify-between mb-6 p-4 border-b border-gray-200 rounded-lg">
                                    <div className="flex items-center">
                                        <div className="mr-4">
                                            <img src={product.image} alt={product.title} className="w-20 h-20 object-cover rounded-md shadow-sm" />
                                        </div>
                                        <div>
                                            <p className="text-lg font-semibold text-gray-800">{product.title}</p>
                                            <p className="text-sm text-gray-600">Price: ${product.price.toFixed(2)}</p>
                                            <p className="text-sm text-gray-600">Quantity: {product.quantity}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(product.id)}
                                        className="text-red-600 font-semibold hover:text-red-800 transition duration-200"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}





                    <footer className="mt-auto flex justify-between items-center pt-4 ">
                        <button
                            onClick={closeModal}
                            className="text-gray-600 hover:text-gray-800 font-semibold py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-100 transition duration-200"
                        >
                            Close
                        </button>

                        <button
                            onClick={handleExportCSV}
                            className="text-blue-600 font-semibold py-2 px-4 rounded-lg border border-blue-300 hover:bg-blue-100 transition duration-200"
                        >
                            Export to CSV
                        </button>
                    </footer>
                </div>
            </motion.div>



            : null);
};

