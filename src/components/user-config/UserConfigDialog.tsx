import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Box, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { useState } from 'react';
import ColorPicker from '../color-picker/ColorPicker';
import validateUserConfigForm from './validation';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import SettingsBrightnessIcon from '@material-ui/icons/SettingsBrightness';
import { ColorModeContext } from '../../App';

type propsType = {
    handleClose : () => void,
    handleSave: () => void,
    open: boolean
}

const ColorPickerMemo = React.memo((props: any) => {
    return <ColorPicker handleChange={props.handleColorChange} value={props.color}/>
})

export default function UserConfigDialog(props: propsType) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('xs'))
    const [formData, setFormData] = useState(
        {
            username: localStorage.getItem('username') || '', 
            color: localStorage.getItem('color') || 'red', 
            mode: localStorage.getItem('mode') || 'system'})

    const [errors, setErrors] = useState({username: null} as {username: string | null})

    const colorMode = React.useContext(ColorModeContext);

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
        else{
            localStorage.setItem('mode', (formData.mode))
            localStorage.setItem('username', formData.username)
            localStorage.setItem('color', formData.color)
            colorMode.changeColorMode(formData.mode)
            props.handleSave()
        }
    }

    const handleColorChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((formData) => {
            return {
                ...formData,
                [event.target.name]: event.target.value
            }
        })}, [])

    const handleThemeChange = (event: React.MouseEvent<HTMLElement, MouseEvent>, value: string) => {
        setFormData({
            ...formData,
            mode: value
          })
      }

    return <div>
        <Dialog maxWidth="xs" fullScreen={fullScreen} open={props.open} onClose={props.handleClose}>
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
                <Box mt={1}>
                    <ColorPickerMemo handleColorChange={handleColorChange} value={formData.color}/>
                </Box>
                <Box mt={1}>
                <ToggleButtonGroup
                    value={formData.mode}
                    exclusive
                    onChange={handleThemeChange}
                    aria-label="text alignment">
                    <ToggleButton style={{textTransform: 'none'}} value="light" aria-label="light theme">
                        <Brightness4Icon style={{marginRight: 8}} />
                        Light
                    </ToggleButton>
                    <ToggleButton style={{textTransform: 'none'}} value='system' aria-label="system theme">
                        <SettingsBrightnessIcon style={{marginRight: 8}}/>
                        System
                    </ToggleButton>
                    <ToggleButton style={{textTransform: 'none'}} value="dark" aria-label="dark theme">
                        <Brightness7Icon style={{marginRight: 8}}/>
                        Dark
                    </ToggleButton>
                </ToggleButtonGroup>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Save</Button>
            </DialogActions>
        </Dialog>
    </div>;
}
