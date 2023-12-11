import { useEffect, useState } from 'react';
import PopUp from '../PopUp';
import { formatCurrency } from '../../utilities/formatCurrency';
import { API_URL } from '../../utilities/constant';
import { useCartContext } from '../../context/cartContext';

interface UserInfo {
    id: number,
    name: string,
    email: string,
    points: number
}

const Profile: React.FC = () => {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [showPopup, setShowPopup] = useState(false);
    const { purchased } = useCartContext();

    const handleClick = () => setShowPopup(true);

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            try {

                fetch(`${API_URL}/profile`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        setUserInfo(data);
                    })
                    .catch((error) => console.error('Error fetching user information:', error));
            } catch (error) {
                console.error('Error decoding token:', error);
            }
        }
    }, [purchased]);

    return (
        <>
            <button type="button" onClick={handleClick} className="flex justify-center items-center h-full cursor-pointer hover:bg-white/20 p-3">
                Profile
            </button>

            <PopUp
                showPopup={showPopup}
                onClose={() => setShowPopup(false)}
            >
                <div className="flex flex-col w-full h-full min-h-[400px] justify-start items-center px-5 py-5">
                    <div className="h-10">
                        <h1 className="text-xl font-bold">User Information</h1>
                    </div>
                    <div className="flex w-full py-3">
                        {userInfo ? (
                            <ul className="flex flex-col gap-3">
                                <li><b>Name</b>: {userInfo.name}</li>
                                <li><b>Email</b>: {userInfo.email}</li>
                                <li><b>Bonus</b>: {formatCurrency(userInfo.points)}</li>
                                <li><b>Order</b>: No order yet</li>
                            </ul>
                        ) : (
                            <p>Loading user information...</p>
                        )}
                    </div>
                </div>
            </PopUp>
        </>
    );
};

export default Profile;
