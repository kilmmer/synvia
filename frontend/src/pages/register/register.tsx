/* eslint-disable @typescript-eslint/no-explicit-any */
import {useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert, Collapse, FormControl, IconButton, InputLabel, MenuItem, Select } from '@mui/material';
import { register } from "../../services/auth.service"
import { useNavigate } from 'react-router-dom';
// import { Context } from '../../context/context';
import { Close } from '@mui/icons-material';
import { set } from '../../services/storage.service';

const defaultTheme = createTheme();

export default function Register() {
  const navigate = useNavigate();
  // const { context, setContext } = useContext(Context)
  const [requestError, setRequestError] = useState<boolean>(false)
  const [registerResult, setRegisterResult] = useState<any>()


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const data = new FormData(event.currentTarget);
    
    const formData = {
      email: data.get('email'),
      password: data.get('password'),
      name: data.get('name'),
      role: data.get('role')
    };

    const result = await register(formData);
    
    if(!result || result.access_token === undefined){
      setRequestError(true)
      setRegisterResult(result)
      return
    }
    
    set('access_token', result.access_token);
    set('user', JSON.stringify(result));
    set('isLoggedIn', 'true')

    // setContext({...context, user:result, isLoggetIn: true})
    navigate("/dashboard")
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
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
                    {registerResult['message']}
                    </Alert>
                </Collapse>
                </Box>}
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'var(--main-color)' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="off"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Role</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Role"
                    placeholder='Select role'
                  >
                    <MenuItem value={"admin"}>Admin</MenuItem>
                    <MenuItem value={"user"}>User</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );
}