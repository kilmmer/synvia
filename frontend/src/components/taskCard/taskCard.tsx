/* eslint-disable @typescript-eslint/no-explicit-any */

import { Button, Card, CardActions, CardContent, Chip, Divider, Typography } from '@mui/material';
import './taskCard.css'
import { Delete, NavigateBefore, NavigateNext  } from '@mui/icons-material';
import { TaskStatus } from '../../types/task.type';

const TaskCard = (props: {title: string, description: string, status: string, tags: Array<any>, id: number, handleDelete: (id: number) => void, handleMove: (to: TaskStatus, id: number) => void}) => {
    const { title, description, status, tags, id } = props;

    return (
        <Card sx={{ minWidth: 275, marginY: 2, marginX: 2 }} className='taskCard'>
            <CardContent>
                <Typography variant="subtitle2" component="div">
                    {id}
                </Typography>
                <Typography variant='overline' sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {title}
                    <Divider />
                </Typography>
                <Typography variant="body2">
                    {description}
                </Typography>
                <Typography sx={{ mb: 1 }} color="text.secondary">
                    {status}
                </Typography>
                <Divider />
                {/* {tags.length > 0 && 
                <Typography variant="subtitle2" component="div">
                    {tags.map((tag: any, index: number) => {
                        return <Chip label={tag['name']} size={'small'} color={tag['type']} key={'chip_key_'+index} sx={{marginRight: 1, marginTop: 2}}/>
                    })}
                </Typography>} */}
            </CardContent>
            <Divider />
            {status === "todo" &&<CardActions sx={{ justifyContent: 'space-between', alignItems: 'center' }} style={{padding: '0px 16px 8px 16px'}}>

                <Button size="small" centerRipple variant='text' color='error' startIcon={<Delete />} onClick={() => props.handleDelete(id)}>Delete</Button>
                <Button size="small" centerRipple variant='text' color='primary' endIcon={<NavigateNext />} onClick={() => props.handleMove(TaskStatus.IN_PROGRESS, id)}>Move to In Progress</Button>
            </CardActions>}
              
            {status === "inProgress" &&<CardActions sx={{ justifyContent: 'space-between', alignItems: 'center' }} style={{padding: '0px 16px 8px 16px'}}>
                <Button size="small" centerRipple variant='text' color='primary' startIcon={<NavigateBefore />} onClick={() => props.handleMove(TaskStatus.TODO, id)}>Move to To Do</Button>
                <Button size="small" centerRipple variant='text' color='primary' endIcon={<NavigateNext />} onClick={() => props.handleMove(TaskStatus.DONE, id)}>Move to Done</Button>
            </CardActions>}
            
            {status === "done" && <CardActions sx={{ justifyContent: 'space-between', alignItems: 'center' }} style={{padding: '0px 16px 8px 16px'}}>
                <Button size="small" centerRipple variant='text' color='primary' startIcon={<NavigateBefore />} onClick={() => props.handleMove(TaskStatus.IN_PROGRESS, id)}>Move to In Progress</Button>
            </CardActions>}
              
        </Card>
    )
}

export default TaskCard;