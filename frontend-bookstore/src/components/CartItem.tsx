import { useCartContext } from "../context/cartContext"
import { CartItemProps } from "../type/Cart"

const CartItem = ({ id, quantity }: CartItemProps) => {
    const { addedToCart, increaseCartQuantity, decreaseCartQuantity } = useCartContext();

    const books = addedToCart.filter((item) => item.id === id);

    return (
        <>
            {books.map(book => (
                <div key={book.id} className="flex flex-col justify-center-center w-full h-full p-3 gap-3">
                    <div className="flex items-center gap-3">
                        <div className="w-[20vw]">
                            <img className="w-20 h-auto object-cover" src={book.coverImage} alt={book.title} />
                        </div>
                        <div className="w-[60vw] h-full flex flex-col items-start gap-2">
                            <h1 className="font-bold">{book.title}</h1>
                            <div className="flex justify-center self-center w-fit gap-x-1">
                                <div onClick={() => { decreaseCartQuantity(book.id) }} className="w-6 h-6 text-2xl bg-blue-800 text-white flex justify-center items-center self-center pb-1 rounded cursor-pointer select-none">-</div>
                                <div className="font-bold flex justify-center items-center border rounded w-10">{quantity}</div>
                                <div onClick={() => { increaseCartQuantity(book.id) }} className="w-6 h-6 text-2xl bg-blue-800 text-white flex justify-center items-center self-center pb-1 rounded cursor-pointer select-none">+</div>
                            </div>
                        </div>
                        <div className="font-bold">
                            <p>${(book.point * quantity).toFixed(2)}</p>
                        </div>
                    </div>

                </div >
            ))}
        </>
    )
}

export default CartItem