"use client";

import { useEffect, useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import { Product } from '../modals/Product';

const ReactWindow = () => {
    const generateRandomProductList = (count: number): Product[] => {
        const products: Product[] = [];
        const titles = ["Product A", "Product B", "Product C", "Product D", "Product E"];
        const descriptions = [
            "This is a great product.",
            "Highly recommended.",
            "Best product in its category.",
            "Affordable and reliable.",
            "Premium quality at an affordable price."
        ];
        const images = [
            "image1.jpg", "image2.jpg", "image3.jpg", "image4.jpg", "image5.jpg"
        ];

        function getRandomElement(arr: string[]): string {
            return arr[Math.floor(Math.random() * arr.length)];
        }

        for (let i = 0; i < count; i++) {
            const product: Product = {
                id: (Math.random() + 1).toString(36).substring(7),
                title: getRandomElement(titles),
                description: getRandomElement(descriptions),
                image: getRandomElement(images),
                price: parseFloat((Math.random() * 1000).toFixed(2))
            };
            products.push(product);
        }

        return products;
    };

    const formatPrice = (price: number) => price.toFixed(2);

    const [products, setProducts] = useState<Product[]>([]);
    const [windowHeight, setWindowHeight] = useState<number | undefined>(undefined);

    useEffect(() => {
        const productList = generateRandomProductList(100000);
        setProducts(productList);

        const handleResize = () => {
            setWindowHeight(window.innerHeight);
        };

        if (typeof window !== 'undefined') {
            setWindowHeight(window.innerHeight); 
            window.addEventListener('resize', handleResize);
        }

        return () => {
            if (typeof window !== 'undefined') {
                window.removeEventListener('resize', handleResize);
            }
        };
    }, []);

    const Row = ({ index, style }: { index: number; style: React.CSSProperties }) => {
        const product = products[index];
        return (
            <div style={style} key={product.id} className="border-b flex items-center p-4">
                <div className="w-1/10">{index + 1}</div>
                <div className="w-3/10 text-center">{product.title}</div>
                <div className="w-3/10 text-center">{product.description}</div>
                <div className="w-3/10 text-center">${formatPrice(product.price)}</div>
            </div>
        );
    };


    return (
        windowHeight === undefined ? null :
        <div className="min-h-screen p-6">
            <div className="container mx-auto bg-white/20 rounded-lg shadow-lg border border-gray-200">
                <h1 className="text-2xl font-bold text-center py-4">Products</h1>

                <div className="overflow-x-auto">
                    <List
                        height={windowHeight - 200}
                        itemCount={products.length}
                        itemSize={80}
                        width="100%"
                    >
                        {Row}
                    </List>
                </div>
            </div>
        </div>
    );
};

export default ReactWindow;
