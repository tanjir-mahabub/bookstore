import { useEffect, useRef, useMemo } from 'react';
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
        <div className="text-black">
            {books.map((book, index) => (
                <div key={book.id} ref={index === books.length - 1 ? lastBookRef : null}>
                    <h3>{book.title}</h3>
                    <p>Writer: {book.writer}</p>
                    <img src={book.coverImage} alt={book.title} />
                    <p>Price: ${book.point}</p>
                    <p>Tags: {book.tags.join(', ')}</p>
                </div>
            ))}
        </div>
    );
};

export default BookList;
