import { FormEvent, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { API_URL } from '../../utilities/constant';


const SignUpForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();

        try {
            const response = await axios.post(`${API_URL}/register`, {
                name,
                email,
                password,
            });

            response.data && toast.success("User Created Successfully !", {
                position: toast.POSITION.TOP_LEFT
            });
        } catch (error: unknown) {
            toast.error("Registration Failure!", {
                position: toast.POSITION.TOP_LEFT
            });

        }
    };

    return (
        <>
            <div className="flex flex-col w-full h-full justify-center items-center px-5 py-5">
                <div className="h-10">
                    <h1 className="text-xl font-bold">Sign Up</h1>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col w-full gap-5">
                    <div className="flex flex-col gap-2">
                        <label className="font-bold" htmlFor="name">Name</label>
                        <input
                            className="border rounded w-full px-3 py-1.5"
                            type="text"
                            id="name"
                            placeholder="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-bold" htmlFor="Email">Email</label>
                        <input
                            className="border rounded w-full px-3 py-1.5"
                            type="email"
                            id="Email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label className="font-bold" htmlFor="Password">Password</label>
                        <input
                            className="border rounded w-full px-3 py-1.5"
                            type="password"
                            id="Password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <button type="submit" className="flex justify-center px-4 py-1.5 bg-blue-800 text-white rounded">Sign Up</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default SignUpForm;