import { useState } from "react";
import PopUp from "../PopUp";
import LoginForm from "./LoginForm";

const SignIn = () => {
    const [showPopup, setShowPopup] = useState(false);

    const handleClick = () => setShowPopup(true);

    return (
        <>
            <button type="button" onClick={handleClick} className="flex justify-center items-center h-full cursor-pointer hover:bg-white/20 p-3">
                Sign In
            </button>

            <PopUp
                showPopup={showPopup}
                onClose={() => setShowPopup(false)}
            >
                <LoginForm />
            </PopUp>
        </>
    );
};

export default SignIn