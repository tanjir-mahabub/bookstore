import { useState } from "react";

const PopUp: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <>
            {/* Button or trigger to open the popup */}
            <button onClick={toggleVisibility}>Open Popup</button>

            {isVisible && (
                <div className="flex w-screen h-screen overflow-hidden fixed bg-black/30">
                    {children}
                    <button onClick={toggleVisibility}>Close Popup</button>
                </div>
            )}
        </>
    );
};

export default PopUp;