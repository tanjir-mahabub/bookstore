import { useCartContext } from "../context/cartContext"
import { CartItemProps } from "../type/Cart"
import { formatCurrency } from "../utilities/formatCurrency";

const CartItem = ({ id, quantity }: CartItemProps) => {
    const { addedToCart, increaseCartQuantity, decreaseCartQuantity } = useCartContext();

    const books = addedToCart.filter((item) => item.id === id);

    return (
        <>
            {books.map(book => (
                <div key={book.id} className="flex flex-col justify-center-center w-full h-full p-3 gap-3">
                    <div className="flex items-start gap-3">
                        <div className="w-[20vw] border shadow">
                            <img className="w-20 h-auto object-cover" src={book.coverImage} alt={book.title} />
                        </div>
                        <div className="w-[60vw] h-full flex flex-col items-start gap-4">
                            <h1 className="font-bold leading-4 text-[13.5px]">{book.title}</h1>
                            <div className="flex justify-start self-start w-fit gap-x-0.5">
                                <div onClick={() => { decreaseCartQuantity(book.id) }} className="w-6 h-6 text-2xl bg-blue-800 text-white flex justify-center items-center self-center pb-1 rounded cursor-pointer select-none">-</div>
                                <div className="font-semibold flex justify-center items-center border rounded w-10">{quantity}</div>
                                <div onClick={() => { increaseCartQuantity(book.id) }} className="w-6 h-6 text-2xl bg-blue-800 text-white flex justify-center items-center self-center pb-1 rounded cursor-pointer select-none">+</div>
                            </div>
                        </div>
                        <div className="font-bold">
                            <p>{formatCurrency(book.point * quantity)}</p>
                        </div>
                    </div>

                </div >
            ))}
        </>
    )
}

export default CartItem