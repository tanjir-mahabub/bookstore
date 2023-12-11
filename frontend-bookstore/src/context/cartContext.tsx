import { createContext, useContext, useState } from "react"
import { CartContextProps, CartItemProps, CartProviderProps } from "../type/Cart";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Book } from "../type/Book";

const CartContext = createContext({} as CartContextProps);

export const useCartContext = () => {
    return useContext(CartContext);
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    const [cartItems, setCartItems] = useLocalStorage<CartItemProps[]>(
        "shopping-cart",
        []
    );
    const [addedToCart, setAddedToCart] = useLocalStorage<Book[]>(
        "selected-books",
        []
    );

    const [purchased, setPurchased] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    const ProductsInCart = (book: Book) => {
        if (!addedToCart.some((cartBook) => cartBook.id === book.id)) {
            setAddedToCart((prev) => [...prev, book]);
        }
    };

    const getItemQuantity = (id: number) => {
        return cartItems.find(item => item.id === id)?.quantity || 0;
    }

    const increaseCartQuantity = (id: number) => {
        setCartItems(currentItems => {
            if (currentItems.find(item => item.id === id) == null) {
                return [...currentItems, { id, quantity: 1 }]
            } else {
                return currentItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    const decreaseCartQuantity = (id: number) => {
        setCartItems(currentItems => {
            if (currentItems.find(item => item.id === id)?.quantity === 1) {
                return currentItems.filter(item => item.id !== id)
            } else {
                return currentItems.map(item => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 }
                    } else {
                        return item
                    }
                })
            }
        })
    }

    const removeFromCart = (id: number) => {
        setCartItems(currentItems => {
            return currentItems.filter(item => item.id !== id)
        })
    }

    const resetCart = () => {
        setAddedToCart([])
        setCartItems([])
    }

    const cartQuantity = cartItems.reduce(
        (quantity, item) => item.quantity + quantity,
        0
    )

    const orderCreated = () => {
        setPurchased(true);
    }

    return (
        <CartContext.Provider value={{
            addedToCart,
            ProductsInCart,
            getItemQuantity,
            increaseCartQuantity,
            decreaseCartQuantity,
            removeFromCart,
            resetCart,
            openCart,
            closeCart,
            cartItems,
            cartQuantity,
            isOpen,
            orderCreated,
            purchased
        }}>
            {children}
        </CartContext.Provider>
    )
}