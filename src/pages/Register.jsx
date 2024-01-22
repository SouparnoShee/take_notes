import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios';
import { Context, userServer } from '../main';
import toast from 'react-hot-toast';
import { useContext } from 'react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isAuthenticated, setIsAuthenticated, loading, setLoading } = useContext(Context);
    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true)
        console.log(name, email, password);
        try {
            const { data } = await axios.post(`${userServer}/register`, {
                name,
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
            toast.error("Got An Error")
            console.log(error)
            setIsAuthenticated(false)
        }
    }

    if (isAuthenticated) return <Navigate to={"/"} />

    return (
        <div className='register'>
            <section>
                <form onSubmit={submitHandler} >
                    <input
                        type="text"
                        placeholder='Enter Your Name'
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}

                    />
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
                        <button disabled={loading} type='submit'>Sign Up</button>
                    </div>
                    <h2>Or</h2>
                    <Link className='sign-in' to={"/login"}>Sign In</Link>
                </form>
            </section>
        </div>
    )
}

export default Register
