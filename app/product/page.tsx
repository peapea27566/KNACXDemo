"use client"

import CardProuct from "../componets/CardProuct";
import { useProduct } from "../contexts/ProductContext";


export default function Product() {
  const { products } = useProduct()

  return (
    <div className="min-h-screen p-6">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.length > 0 ? (  
          products.map((item, index) => (
            <CardProuct
              key={index}
              title={item.title}
              description={item.description}
              image={item.image}
              price={item.price ?? 0.0}
              id={item.id}
            />
          ))
        ) : (
          <p>No products available.</p>  
        )}
      </div>
    </div>

  );
}



