
const Header = () => {
    return (
        <nav className="bg-blue-900 w-full mx-auto flex justify-between items-center px-3 md:px-10">
            <div className="text-white text-3xl leading-normal pb-1.5">
                Amazing
            </div>
            <div className="text-white flex gap-4">
                <div>
                    Sign In
                </div>
                <div>
                    Sign Up
                </div>
                <div>
                    Cart <span>(0)</span>
                </div>
            </div>
        </nav>
    )
}

export default Header