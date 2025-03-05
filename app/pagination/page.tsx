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

const ProductsTable = () => {
    const [products, setProducts] = useState<ProductDemo[]>([]);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [pageCount, setPageCount] = useState<number>(100);
    const [loading, setLoading] = useState<boolean>(true);

    const fetchData = async (pageIndex: number) => {
        setLoading(true);
        const res = await fetch(
            `https://api.escuelajs.co/api/v1/products?offset=${pageIndex}&limit=10`
        );
        const data = await res.json();
        console.log(data);
        setProducts(data);
        // setPageCount(Math.ceil(data.total / 10));
        setLoading(false);
    };

    useEffect(() => {
        fetchData(pageIndex);
    }, [pageIndex]);

    return (
        <div className="min-h-screen p-6">
            <div className="container mx-auto flex flex-col justify-end items-center overflow-x-auto bg-white/20 rounded-lg shadow-lg border border-gray-200 px-2 py-2">
                <h1 className="text-2xl font-bold mb-4">Products</h1>
                <table className="min-w-full border-collapse border border-gray-200">
                    <thead>
                        <tr>
                            <th className="border p-2">ID</th>
                            <th className="border p-2">Title</th>
                            <th className="border p-2">Price</th>
                            <th className="border p-2">Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td colSpan={4} className="text-center py-2">
                                    Loading...
                                </td>
                            </tr>
                        ) : (
                            products.map((product) => (
                                <tr key={product.id}>
                                    <td className="border p-2">{product.id}</td>
                                    <td className="border p-2">{product.title}</td>
                                    <td className="border p-2">${product.price}</td>
                                    <td className="border p-2">{product.category.name}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>


                <div className="flex justify-between items-center mt-4">
                    <button
                        onClick={() => setPageIndex((prev) => Math.max(prev - 1, 0))}
                        disabled={pageIndex === 0}
                        className="bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-300"
                    >
                        Previous
                    </button>
                    <span className="px-4 py-2">
                        Page {pageIndex + 1} of {pageCount}
                    </span>
                    <button
                        onClick={() =>
                            setPageIndex((prev) => Math.min(prev + 1, pageCount - 1))
                        }
                        disabled={pageIndex === pageCount - 1}
                        className="bg-blue-500 text-white py-2 px-4 rounded disabled:bg-gray-300"
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductsTable;
