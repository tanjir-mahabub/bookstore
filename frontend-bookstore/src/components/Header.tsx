import { AuthProvider } from "../context/authContext";
import Routes from "./Routes";

import Logo from "/vite.svg";

const Header = () => {

    return (
        <AuthProvider>
            <nav className="bg-blue-900 w-full mx-auto fixed top-0 left-0 border border-blue-800 shadow shadow-blue-800/20 overflow-hidden z-40">
                <div className="container flex justify-between items-center w-screen mx-auto px-5 md:px-9">
                    <div className="w-[20%] md:w-[40%] flex items-center text-white text-lg sm:text-3xl text-left leading-normal pb-1.5">
                        <img src={Logo} alt="Logo" /> Amazing
                    </div>
                    <div className="w-[80%] md:w-[60%] text-white flex justify-end gap-1">
                        <Routes />
                    </div>
                </div>
            </nav>
        </AuthProvider>
    )
}

export default Header