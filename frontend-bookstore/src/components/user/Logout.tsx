import { useAuth } from "../../hooks/useAuth";

const Logout = () => {
    const { logout } = useAuth();

    return (
        <button type="button" onClick={logout} className="flex justify-center items-center h-full cursor-pointer hover:bg-white/20 p-3">
            Logout
        </button>
    )
}

export default Logout