import { useState } from "react";
import PopUp from "../PopUp";
import SignUpForm from "../SignUpFrom";

const SignUp = () => {
    const [showPopup, setShowPopup] = useState(false);

    const handleClick = () => setShowPopup(true);

    return (
        <>
            <button type="button" onClick={handleClick} className="flex justify-center items-center h-full cursor-pointer hover:bg-white/20 rounded p-3">
                Sign Up
            </button>

            <PopUp
                showPopup={showPopup}
                onClose={() => setShowPopup(false)}
            >
                <SignUpForm />
            </PopUp>
        </>
    );
};

export default SignUp