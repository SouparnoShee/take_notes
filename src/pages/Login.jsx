import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Context, userServer } from '../main';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);
    if (isAuthenticated) return <Navigate to={"/"} />
    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const { data } = await axios.post(`${userServer}/login`, {
                email,
                password,
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true
            });
            toast.success(data.message)
            setIsAuthenticated(true);
            setLoading(false)
        } catch (error) {
            toast.error("Invalid Email or Password")
            console.log(error)
            setIsAuthenticated(false)
        }
    }

    return (
        <div className='login'>
            <section>
                <form onSubmit={submitHandler}>
                    <input
                        type="email"
                        placeholder='Email'
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder='Password'
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <div>
                        <button disabled={loading} type='submit'>Login</button>
                    </div>
                    <h2>Or</h2>
                    <Link className='sign-up' to={"/register"}>Sign Up</Link>
                </form>
            </section>
        </div>
    )
}

export default Login
