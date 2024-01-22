import React, { useContext } from 'react'
import { Context } from '../main'
import Loading from '../components/Loading'

const Profile = () => {
    const { user, isAuthenticated, loading } = useContext(Context)
    return (

        loading ? <Loading /> : (<div className="profile-info">
            <div className="name">
                <span>UserName</span>
                <h1>{user?.name}</h1>
            </div>
            <div className="email">
                <span>Email is - </span>
                <h2>{user?.email}</h2>
            </div>
        </div>)

    )
}

export default Profile
