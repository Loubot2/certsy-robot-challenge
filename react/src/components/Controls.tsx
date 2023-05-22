import React from "react";
import  { RobotPosition, Facing } from './types'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {Container, FormControl, InputLabel, Select, MenuItem, Grid} from '@mui/material';
type TableProps = {
  robot?: RobotPosition
}

const Controls = ({robot}: TableProps) => {
  return (
  <Container>
    <Grid>
      <TextField id="place-x" label="X" defaultValue="0"/>
      <TextField id="place-x" label="Y" defaultValue="0"/>
    <FormControl>
      <InputLabel id="demo-simple-select-label">Facing</InputLabel>
      <Select
        id="place-facing"
        label="Facing"
      >
        <MenuItem value={Facing.NORTH}>NORTH</MenuItem>
        <MenuItem value={Facing.SOUTH}>SOUTH</MenuItem>
        <MenuItem value={Facing.EAST}>EAST</MenuItem>
        <MenuItem value={Facing.WEST}>WEST</MenuItem>
      </Select>
    </FormControl>
    <Button>PLACE</Button>
    </Grid>
    <Button disabled={!robot}>MOVE</Button>
    <Button disabled={!robot}>LEFT</Button>
    <Button disabled={!robot}>RIGHT</Button>
    <Button disabled={!robot}>REPORT</Button>
  </Container>
)};

export default Controls;