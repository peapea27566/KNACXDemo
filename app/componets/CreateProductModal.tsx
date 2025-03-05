"use client"
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { defaultProduct, Product } from "../modals/Product";
import { useProduct } from "../contexts/ProductContext";

const CreateProductModal: React.FC = () => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm<Product>({
    defaultValues: defaultProduct,
  });

  const { fetchProducts, addProduct } = useProduct();
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleSave = (data: Product) => {
    const newProduct = { ...data, id: Date.now().toString() };
    addProduct(newProduct);
    reset(defaultProduct);
    setIsModalOpen(false);
    fetchProducts();
  };

  const closeModal = () => {
    reset(defaultProduct);
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
      >
        Create Product
      </button>

      {isModalOpen && (
      <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-50">
      <div className="bg-white text-gray-800 rounded-lg p-6 max-w-md w-full relative shadow-lg">
        <h2 className="text-xl mb-4 text-gray-800">Create Product</h2>
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition"
        >
          ✖
        </button>
    
        <form onSubmit={handleSubmit(handleSave)}>
          {/* Title Input */}
          <div className="mb-2">
            <label htmlFor="title" className="block text-gray-800 mb-1">
              Title
            </label>
            <Controller
              name="title"
              control={control}
              rules={{ required: "Title is required" }}
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    type="text"
                    placeholder="Title"
                    className="w-full p-2 border border-gray-300 rounded bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.title && (
                    <span className="text-red-500 text-sm">{errors.title.message}</span>
                  )}
                </>
              )}
            />
          </div>
    
          {/* Description Input */}
          <div className="mb-2">
            <label htmlFor="description" className="block text-gray-800 mb-1">
              Description
            </label>
            <Controller
              name="description"
              control={control}
              rules={{ required: "Description is required" }}
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    type="text"
                    placeholder="Description"
                    className="w-full p-2 border border-gray-300 rounded bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.description && (
                    <span className="text-red-500 text-sm">{errors.description.message}</span>
                  )}
                </>
              )}
            />
          </div>
    
          {/* Price Input */}
          <div className="mb-2">
            <label htmlFor="price" className="block text-gray-800 mb-1">
              Price
            </label>
            <Controller
              name="price"
              control={control}
              rules={{
                required: "Price is required",
                min: {
                  value: 1,
                  message: "Price must be greater than zero",
                },
              }}
              render={({ field }) => (
                <>
                  <input
                    {...field}
                    type="number"
                    placeholder="Price"
                    className="w-full p-2 border border-gray-300 rounded bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.price && (
                    <span className="text-red-500 text-sm">{errors.price.message}</span>
                  )}
                </>
              )}
            />
          </div>
    
          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded shadow hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
            >
              Save Product
            </button>
          </div>
        </form>
      </div>
    </div>
    
      )}
    </div>
  );
};

export default CreateProductModal;
