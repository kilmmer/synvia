import { Task } from "../types/task.type";

const newTask = async (task: Task) =>{
    
    fetch('http://localhost:3000/api/v1/task', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer '+localStorage.getItem('access_token')
        },
        body: JSON.stringify(task)
    }).then(r => r.json())
    .then(data => {
        console.log(data)
    })
}

const getTasks = async () => {
    return await fetch('http://localhost:3000/api/v1/task', {headers: {'Authorization': 'Bearer '+localStorage.getItem('access_token')}}).then(res => res.json()).then(data => data)
}

const deleteTask = async (id: number) => {
    return await fetch(`http://localhost:3000/api/v1/task/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer '+localStorage.getItem('access_token')
        }
    })
}

export {
    newTask,
    getTasks,
    deleteTask
}