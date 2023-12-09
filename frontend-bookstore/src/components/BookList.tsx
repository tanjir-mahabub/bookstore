import { useEffect, useRef, useState, useCallback } from 'react';
import { Book } from '../type/Book';
import BookCard from './BookCard';
import Spinner from './Spinner';

const BookList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(false);
    const [noData, setNoData] = useState(false);
    const [isFirstCall, setIsFirstCall] = useState(true);

    const observerRef = useRef<HTMLDivElement | null>(null);

    const fetchNextPage = useCallback(async () => {
        try {
            if (!isFirstCall) {
                // Add a 3-second delay for subsequent calls
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }

            setLoading(true);

            const nextPage = currentPage + 1;
            const response = await fetch(`http://localhost:4000/books?page=${nextPage}`);
            const newData = await response.json();

            if (Array.isArray(newData)) {
                // Update state with the new data and page number
                setBooks((prevBooks) => [...prevBooks, ...newData]);
                setCurrentPage(nextPage);
                setIsFirstCall(false);
            } else {
                setNoData(true)
                // console.log('No more data to fetch.');
            }
        } catch (error) {
            console.error('Error fetching next page:', error);
        } finally {
            setLoading(false);
        }
    }, [currentPage, isFirstCall]);

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.8) {
                    // Fetch next page when 80% scrolled
                    fetchNextPage();
                }
            });
        });

        if (observerRef.current) {
            observer.observe(observerRef.current);

            return () => {
                observer.disconnect();
            };
        }
    }, [observerRef, currentPage, fetchNextPage]);

    return (
        <>
            <div className="container-md mx-auto flex flex-col md:flex-row justify-center overflow-hidden">
                <div className="md:w-[20%] border-r-2">Filter</div>

                <div className='md:w-[80%] h-full border'>
                    <div className="grid grid-cols-1 xl:grid-cols-2 3xl:grid-cols-3 h-full p-5 gap-3">
                        <BookCard books={books} />
                        <div ref={observerRef} />

                    </div>

                    {(!loading) &&
                        <div className={`w-full h-14 ${!noData ? 'flex' : 'hidden'}`}>
                            <Spinner />
                        </div>
                    }
                </div>
            </div>

        </>
    );
};

export default BookList;
