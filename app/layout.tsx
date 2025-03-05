"use client"

import "./globals.css";
import { ThemeProvider } from 'next-themes';
import { Navbar } from "./componets/Navbar";
import Footer from "./componets/Footer";
import { ProductProvider } from "./contexts/ProductContext";
import { CartProvider } from "./contexts/CartContext";
import { ProductCartModal } from "./componets/ProductCartModal";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body >
        <ThemeProvider attribute="class" defaultTheme="light">
          <CartProvider>

            <ProductProvider>
              <Navbar />
              <main>{children}</main>
              <Footer />
              <ProductCartModal />
            </ProductProvider>
            
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
