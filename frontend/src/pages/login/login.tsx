import { Button, FormControl, Grid, Input, InputLabel } from "@mui/material"
import { useNavigate } from "react-router-dom"

const Login = () => {
    const navigate = useNavigate()

    const handleLogin = ( event: React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault()
        event.stopPropagation()
        
        const name = event.currentTarget.elements.namedItem('name') as HTMLInputElement

        localStorage.setItem('user', JSON.stringify(name.value))
        navigate('/dashboard')

        return false
    }

    return (
        <div>
            <Grid container spacing={2} height={'100vh'} alignItems={'top'} justifyContent={'center'}>
                <Grid item xs={12} justifyContent={'center'} alignContent={'center'}>
                    <h1 style={{ textAlign: 'center', marginTop: '10px' }}>Login</h1>
                </Grid>
                <Grid item xs={6} md={6} width={'100%'} alignContent={'top'} justifyContent={'center'}>
                    <form onSubmit={handleLogin} action="" >
                    <FormControl fullWidth>
                        <InputLabel htmlFor="name">Name</InputLabel>
                        <Input id="name" name="name" placeholder="Enter your name" autoFocus margin="dense" style={ { width: '100%', marginBottom: '20px' }}/>
                        <Button type="submit" variant="contained" color="primary">Login</Button>
                    </FormControl>
                    </form>
                </Grid>
            </Grid>
        </div>
    )
}

export default Login;