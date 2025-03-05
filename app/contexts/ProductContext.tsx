"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "../modals/Product";

type MenuContextType = {
    products: Product[];
    setMenuData: React.Dispatch<React.SetStateAction<Product[]>>;
    fetchProducts: () => void;
    addProduct: (product: Product) => void;
    updateProduct: (updatedProduct: Product) => void;
    deleteProduct: (productId: string) => void;
};

const ProductContext = createContext<MenuContextType | undefined>(undefined);

export const useProduct = () => {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useProduct must be used within a ProductProvider");
    }
    return context;
};

export const ProductProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        const storedProducts = localStorage.getItem("products");
        if (storedProducts) {
            const parsedProducts = JSON.parse(storedProducts) as Product[];
            const formattedProducts = parsedProducts.map((product) => ({
                ...product,
                price: Number(product.price), 
            }));
            setProducts(formattedProducts);
            console.log(formattedProducts);
        }
    };

    const addProduct = (product: Product) => {
        const updatedProducts = [...products, product];
        setProducts(updatedProducts);
        localStorage.setItem("products", JSON.stringify(updatedProducts)); 
    };

    const updateProduct = (updatedProduct: Product) => {
        const updatedProducts = products.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
        );
        setProducts(updatedProducts);
        localStorage.setItem("products", JSON.stringify(updatedProducts));
    };

    const deleteProduct = (productId: string) => {
        const updatedProducts = products.filter((product) => product.id !== productId);
        setProducts(updatedProducts);
        localStorage.setItem("products", JSON.stringify(updatedProducts)); 
    };

    return (
        <ProductContext.Provider
            value={{
                products,
                setMenuData: setProducts,
                fetchProducts,
                addProduct,
                updateProduct,
                deleteProduct,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};
