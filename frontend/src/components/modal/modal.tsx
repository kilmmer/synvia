/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import './modal.css'

const Modal = (props: { title: string, description: string, children: React.ReactNode, isOpen: boolean, closeModal: () => void, handleData: (data: any) => void }) => {
    const { title, description, children, isOpen, closeModal, handleData } = props
    
    const handleModalContainerClick = (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()

    return (
        <>
            <Dialog
                open={isOpen}
                onClose={closeModal}
                onClick={handleModalContainerClick}
                PaperProps={{
                component: 'form',
                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData).entries());
                        handleData(formJson)
                        closeModal();
                    },
                }}
            >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {description}
                    </DialogContentText>
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeModal}>Cancel</Button>
                    <Button type="submit" onClick={handleData}>Create</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Modal