"use client"
import { useEffect, useState } from "react";

interface Category {
    id: number;
    name: string;
    slug: string;
    image: string;
    creationAt: string;
    updatedAt: string;
}

interface ProductDemo {
    id: number;
    title: string;
    slug: string;
    price: number;
    description: string;
    category: Category;
    images: string[];
    creationAt: string;
    updatedAt: string;
}

const InfiniteScroll = () => {
    const [products, setProducts] = useState<ProductDemo[]>([]);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = async (pageIndex: number) => {
        setLoading(true);
        const res = await fetch(
            `https://api.escuelajs.co/api/v1/products?offset=${pageIndex}&limit=10`
        );
        const data = await res.json();
        console.log(data);
        setProducts((prevProducts) => [...prevProducts, ...data]);
        setLoading(false);
    };

    const handleScroll = () => {
        const bottom = document.documentElement.scrollHeight === document.documentElement.scrollTop + window.innerHeight;
        if (bottom && !loading) {
            setPageIndex((prev) => prev + 1);
        }
    };

    useEffect(() => {
        fetchData(pageIndex);
    }, [pageIndex]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [loading]);

    return (
        <div className="min-h-screen p-6">
            <div className="container mx-auto flex flex-col items-center ">
                <h1 className="text-2xl font-bold mb-4">Products </h1>
           
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                   
                    {products.length > 0 &&
                        products.map((product , index) => (
                            <div
                                key={index}
                                className="bg-white/20 rounded-lg shadow-lg p-4 hover:shadow-xl transition-shadow duration-200"
                            >
                                <img
                                    src={product.images[0]}
                                    alt={product.title}
                                    className="w-full h-48 object-cover rounded-lg mb-4"
                                />
                                <h2 className="text-xl font-semiboldmb-2">
                                    {product.title}
                                </h2>
                                <p className="mb-2">{product.category.name}</p>
                                <p >{product.description}</p>
                                <div className="mt-4 text-right">
                                    <span className="text-xl font-bold">
                                        ${product.price}
                                    </span>
                                </div>
                            </div>
                        ))}
                </div>
                {loading && (
    <div className="text-center py-4">
        <div className="loader"></div>
    </div>
)}
            </div>
        </div>
    );
};

export default InfiniteScroll;
