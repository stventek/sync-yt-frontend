import { Box, Button, Container, TextField, Typography } from "@material-ui/core"
import Copyright from "../../components/copyright/Copyright"
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Avatar from '@material-ui/core/Avatar'
import useStyles from './styles'
import { useState } from 'react'
import axios from "axios"
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

export default function Admin(){

    const classes = useStyles()
    const history = useHistory();
    const [state, setState] = useState({email: '', password: ''})
    const [errors, setErrors] = useState([] as Array<{message: string, field: string}>)
    
    const handleInputChange = (event : React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setState({
          ...state,
          [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const data = {
            email: state.email,
            password: state.password
        }
        axios.post('http://localhost:5000/user/signin', data).then(e => {
            localStorage.setItem('accessToken', e.data.accessToken)
            localStorage.setItem('exp', e.data.exp)
            history.push('/admin/dashboard')
        }).
        catch((e)=> {
            if(e.response.status === 400) setErrors(e.response.data.fieldErrors)
        })
    } 

    useEffect(() => {
        const exp = parseInt(localStorage.getItem('exp') || '1')
        if(exp > Date.now()) history.push('/admin/dashboard')
    }, [])

    return (
        <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    type="email"
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={handleInputChange}
                    error={Boolean(errors.find(e => e.field === 'email'))}
                    helperText={errors.find(e => e.field === 'email')?.message}/>
                <TextField
                    required
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handleInputChange}
                    error={Boolean(errors.find(e => e.field === 'password'))}
                    helperText={errors.find(e => e.field === 'password')?.message}/>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}>
                    Sign In
                </Button>
            </form>
        </div>
        <Box mt={8}>
            <Copyright/>
        </Box>
    </Container>)
}