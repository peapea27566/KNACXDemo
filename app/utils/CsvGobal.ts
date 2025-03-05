import { ProductCart } from "../modals/Product";

export const convertCartToCSV = (cart: ProductCart[]) => {
    const header = ['Product ID', 'Title', 'Price', 'Quantity', 'Total Price']; // CSV headers
    const rows = cart.map((product) => [
      product.id,
      product.title,
      product.price.toFixed(2),
      product.quantity,
      (product.price * product.quantity).toFixed(2),
    ]);
  
    const csvContent = [header, ...rows].map((row) => row.join(',')).join('\n');
    return csvContent;
  };
  
 export const downloadCSV = (csvContent: string, filename: string) => {
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


