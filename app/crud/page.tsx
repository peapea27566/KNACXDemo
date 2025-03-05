"use client"

import { useProduct } from '../contexts/ProductContext';
import CreateProductModal from '../componets/CreateProductModal';
import { Product } from '../modals/Product';
import { Edit, Delete } from "lucide-react";
import UpdateProductModal from '../componets/UpdateProductModal';
import { useState } from 'react';

const CreateProduct = () => {
    const { products, deleteProduct } = useProduct();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productToUpdate, setProductToUpdate] = useState<Product | null>(null);

    const formatPrice = (price: number) => price.toFixed(2);

    const handleEditProduct = (product: Product) => {
        setProductToUpdate(product);
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen p-6">
            <div className="container mx-auto flex justify-end items-center py-4">
                <CreateProductModal />
            </div>

            <div className="container mx-auto flex justify-end items-center overflow-x-auto bg-white/20 rounded-lg shadow-lg border border-gray-200">
                <table className="min-w-full text-sm table-auto">
                    <thead className="bg-gray/100">
                        <tr>
                            <th className="px-6 py-3 text-left font-medium w-[10%]">No.</th>
                            <th className="px-6 py-3 text-center font-medium w-[30%]">Name</th>
                            <th className="px-6 py-3 text-center font-medium w-[30%]">Description</th>
                            <th className="px-6 py-3 text-center font-medium w-[30%]">Price</th>
                            <th className="px-6 py-3 text-right font-medium w-[10%]">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-4 text-center">
                                    No products available.
                                </td>
                            </tr>
                        ) : (
                            products.map((product: Product, index) => (
                                <tr key={product.id} className="border-b">
                                    <td className="px-6 py-4">{index + 1}</td>
                                    <td className="px-6 py-4 text-center">{product.title}</td>
                                    <td className="px-6 py-4 text-center">{product.description}</td>
                                    <td className="px-6 py-4 text-center">{formatPrice(product.price)}</td>
                                    <td className="px-6 py-4 flex justify-end space-x-3">
                                        <button
                                            className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition flex items-center space-x-2"
                                            onClick={() => handleEditProduct(product)}
                                        >
                                            <Edit className="h-5 w-5" />
                                            <span>Edit</span>
                                        </button>

                                        <button
                                            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition flex items-center space-x-2"
                                            onClick={() => deleteProduct(product.id)}
                                        >
                                            <Delete className="h-5 w-5" />
                                            <span>Delete</span>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <UpdateProductModal
                productToUpdate={productToUpdate}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
            />
        </div>
    );
};



export default CreateProduct;
