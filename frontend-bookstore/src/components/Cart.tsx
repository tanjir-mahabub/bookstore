import { useCartContext } from "../context/cartContext";
import CartIcon from "../assets/cart.svg";
import CartItem from "./CartItem";
import { formatCurrency } from "../utilities/formatCurrency";

const Cart = () => {
    const { cartItems, cartQuantity, addedToCart, resetCart, openCart, closeCart, isOpen } = useCartContext();

    const handleBuyNow = () => {
        alert("Buying....")
    }

    return (
        <>
            <button type="button" onClick={openCart} className="relative flex justify-start items-center h-full cursor-pointer hover:bg-white/20 pt-4 pb-2 pl-5 pr-6">
                <img src={CartIcon} alt="cart-icon" className="w-6 h-6" /> <span className="w-5 h-5 flex justify-center items-center text-[13px] font-bold rounded-full px-[3px] pb-[2px] absolute right-[14px] top-[6px] bg-yellow-600">{cartQuantity}</span>
            </button>
            <div className={`fixed ${isOpen ? 'visible' : 'invisible'} flex left-0 top-0 justify-center items-center w-full h-full z-50 transition-all duration-500 overflow-hidden`}>
                <div onClick={closeCart} className={`bg-black/80 w-full h-full absolute left-0 top-0 z-40 transition-opacity duration-500  ${isOpen ? 'opacity-100' : 'opacity-0'}`}></div>

                <div className={`w-[300px] xs:w-[400px] h-full bg-white text-black absolute right-0 top-0 z-50 transition-all duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-[100%]'}`}>
                    <div className="flex flex-col divide-y">
                        <div className="flex items-center h-[8vh] font-bold px-3 py-2">Cart <span>({cartQuantity})</span></div>
                        <div className="h-[75vh] overflow-y-auto">
                            <div className="flex flex-col items-center w-full divide-y">
                                {cartItems.map((item) => (
                                    <CartItem key={item.id} {...item} />
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-col p-3 gap-3">
                            <div className="font-bold text-base">
                                Total Price: {
                                    formatCurrency(
                                        cartItems.reduce((total, cartItem) => {
                                            const item = addedToCart.find(i => i.id === cartItem.id)
                                            return total + (item?.point || 0) * cartItem.quantity
                                        }, 0)
                                    )
                                }
                            </div>
                            <button type="button" onClick={() => { resetCart(); closeCart(); }} className={`text-sm font-bold flex justify-center items-center w-full h-full cursor-pointer bg-blue-800/20 rounded px-3 py-2 ${(cartQuantity === 0) && "cursor-not-allowed"}`} disabled={(cartQuantity === 0)}>
                                Reset Cart
                            </button>
                            <button type="button" onClick={handleBuyNow} className={`text-sm font-bold flex justify-center items-center w-full h-full cursor-pointer bg-yellow-600 rounded px-3 py-2 disabled:opacity-20 ${(cartQuantity === 0) && "cursor-not-allowed"}`} disabled={(cartQuantity === 0)}>
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart;