/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Divider, Grid, TextField } from "@mui/material";
import { TaskCard, Modal } from "../../components";
import { useState } from "react";
import { Task, TaskStatus } from "../../types/task.type";

const Dashboard = () => {
    const [tasks, setTasks] = useState<Array<Task>>([{
        id: 1,
        description: 'Task 1',
        status: TaskStatus.TODO,
        tags: [{name: 'urgent', type: 'warning'}, {name: 'important', type: 'error'}],
        title: 'Task #1'
    },
    {
        id: 2,
        description: 'Task 2',
        status: TaskStatus.TODO,
        tags: [],
        title: 'Task #2'
    },
    {
        id: 3,
        description: 'Task 3',
        status: TaskStatus.TODO,
        tags: [],
        title: 'Task #3'
    },
    {
        id: 4,
        description: 'Task 4',
        status: TaskStatus.TODO,
        tags: [],
        title: 'Task #4'
    }]);

    const [showModal, setShowModal] = useState(false);

    const todoList = tasks.filter((task) => task.status === TaskStatus.TODO);
    const inProgressList = tasks.filter((task) => task.status === TaskStatus.IN_PROGRESS);
    const doneList = tasks.filter((task) => task.status === TaskStatus.DONE);
  
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
    }

    return (
        <>
            <Grid container>
                <Grid item xs={12}>
                    <div style={{ textAlign: 'end', marginTop: 20 }}>
                        <Button variant="contained" color="primary" centerRipple onClick={() => setShowModal(true)}>Add Task</Button>
                    </div>

                    {showModal && <Modal title="Create new task" description={''} isOpen={showModal} closeModal={() => setShowModal(false)} handleData={handleData}>
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
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="Tags"
                        name="tags"
                        label="Tags"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="user"
                        name="user"
                        label="Task for"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    </Modal>}
                    
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