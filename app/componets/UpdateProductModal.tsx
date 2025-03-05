"use client"

import React, { useState, useEffect } from "react";
import { Product, defaultProduct } from "../modals/Product";
import { useProduct } from "../contexts/ProductContext";

interface UpdateProductModalProps {
    productToUpdate: Product | null;
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const UpdateProductModal: React.FC<UpdateProductModalProps> = ({ productToUpdate, isModalOpen, setIsModalOpen }) => {
    const [product, setProduct] = useState<Product>(defaultProduct);
    const { fetchProducts, updateProduct } = useProduct();

    useEffect(() => {
        if (productToUpdate) {
            setProduct(productToUpdate);
        }
    }, [productToUpdate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: type === "number" ? (value ? Number(value) : "") : value,
        }));
    };

    const handleUpdate = () => {
        if (productToUpdate) {
            updateProduct(product);
            setIsModalOpen(false);
            fetchProducts();
        }
    };

    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
            <div className="bg-white text-gray-800 rounded-lg p-6 max-w-md w-full relative shadow-lg">
                <h2 className="text-xl mb-4">Update Product</h2>
                <button
                    onClick={() => setIsModalOpen(false)} 
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 transition"
                >
                    ✖
                </button>
                <div className="mb-4">
                    <h3 className="text-gray-700 mb-2">Title</h3>
                    <input
                        type="text"
                        name="title"
                        value={product.title}
                        onChange={handleChange}
                        placeholder="Title"
                        className="w-full mb-2 p-2 border border-gray-300 rounded bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="mb-4">
                    <h3 className="text-gray-700 mb-2">Description</h3>
                    <input
                        type="text"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        placeholder="Description"
                        className="w-full mb-2 p-2 border border-gray-300 rounded bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <h3 className="text-gray-700 mb-2">Price</h3>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        placeholder="Price"
                        className="w-full mb-2 p-2 border border-gray-300 rounded bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="bg-gray-200 text-gray-800 px-4 py-2 rounded shadow hover:bg-gray-300 transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdate}
                        className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>

    );
};

export default UpdateProductModal;
