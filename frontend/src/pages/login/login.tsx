import { Close } from "@mui/icons-material"
import { Alert, Box, Button, Collapse, FormControl, Grid, IconButton, Input, InputLabel } from "@mui/material"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { login } from "../../services/auth.service"
import { Context } from "../../context/context"

const Login = () => {
    const navigate = useNavigate()
    const [formError, setFormError] = useState<boolean>(false)
    const [requestError, setRequestError] = useState<boolean>(false)
    const [loginError, setLoginError] = useState()
    const { setUser } = useContext(Context)

    const handleLogin = async ( event: React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault()
        event.stopPropagation()
        
        const email = event.currentTarget.elements.namedItem('email') as HTMLInputElement
        const password = event.currentTarget.elements.namedItem('password') as HTMLInputElement

        if ( !email.value || !password.value ) {
            setFormError(true)
            
            return false
        }

        const loginResult = await login(email.value, password.value)
        
        if(!loginResult.access_token) {
            setRequestError(true)
            setLoginError(loginResult)
            return false
        }


        localStorage.setItem('access_token', loginResult.access_token)
        localStorage.setItem('user', loginResult.access_token)

        setUser(loginResult)
        
        navigate('/dashboard')

        return false
    }

    return (
        <div>
            {formError && <Box sx={{ width: '100%' }}>
                <Collapse in={formError}>
                    <Alert
                    severity="warning"
                    action={
                        <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setFormError(false);
                        }}
                        >
                        <Close fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                    >
                    Please fill all the fields.
                    </Alert>
                </Collapse>
                </Box>}
            {requestError && <Box sx={{ width: '100%' }}>
                <Collapse in={requestError}>
                    <Alert
                    severity="warning"
                    action={
                        <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                            setRequestError(false);
                        }}
                        >
                        <Close fontSize="inherit" />
                        </IconButton>
                    }
                    sx={{ mb: 2 }}
                    >
                    {loginError['message']}
                    </Alert>
                </Collapse>
                </Box>}

            <Grid container spacing={2} height={'auto'}  justifyContent={'center'}>
                <Grid item xs={12} justifyContent={'center'} >
                    <h1 style={{ textAlign: 'center' }}>Login</h1>
                </Grid>
                <Grid item xs={6} md={6} width={'100%'} justifyContent={'center'}>
                    <form onSubmit={handleLogin} action="" >
                        <FormControl fullWidth>
                            <InputLabel htmlFor="name">Email</InputLabel>
                            <Input id="email" name="email" placeholder="Enter your email" autoFocus margin="dense" style={ { width: '100%', marginBottom: '20px' }}/>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="name">Password</InputLabel>
                            <Input id="password" name="password" type="password" placeholder="Enter your password" autoFocus margin="dense" style={ { width: '100%', marginBottom: '20px' }}/>
                        </FormControl>
                        <div style={ { marginBottom: '20px' }}>
                            <Button type="submit" variant="contained" color="primary" style={ { width: '100%' }}>Login</Button>
                        </div>
                        <div>
                            <Button type="button" variant="outlined" color="info" style={ { width: '100%' }} onClick={() => navigate('/register')}>Register</Button>
                        </div>
                    </form>
                </Grid>
            </Grid>
        </div>
    )
}

export default Login;