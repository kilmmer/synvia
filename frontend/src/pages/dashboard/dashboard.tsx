/* eslint-disable @typescript-eslint/no-explicit-any */
import { Autocomplete, Box, Button, Chip, Divider, Grid, TextField } from "@mui/material";
import { TaskCard, Modal } from "../../components";
import { useEffect, useState } from "react";
import { Task, TaskStatus } from "../../types/task.type";
import './dashboard.css'
import { logout } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { getTasks, newTask, updateTask, updateTaskStatus } from "../../services/task.service";
import { get } from "../../services/storage.service";

const Dashboard = () => {
    const [tasks, setTasks] = useState<Array<Task>>([]);
    const [showModalNewTask, setShowModalNewTask] = useState(false);
    const [showModalEditTask, setShowModalEditTask] = useState(false);
    const [todoList, setTodoList] = useState<Array<Task>>([]);
    const [inProgressList, setInProgressList] = useState<Array<Task>>([]);
    const [doneList, setDoneList] = useState<Array<Task>>([]);
    const [ users, setUsers ] = useState([])
    const [ selectedTask, setSelectedTask ] = useState<Task | any>()
    const navigate = useNavigate()

    useEffect(() => {
        const user = get('user');
        const token = get('access_token');
        
        if (!user || !token) {
            logout()
            navigate("/login")
            return;
        }
        
        getTasks().then(res => {
            if(res.statusCode !== 200){
                return false;
            }
            setTasks(res.data)
        })
            
        fetch('http://localhost:3000/api/v1/user', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${get('access_token')}`
            }
        }).then(r => r.json())
        .then(res => {
            if(res.statusCode !== 200){
                return false;
            }
            // res.data.ma``p(user => {return {label: user.name, id: user.id}})
            setUsers(res.data.map(user => {return {label: user.name, id: user.id}}))
        })
    }, [])

    useEffect(() => {
        const tasksTodo = tasks.filter((task) => task.status === TaskStatus.TODO);
        setTodoList(tasksTodo);

        const tasksInProgress = tasks.filter((task) => task.status === TaskStatus.IN_PROGRESS)
        setInProgressList(tasksInProgress);

        const tasksDone = tasks.filter((task) => task.status === TaskStatus.DONE)
        setDoneList(tasksDone);
    }, tasks.map(task => task.id))



    const handleMove = ( to: TaskStatus, id: number) => {
        const newTasks: Task[] = tasks.map((task: Task) => {
            if (task.id === id) {
                task.status = to;
            }
            return task;
        });

        updateTaskStatus(id, to.toString())
        setTasks(newTasks);
    };

    const handleDelete = (id: number) => {
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);
    };

    const handleData = (data: any) => {
        console.log(data);
        newTask(data)
        todoList.push(data)
    }

    const handleEditTaskCard = (id: number) => {
        const editTask = tasks.find((task) => task.id === id);
        if (editTask) {
            console.log(editTask)
            editTask['user'] = users.find((user: any) => user.id === editTask.userId)
            setSelectedTask(editTask)
            setShowModalEditTask(true)
        }
    }

    const handleEditTask = (data: any) => {
        console.log(data)

        const id = data.id
        const newTasks = tasks.map((task: Task) => {
            if (task.id === id) {
                task.title = data.title
                task.description = data.description
                task.status = data.status
                task.userId = data.userId
            }
            return task;
        });

        setTasks(newTasks);
        updateTask(data)
    }


    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <div style={{ textAlign: 'end', marginTop: 20 }}>
                        <Button variant="contained" color="primary" centerRipple onClick={() => setShowModalNewTask(true)}>Add Task</Button>
                    </div>

                    {showModalNewTask && 
                    <Modal title="Create new task" description={''} isOpen={showModalNewTask} closeModal={() => setShowModalNewTask(false)} handleData={handleData}>
                        <Box>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="title"
                                name="title"
                                label="Title"
                                type="text"
                                fullWidth
                                variant="standard"
                            />
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="description"
                                name="description"
                                label="Description"
                                type="text"
                                fullWidth
                                multiline
                                rows={4}
                                variant="standard"
                                style={{marginTop: 2}}
                            />
                            {/* <TextField
                                
                                required
                                margin="dense"
                                id="Tags"
                                name="tags"
                                label="Tags"
                                type="text"
                                fullWidth
                                variant="standard"
                            /> */}
                            <Autocomplete
                                multiple
                                id="tags-standard"
                                options={[]}
                                freeSolo
                                style={{marginTop: 2}}
                                renderTags={(value: readonly string[], getTagProps) =>
                                value.map((option: string, index: number) => (
                                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                ))
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="standard"
                                        label="Tags"
                                        name="tags"
                                        placeholder="Tags"
                                    />
                                )}
                            />
                            {/* <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="user"
                                name="user"
                                label="Task for"
                                type="text"
                                fullWidth
                                variant="standard"
                            /> */}
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={users.map((user: {name: string, id: number}) => {return {label: user.name, id: user.id}})}
                                getOptionLabel={(option) => option.label}
                                getOptionKey={(option) => option.id}
                                sx={{ width: '100%' }}
                                renderInput={(params) => {return <TextField {...params} variant="standard" name="user" style={{marginTop: 5, width: "100%"}} label="Users" />}}
                            />
                        </Box>
                    </Modal>
                    }
                    
                    {showModalEditTask && 
                    <Modal title="Edit task" description={''} isOpen={showModalEditTask} closeModal={() => setShowModalEditTask(false)} handleData={handleEditTask}>
                        <Box>
                            <input type="hidden" name="id" value={selectedTask?.id} />
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="title"
                                name="title"
                                label="Title"
                                type="text"
                                fullWidth
                                variant="standard"
                                defaultValue={selectedTask?.title}
                            />
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="description"
                                name="description"
                                label="Description"
                                type="text"
                                fullWidth
                                multiline
                                defaultValue={selectedTask?.description}
                                rows={4}
                                variant="standard"
                                style={{marginTop: 2}}
                            />
                            {/* <TextField
                                
                                required
                                margin="dense"
                                id="Tags"
                                name="tags"
                                label="Tags"
                                type="text"
                                fullWidth
                                variant="standard"
                            /> */}
                            <Autocomplete
                                multiple
                                id="tags-standard"
                                freeSolo
                                options={selectedTask?.tags ?? []}
                                style={{marginTop: 2}}
                                
                                renderTags={(value: string[], getTagProps) =>
                                value.map((option: string, index: number) => (
                                    <Chip variant="outlined" label={option} {...getTagProps({ index })} />
                                ))
                                }
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        variant="standard"
                                        label="Tags"
                                        name="tags"
                                        placeholder="Tags"
                                    />
                                )}
                            />
                            {/* <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="user"
                                name="user"
                                label="Task for"
                                type="text"
                                fullWidth
                                variant="standard"
                            /> */}
                            <Autocomplete
                                disablePortal
                                id="combo-box-user"
                                options={users}
                                getOptionLabel={(option) => option.label}
                                getOptionKey={(option) => option.id}
                                sx={{ width: '100%' }}
                                defaultValue={selectedTask?.user ? [selectedTask?.user.name] : []}
                                
                                renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="standard"
                                    name="user"
                                    label="Users"
                                    style={{ marginTop: 5, width: '100%' }}
                                />
                                )}
                            />
                        </Box>
                    </Modal>
                    }
                </Grid>
            </Grid>

            <Grid container paddingTop={6} alignItems={'stretch'} spacing={2} sx={{ height: 'auto' }}>
                <Grid item xs={4} borderRadius={2} >
                    <Grid item xs={12} padding={2} style={{  marginBottom: '30px' }} id="todoList">
                        <h1 style={{ textAlign: 'center' }}>To Do</h1>
                        <Divider />
                    </Grid>
                    {
                        todoList.map((task: Task, index: number) => {
                            return (
                                <Grid item key={'todo_card_key_'+index} xs={12}>
                                    <TaskCard id={task.id} description={task.description} status={task.status} tags={task.tags} title={task.title} key={'todo_key_'+index} handleDelete={handleDelete} handleMove={handleMove} handleEdit={handleEditTaskCard} />
                                </Grid>
                            )
                        })
                    }
                </Grid>
                <Grid item xs={4} borderRadius={2}>
                    <Grid item xs={12} padding={2} marginBottom={'30px'} style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }} id="inProgressList">
                        <h1 style={{ textAlign: 'center' }}>In Progress</h1>
                        <Divider />
                    </Grid>
                    {
                        inProgressList.map((task, index: number) => {
                            return (
                            <Grid item key={'inprogress_card_key_'+index} xs={12} >
                                <TaskCard id={task.id} description={task.description} status={task.status} tags={task.tags} title={task.title} key={'inprogress_key_'+index} handleDelete={handleDelete} handleMove={handleMove} handleEdit={handleEditTaskCard} />
                            </Grid>
                            )
                        })
                    }
                </Grid>
                <Grid item xs={4} borderRadius={2}>
                    <Grid item xs={12} padding={2} marginBottom={'30px'} style={{ textAlign: 'center', marginLeft: 'auto', marginRight: 'auto' }} id="doneList">
                        <h1 style={{ textAlign: 'center' }}>Done</h1>
                        <Divider />
                    </Grid>
                    {
                        doneList.map((task, index: number) => {
                            return (
                            <Grid item xs={12} key={'done_card_key_'+index}>
                                <TaskCard id={task.id} description={task.description} status={task.status} tags={task.tags} title={task.title} key={'done_key_'+index} handleDelete={handleDelete} handleMove={handleMove} handleEdit={handleEditTaskCard} />
                            </Grid>
                            )
                        })
                    }
                </Grid>
            </Grid>
        </>
    )
}

export default Dashboard;