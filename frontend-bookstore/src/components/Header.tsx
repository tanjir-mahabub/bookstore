import SignIn from "./user/SignIn"
import SignUp from "./user/SignUp"

const Header = () => {
    return (
        <nav className="bg-blue-900 w-full mx-auto flex justify-between items-center px-3 md:px-10">
            <div className="text-white text-3xl leading-normal pb-1.5">
                Amazing
            </div>
            <div className="text-white flex gap-1">
                <SignIn />

                <SignUp />

                <div className="flex justify-center items-center h-full cursor-pointer hover:bg-white/20 rounded p-3">
                    Cart <span>(0)</span>
                </div>
            </div>
        </nav>
    )
}

export default Header