
import { useAuth } from "../hooks/useAuth";
import Cart from "./Cart"
import Logout from "./user/Logout";
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
                <Logout />
            )}


            <Cart />

        </>
    )
}

export default Routes