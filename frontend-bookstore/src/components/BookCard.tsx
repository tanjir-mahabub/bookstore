import { Suspense } from "react"
import { Book } from '../type/Book';
import Loading from "./Loading";

interface Books {
    books: Book[]
}

const BookCard: React.FC<Books> = ({ books }) => {
    return (
        <Suspense fallback={<Loading />}>
            {books.length > 0 ? (
                books?.map((book: Book) => (
                    <div className="grid grid-flow-col w-full h-full justify-start items-center border border-blue-800/20 p-3 shadow-sm hover:shadow-md hover:shadow-blue-800/30 rounded cursor-pointer gap-4 sm:gap-5" key={book.id}>
                        <div className='flex justify-center items-center w-full h-auto md:p-2'>
                            <img className="w-40 max-h-48 object-fill border border-black/20" src={book.coverImage} alt={book.title} />
                        </div>
                        <div className='flex flex-col justify-center gap-2 w-full h-auto'>
                            <div className="h-[80%]">
                                <h3 className="text-sm sm:text-base font-bold leading-0">{book.title}</h3>
                                <small>by: <b>{book.writer}</b></small>
                                <button className="bg-yellow-500 text-black border border-yellow-500 font-bold text-sm leading-0 px-2 pt-[3px] pb-[5px] flex justify-center items-center rounded hover:shadow-md hover:shadow-yellow-500/30 my-2">Add to Cart</button>
                                <p className="font-bold text-xs md:text-base">Price: ${book.point}</p>
                                <small className='leading-1'><b>Tags:</b> {book.tags.join(', ')}</small>
                            </div>
                            {/* <div className="h-[20%] flex justify-center items-center pt-3">
                            <button className="bg-yellow-500 text-black border font-bold text-sm leading-0 px-2 pt-[5px] pb-2 w-full flex justify-center items-center rounded hover:shadow-lg my-2">Buy Now</button>
                        </div> */}
                        </div>
                    </div>
                ))
            ) : (
                <p>No book found!</p>
            )}
        </Suspense>
    )
}

export default BookCard