import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { useState } from 'react';
import ColorPicker from '../color-picker/ColorPicker';
import validateUserConfigForm from './validation';

type propsType = {
    handleClose : () => void,
    handleSave: (username: string, color: string) => void,
    open: boolean
}

export default function UserConfigDialog(props: propsType) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));

    const [formData, setFormData] = useState(
        {username: localStorage.getItem('username') || '', 
        color: localStorage.getItem('color') || 'red'});
    const [errors, setErrors] = useState({username: null} as {username: string | null})

    const handleInputChange = (event : any) => {
        setFormData({
          ...formData,
          [event.target.name]: event.target.value
        });
    }

    const handleSubmit = () => {
        const errorsValdiation = validateUserConfigForm(formData)
        if(errorsValdiation.username)
            setErrors({...errors, username: errorsValdiation.username})
        else
            props.handleSave(formData.username, formData.color)
    }

    const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
          });
      };

    return <div>
        <Dialog fullScreen={fullScreen} open={props.open} onClose={props.handleClose}>
            <DialogTitle>User settings</DialogTitle>
            <DialogContent>
                <DialogContentText>
                Change your username and color.
                </DialogContentText>
                <TextField
                defaultValue={formData.username}
                error={errors.username ? true : false}
                helperText={errors.username}
                name="username"
                onChange={handleInputChange}
                autoFocus
                margin="dense"
                id="name"
                label="Username"
                type="text"
                fullWidth
                variant="standard"
                />
                <Typography variant="subtitle1">Change username color</Typography>
                <ColorPicker handleChange={handleColorChange} value={formData.color}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Save</Button>
            </DialogActions>
        </Dialog>
    </div>;
}
