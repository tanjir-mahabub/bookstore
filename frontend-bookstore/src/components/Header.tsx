import SignIn from "./user/SignIn"
import SignUp from "./user/SignUp"

const Header = () => {
    return (
        <nav className="bg-blue-900 w-full mx-auto overflow-hidden">
            <div className="container flex justify-between items-center w-screen mx-auto px-5 md:px-9">
                <div className="w-[20%] md:w-[40%] text-white text-lg sm:text-3xl text-left leading-normal pb-1.5">
                    Amazing
                </div>
                <div className="w-[80%] md:w-[60%] text-white flex justify-end gap-1">
                    <SignIn />

                    <SignUp />

                    <div className="flex justify-center items-center h-full cursor-pointer hover:bg-white/20 rounded p-3">
                        Cart <span>(0)</span>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header