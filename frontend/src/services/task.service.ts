import { Task } from "../types/task.type";
import { get } from "./storage.service";


const newTask = async (task: Task) =>{
    
    fetch('http://localhost:3000/api/v1/task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${get('access_token')}`,
            'userId': get('user').id
        },
        body: JSON.stringify(task)
    }).then(r => r.json())
    .then(data => {
        console.log(data)
    })
}

const getTasks = async () => {
    return await fetch('http://localhost:3000/api/v1/task', {headers: {'Authorization': `Bearer ${get('access_token')}`,}}).then(res => res.json()).then(data => data)
}

const getTask = async (taskId: number) => {
    return await fetch('http://localhost:3000/api/v1/task/'+taskId, {headers: {'Authorization': `Bearer ${get('access_token')}`}}).then(res => res.json()).then(data => data)
}

const deleteTask = async (id: number) => {
    return await fetch(`http://localhost:3000/api/v1/task/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${get('access_token')}`,
        }
    })
}

const updateTask = async (task: Task) => {
    return await fetch(`http://localhost:3000/api/v1/task/${task.id}`,
        {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${get('access_token')}`
            },
            body: JSON.stringify({task})
        }
    )
}

export {
    newTask,
    getTasks,
    getTask,
    deleteTask,
    updateTask
}