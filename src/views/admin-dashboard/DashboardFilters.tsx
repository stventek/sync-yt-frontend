import { Box, Button, FormControl, InputLabel, MenuItem, Select } from "@material-ui/core"
import useStyles from './styles'
import {KeyboardDatePicker} from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { MaterialUiPickersDate } from "@material-ui/pickers/typings/date";
import { ChangeEvent } from "react";

type props = {
    groupBy: string,
    fromDate: string, 
    toDate: string, 
    handleDateChange: (e: MaterialUiPickersDate, name: string) => void,
    handleGroupByChange: (e: ChangeEvent<{name?: string | undefined, value: unknown}>) => void
}

export default function DashboardFilters(props: props){

    const classes = useStyles()

    return <Box display="flex" flexWrap="wrap" alignItems="flex-end" mt={3} maxWidth={750}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <KeyboardDatePicker
                style={{width: 251}}
                className={classes.filterItem}
                name="fromDate"
                onChange={(e => {props.handleDateChange(e, 'fromDate')})}
                value={props.fromDate}
                disableToolbar
                variant="inline"
                format="DD/MM/YYYY"
                margin="none"
                id="date-picker-inline"
                label="Date picker inline"
                KeyboardButtonProps={{
                    'aria-label': 'change date'}}/>
            <KeyboardDatePicker
                className={classes.filterItem}
                style={{width: 251}}
                name="toDate"
                onChange={(e => {props.handleDateChange(e, 'toDate')})}
                value={props.toDate}
                disableToolbar
                variant="inline"
                format="DD/MM/YYYY"
                margin="none"
                id="date-picker-inline"
                label="Date picker inline"
                KeyboardButtonProps={{
                    'aria-label': 'change date'}}/>
            <FormControl className={classes.filterItem} style={{ width: 90}}>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                    <Select
                        name="groupBy"
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={props.groupBy}
                        onChange={props.handleGroupByChange}
                    >
                        <MenuItem value={'day'}>Day</MenuItem>
                        <MenuItem value={'month'}>Month</MenuItem>
                    </Select>
            </FormControl>
            <Button 
                type="submit"
                variant="contained" 
                className={classes.filterItem} 
                style={{ background: '#3ea6ff', width: 90}}>
                    Update
            </Button>
        </MuiPickersUtilsProvider>
    </Box>
}