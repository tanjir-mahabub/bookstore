import { useEffect, useState } from "react";

const Footer = () => {
    const [showButton, setShowButton] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    useEffect(() => {
        const handleScroll = () => {
            setShowButton(window.scrollY >= 70);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [])

    return (
        <div className="bg-blue-900 w-full mx-auto flex justify-between items-center px-3 md:px-10">
            <div className="text-white text-center w-full text-xs leading-normal py-2.5">
                All rights reserved by Md Tanjir Mahabub
            </div>

            <button onClick={scrollToTop} type="button" className="fixed bottom-10 right-5 flex justify-center items-center w-10 h-10 pb-1 bg-blue-800 text-white border border-blue-800 shadow animate-bounce rounded-full z-50" style={{ display: showButton ? 'block' : 'none' }}>
                Top
            </button>
        </div>
    )
}

export default Footer