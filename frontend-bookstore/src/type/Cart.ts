import { ReactNode } from 'react';
import { Book } from './Book';


export interface CartState {
    cart: [],
    quantity: 0,
    totalPrice: 0,
  }

export interface CartAction {
    type: string;
    payload: Book;
  }

export interface CartProviderProps {
    children: ReactNode | JSX.Element
}

export interface CartContextProps {  
    addedToCart: Book[]
    ProductsInCart: (book: Book) => void
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    resetCart: () => void
    openCart: () => void
    closeCart: () => void
    isOpen: boolean
    cartQuantity: number
    cartItems: CartItemProps[]
}
export interface CartItemProps {
    id: number,
    quantity: number
}