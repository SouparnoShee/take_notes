import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Context, userServer } from '../main'
import toast from 'react-hot-toast';
import axios from 'axios';


const Header = () => {
    const { isAuthenticated, setIsAuthenticated } = useContext(Context);
    const logoutHandler = async () => {
        try {
            await axios.get(`${userServer}/logout`, {
                withCredentials: true
            });
            toast.success("Logged Out Successfully")
            setIsAuthenticated(false);
        } catch (error) {
            toast.error("Got An Error")
            console.log(error)
            setIsAuthenticated(true)
        }
    }
    return (
        <div className='header'>
            <div className="logo">
                <h2>TO_DO APP</h2>
            </div>
            <div className="nav-contents">
                <div className="links">
                    <Link className='link' to={"/"}>Home</Link>
                    <Link className='link' to={"/profile"}>Profile</Link>
                    {
                        isAuthenticated ? <button onClick={logoutHandler} className='link logout'>Logout</button> : <Link className='link' to={"/login"}>Login</Link>
                    }

                </div>
            </div>

        </div>
    )
}

export default Header
