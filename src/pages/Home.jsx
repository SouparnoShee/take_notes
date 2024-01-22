import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Context, taskServer } from '../main'
import toast from 'react-hot-toast'
import Todoitem from '../components/Todoitem'
import { Navigate } from 'react-router-dom'


const Home = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)
    const [goTask, setGoTask] = useState([])
    const [refresh, setRefresh] = useState(false)

    const updateHandler = async (id) => {
        try {
            const { data } = await axios.put(`${taskServer}/${id}`, {}, {
                withCredentials: true,
            })
            toast.success(data.message)
            setRefresh(prev => !prev)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const deleteHandler = async (id) => {
        try {
            const { data } = await axios.delete(`${taskServer}/${id}`, {
                withCredentials: true,
            })
            toast.success(data.message)
            setRefresh(prev => !prev)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const { data } = await axios.post(`${taskServer}/newtask`, {
                title,
                description,
            }, {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                },
            })

            setTitle("")
            setDescription("")
            toast.success(data.message)
            setLoading(false)
            setRefresh(prev => !prev)
        } catch (error) {
            toast.error(error.response.data.message)
            // console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        axios.get(`${taskServer}/mytask`, {
            withCredentials: true,
        }).then((res) => {
            setGoTask(res.data.task)
        }).catch((error) => {
            toast.error(error.response.data.message)
        })
    }, [refresh])

    const { isAuthenticated } = useContext(Context);
    if (!isAuthenticated) return <Navigate to={"/login"} />
    return (
        <div className='home'>
            <div className='home-container'>
                <section>
                    <form onSubmit={submitHandler}>
                        <input
                            type="text"
                            placeholder='Enter Title'
                            required
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder='Enter Title'
                            required
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />


                        <div>
                            <button disabled={loading} type='submit'>Add Task</button>
                        </div>
                    </form>
                </section>
            </div>
            <div className="todo-container">
                {
                    goTask.map((e) => {
                        return (
                            <Todoitem
                                key={e._id}
                                title={e.title} description={e.description}
                                updateHandler={updateHandler}
                                deleteHandler={deleteHandler}
                                id={e._id}
                                isCompleted={e.isCompleted}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home
