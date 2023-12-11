
import { useAuth } from "../hooks/useAuth";
import Cart from "./Cart"
import Logout from "./user/Logout";
import Profile from "./user/Profile";
import SignIn from "./user/SignIn"
import SignUp from "./user/SignUp"

const Routes = () => {
    const { isAuthenticated } = useAuth();

    return (
        <>
            {!isAuthenticated ? (
                <>
                    <SignIn />
                    <SignUp />
                </>
            ) : (
                <>
                    <Profile />
                    <Logout />
                </>
            )}


            <Cart />

        </>
    )
}

export default Routes