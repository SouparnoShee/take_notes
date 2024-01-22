import React from 'react'

const Todoitem = ({ title, description, isCompleted, updateHandler, deleteHandler, id }) => {
    return (
        <div className='todoitem'>
            <div className="content">
                <h4>{title}</h4>
                <span>{description}</span>
            </div>
            <div className="check-delete">
                <input type="checkbox" checked={isCompleted} onChange={() => updateHandler(id)} />
                <button onClick={() => deleteHandler(id)}>Delete</button>
            </div>
        </div>
    )
}

export default Todoitem
