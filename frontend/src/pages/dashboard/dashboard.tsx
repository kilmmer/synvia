/* eslint-disable @typescript-eslint/no-explicit-any */
import { Autocomplete, Box, Button, Chip, Divider, Grid, TextField } from "@mui/material";
import { TaskCard, Modal } from "../../components";
import { useEffect, useState } from "react";
import { Task, TaskStatus } from "../../types/task.type";
import './dashboard.css'
import { logout } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import { newTask } from "../../services/task.service";
import { get } from "../../services/storage.service";

const Dashboard = () => {
    const [tasks, setTasks] = useState<Array<Task>>([]);
    const [showModal, setShowModal] = useState(false);
    const [todoList, setTodoList] = useState<Array<Task>>([]);
    const [inProgressList, setInProgressList] = useState<Array<Task>>([]);
    const [doneList, setDoneList] = useState<Array<Task>>([]);
    const [ users, setUsers ] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const user = get('user');
        const token = get('access_token');
        
        if (!user || !token) {
            logout()
            navigate("/login")
            return;
        }
        
        fetch('http://localhost:3000/api/v1/task', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${get('access_token')}`,
                'userId': user !== null ? JSON.parse(user).id : ''
            },
        })
            .then((response) => response.json())
            .then((result) => setTasks(result.data));
            
        fetch('http://localhost:3000/api/v1/user', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${get('access_token')}`
            }
        }).then(r => r.json())
        .then(res => {
            if(res.message){
                return false;
            }
            res.data.map(user => {return {label: user.name, id: user.id}})
            setUsers(res.data)
        })
    }, [])

    useEffect(() => {
        const tasksTodo = tasks.filter((task) => task.status === TaskStatus.TODO);
        setTodoList(tasksTodo);

        const tasksInProgress = tasks.filter((task) => task.status === TaskStatus.IN_PROGRESS)
        setInProgressList(tasksInProgress);

        const tasksDone = tasks.filter((task) => task.status === TaskStatus.DONE)
        setDoneList(tasksDone);
    }, [])

    const handleMove = ( to: TaskStatus, id: number) => {
        const newTasks: Task[] = tasks.map((task: Task) => {
            if (task.id === id) {
                task.status = to;
            }
            return task;
        });
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


    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <div style={{ textAlign: 'end', marginTop: 20 }}>
                        <Button variant="contained" color="primary" centerRipple onClick={() => setShowModal(true)}>Add Task</Button>
                    </div>

                    {showModal && 
                    <Modal title="Create new task" description={''} isOpen={showModal} closeModal={() => setShowModal(false)} handleData={handleData}>
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
                                sx={{ width: '100%' }}
                                
                                renderInput={(params) => {return <TextField {...params} variant="standard" name="user" style={{marginTop: 5, width: "100%"}} label="Users" />}}
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
                                    <TaskCard id={task.id} description={task.description} status={task.status} tags={task.tags} title={task.title} key={'todo_key_'+index} handleDelete={handleDelete} handleMove={handleMove} />
                                </Grid>
                            )
                        })
                    }
                </Grid>
                <Grid item xs={4} borderRadius={2}>
                    <Grid item xs={12} padding={2} marginBottom={'30px'} style={{ textAlign: 'center', margin: '0 auto' }} id="inProgressList">
                        <h1 style={{ textAlign: 'center' }}>In Progress</h1>
                        <Divider />
                    </Grid>
                    {
                        inProgressList.map((task, index: number) => {
                            return (
                            <Grid item key={'inprogress_card_key_'+index} xs={12} >
                                <TaskCard id={task.id} description={task.description} status={task.status} tags={task.tags} title={task.title} key={'inprogress_key_'+index} handleDelete={handleDelete} handleMove={handleMove} />
                            </Grid>
                            )
                        })
                    }
                </Grid>
                <Grid item xs={4} borderRadius={2} color={'gray'} height={'100%'}>
                    <Grid item xs={12} padding={2} marginBottom={'30px'} style={{ textAlign: 'center', margin: '0 auto' }} id="doneList">
                        <h1 style={{ textAlign: 'center' }}>Done</h1>
                        <Divider />
                    </Grid>
                    {
                        doneList.map((task, index: number) => {
                            return (
                            <Grid item xs={12} key={'done_card_key_'+index} md={6} lg={4}>
                                <TaskCard id={task.id} description={task.description} status={task.status} tags={task.tags} title={task.title} key={'done_key_'+index} handleDelete={handleDelete} handleMove={handleMove} />
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