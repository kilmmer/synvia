import { Task } from "../types/task.type";

async function newTask(task: Task){
    console.log(task);
    fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
    })
}

async function getTasks(){
    return await fetch('http://localhost:3000/tasks').then(res => res.json()).then(data => data)
}

async function deleteTask(id: number){
    return await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE'
    })
}

export {
    newTask,
    getTasks,
    deleteTask
}