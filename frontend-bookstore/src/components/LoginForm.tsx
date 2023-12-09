import { FormEvent, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:4000/login', {
                email,
                password,
            });

            toast.success("User login successfully", {
                position: toast.POSITION.TOP_RIGHT
            });
            console.log(response.data);
        } catch (error) {

            toast.error("Login failure!", {
                position: toast.POSITION.TOP_RIGHT
            });
            console.error(error);
        }
    };

    return (
        <>
            <ToastContainer autoClose={1500} />
            <div className="flex flex-col w-full h-full justify-center items-center px-5 py-5">
                <div className="h-10">
                    <h1 className="text-xl font-bold">Sign In</h1>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col w-full gap-5">
                    <div className="flex flex-col gap-2">
                        <label className="font-bold" htmlFor="email">Email</label>
                        <input
                            className="border rounded w-full px-3 py-1.5"
                            type="email"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-bold" htmlFor="password">Password</label>
                        <input
                            className="border rounded w-full px-3 py-1.5"
                            type="password"
                            id="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <button type="submit" className="flex justify-center px-4 py-1.5 bg-blue-800 text-white rounded">Sign In</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;