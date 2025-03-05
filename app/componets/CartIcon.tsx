"use client";
import React, { useEffect, useState } from "react";
import { useCart } from "../contexts/CartContext";
import { Wallet } from "lucide-react";
import { motion } from "framer-motion";

export const CartIcon = () => {
    const { cart, openModal } = useCart();
    const [cartLength, setCartLength] = useState(0);
    const [wiggle, setWiggle] = useState(false);

    useEffect(() => {
        const newCartLength = cart.reduce((total, product) => total + product.quantity, 0);
        setCartLength(newCartLength);

        if (newCartLength > 0) {
            setWiggle(true);
            setTimeout(() => setWiggle(false), 1000);
        }
    }, [cart]);

    return (
        <div
            style={{ position: "relative", display: "inline-block" }}
            onClick={openModal}
        >
            <Wallet size={24} />
            {cartLength > 0 ? 
            <motion.span
                style={{
                    position: "absolute",
                    top: "-10px",
                    right: "-10px",
                    backgroundColor: "red",
                    color: "white",
                    borderRadius: "50%",
                    padding: "2px 5px",
                    fontSize: "12px",
                }}
                animate={{
                    x: wiggle
                        ? [
                            0,  
                            -10,
                            10,  
                            -10, 
                            10,  
                            0,  
                        ]
                        : 0,
                }}
                transition={{
                    type: "tween",
                    duration: 0.5,
                    ease: "easeInOut",
                }}
            >
                {cartLength}
            </motion.span>
                : null}
        </div>
    );
};
