import { useEffect, useRef, useMemo, Suspense } from 'react';
import useAxios, { Book } from '../hooks/useAxios';

const BookList = () => {
    const { data: apiResponse, loading, error } = useAxios('http://localhost:4000/books');
    const lastBookRef = useRef<HTMLDivElement | null>(null);

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
        const target = entries[0];
        console.log('Intersection observed:', target);

        if (target.isIntersecting) {
            console.log('Load more data...');
            // Implement logic to fetch more data here
        }
    };

    const observer = useMemo(() => new IntersectionObserver(handleIntersection, { threshold: 0.8 }), []);

    useEffect(() => {
        if (lastBookRef.current) {
            console.log('Observing:', lastBookRef.current);
            observer.observe(lastBookRef.current);
        }
        return () => observer.disconnect();
    }, [lastBookRef, observer]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error fetching data</p>;
    }

    const books = (apiResponse || []) as Book[];

    return (
        <>
            <div className="container mx-auto flex flex-col md:flex-row justify-center">
                <div className="md:w-[20%] border-r-2">Filter</div>

                <div className="md:w-[80%] flex flex-row flex-wrap h-full border p-5 gap-2">
                    <Suspense fallback={<p>Loading books...</p>}>
                        {books.length > 0 ? (
                            books?.map((book, index) => (
                                <div className="flex flex-col flex-auto sm:w-1/3 lg:w-1/4 xl:w-1/5 max-w-full max-h-[620px] justify-start items-center border border-blue-800/20 p-3 shadow-sm hover:shadow-md hover:shadow-blue-800/30 rounded cursor-pointer gap-4 sm:gap-5" key={book.id} ref={index === books.length - 1 ? lastBookRef : null}>
                                    <div className='flex justify-center items-center w-full h-[40%] md:p-5'>
                                        <img className="w-36 h-54 object-fill border border-black/20" src={book.coverImage} alt={book.title} />
                                    </div>
                                    <div className='flex flex-col justify-start gap-2 w-full h-[60%]'>
                                        <div className="h-[80%]">
                                            <h3 className="text-sm sm:text-base font-bold leading-0">{book.title}</h3>
                                            <small>by: <b>{book.writer}</b></small>
                                            <button className="bg-yellow-500 text-black border border-yellow-500 font-bold text-sm leading-0 px-2 pt-[3px] pb-1.5 flex justify-center items-center rounded hover:shadow-md hover:shadow-yellow-500/30 my-2">Buy Now</button>
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
                </div>
            </div>
        </>
    );
};

export default BookList;
