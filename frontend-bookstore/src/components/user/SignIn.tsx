import { useState } from "react";

const SignIn = () => {
    const [isVisible, setIsVisible] = useState(true);

    const toggleVisibility = () => setIsVisible(!isVisible);

    return (
        <>
            <div onClick={toggleVisibility}>
                <p>Sign In</p>
            </div>
            <div onClick={toggleVisibility} className={`${isVisible ? 'flex' : 'hidden'} fixed left-0 top-0 justify-center items-center w-full h-full z-50 transition-all duration-500`}>
                <div className="bg-black/80 w-full h-full absolute left-0 top-0 z-40"></div>
                <div className="z-50">
                    <div onClick={toggleVisibility} className="absolute top-7 right-5">
                        <div className="absolute w-6 h-[2px] bg-white rotate-45 rounded"></div>
                        <div className="w-6 h-[2px] bg-white -rotate-45 rounded"></div>
                    </div>
                    <div className="relative flex min-w-[800px] h-[500px] bg-white text-black rounded transition-all duration-300">
                        <div onClick={toggleVisibility} className="absolute top-7 right-5">
                            <div className="absolute w-5 h-[2px] bg-black rotate-45 rounded"></div>
                            <div className="w-5 h-[2px] bg-black -rotate-45 rounded"></div>
                        </div>
                        <div className="px-10 py-14">
                            Form
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignIn