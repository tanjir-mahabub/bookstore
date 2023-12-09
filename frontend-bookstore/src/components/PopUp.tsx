interface PopUpProps {
    children: React.ReactNode;
    showPopup?: boolean;
    onClose?: () => void;
}

const PopUp: React.FC<PopUpProps> = ({ children, showPopup = false, onClose }) => {
    return (
        <>
            <div className={`${showPopup ? 'flex' : 'hidden'} fixed left-0 top-0 justify-center items-center w-full h-full z-50 transition-all duration-500`}>
                <div onClick={onClose} className="bg-black/80 w-full h-full absolute left-0 top-0 z-40"></div>
                <div className="z-50">
                    <div onClick={onClose} className="absolute top-3 right-2 cursor-pointer p-3">
                        <div className="absolute w-6 h-[2px] bg-white rotate-45 rounded"></div>
                        <div className="w-6 h-[2px] bg-white -rotate-45 rounded"></div>
                    </div>
                    <div className="relative flex w-full sm:w-[380px] h-full bg-white text-black rounded transition-all duration-300 z-50">
                        <div onClick={onClose} className="absolute top-2 right-1 cursor-pointer p-3">
                            <div className="absolute w-5 h-[2px] bg-black rotate-45 rounded"></div>
                            <div className="w-5 h-[2px] bg-black -rotate-45 rounded"></div>
                        </div>
                        <div className="flex w-full justify-center items-center px-2 py-5">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PopUp;