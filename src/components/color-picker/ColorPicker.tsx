import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { Grid } from "@material-ui/core";
import Tooltip from '@material-ui/core/Tooltip';
import ColorRadioIcon from './ColorRadioIcon';

export default function ColorPicker(props: {handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void, value: string}) {

  return (
      <RadioGroup style={{display: 'flex'}} aria-label="gender" name="color" value={props.value} onChange={props.handleChange}>
        <Grid container >
            <Grid item><Tooltip title="Red" placement="top"><Radio value="red" icon={<ColorRadioIcon color="red" checked={false}/>} checkedIcon={<ColorRadioIcon color="red" checked />}/></Tooltip></Grid>
            <Grid item><Tooltip title="Green" placement="top"><Radio value="green" icon={<ColorRadioIcon color="green" checked={false}/>} checkedIcon={<ColorRadioIcon color="green" checked />}/></Tooltip></Grid>
            <Grid item><Tooltip title="Blue" placement="top"><Radio value="blue" icon={<ColorRadioIcon color="blue" checked={false}/>} checkedIcon={<ColorRadioIcon color="blue" checked />}/></Tooltip></Grid>
            <Grid item><Tooltip title="Dark Red" placement="top"><Radio value="#B22222" icon={<ColorRadioIcon color="#B22222" checked={false}/>} checkedIcon={<ColorRadioIcon color="#B22222" checked />}/></Tooltip></Grid>
            <Grid item><Tooltip title="Light Orange" placement="top"><Radio value="#FF7F50" icon={<ColorRadioIcon color="#FF7F50" checked={false}/>} checkedIcon={<ColorRadioIcon color="#FF7F50" checked />}/></Tooltip></Grid>
            <Grid item><Tooltip title="Yellow Green" placement="top"><Radio value="#9ACD32" icon={<ColorRadioIcon color="#9ACD32" checked={false}/>} checkedIcon={<ColorRadioIcon color="#9ACD32" checked />}/></Tooltip></Grid>
            <Grid item><Tooltip title="Orange" placement="top"><Radio value="#FF4500" icon={<ColorRadioIcon color="#FF4500" checked={false}/>} checkedIcon={<ColorRadioIcon color="#FF4500" checked />}/></Tooltip></Grid>
            <Grid item><Tooltip title="Sea Green" placement="top"><Radio value="#2E8B57" icon={<ColorRadioIcon color="#2E8B57" checked={false}/>} checkedIcon={<ColorRadioIcon color="#2E8B57" checked />}/></Tooltip></Grid>
            <Grid item><Tooltip title="Goldenrod" placement="top"><Radio value="DAA520" icon={<ColorRadioIcon color="#DAA520" checked={false}/>} checkedIcon={<ColorRadioIcon color="#DAA520" checked />}/></Tooltip></Grid>
            <Grid item><Tooltip title="Chocolate" placement="top"><Radio value="#D2691E" icon={<ColorRadioIcon color="#D2691E" checked={false}/>} checkedIcon={<ColorRadioIcon color="#D2691E" checked />}/></Tooltip></Grid>
            <Grid item><Tooltip title="Cadet Blue" placement="top"><Radio value="#5F9EA0" icon={<ColorRadioIcon color="#5F9EA0" checked={false}/>} checkedIcon={<ColorRadioIcon color="#5F9EA0" checked />}/></Tooltip></Grid>
            <Grid item><Tooltip title="Dogder Blue" placement="top"><Radio value="#1E90FF" icon={<ColorRadioIcon color="#1E90FF" checked={false}/>} checkedIcon={<ColorRadioIcon color="#1E90FF" checked />}/></Tooltip></Grid>
            <Grid item><Tooltip title="Hot Pink" placement="top"><Radio value="#FF69B4" icon={<ColorRadioIcon color="#FF69B4" checked={false}/>} checkedIcon={<ColorRadioIcon color="#FF69B4" checked />}/></Tooltip></Grid>
            <Grid item><Tooltip title="Blue Violet" placement="top"><Radio value="8A2BE2" icon={<ColorRadioIcon color="#8A2BE2" checked={false}/>} checkedIcon={<ColorRadioIcon color="#8A2BE2" checked />}/></Tooltip></Grid>
            <Grid item><Tooltip title="Spring Green" placement="top"><Radio value="#00FF7F" icon={<ColorRadioIcon color="#00FF7F" checked={false}/>} checkedIcon={<ColorRadioIcon color="#00FF7F" checked />}/></Tooltip></Grid>
        </Grid>
      </RadioGroup>
  );
}