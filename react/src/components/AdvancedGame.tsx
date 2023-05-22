import React from "react";
import  { RobotPosition } from './types'
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Table from './Table';
import Controls from './Controls';

type TableProps = {
  robot?: RobotPosition
}

const Game = ({robot}: TableProps) => {

  return (
  <Container>
    <Controls></Controls>
        <p>
        {robot? 'robot placed' : 'place a robot to begin'}
        </p>
        
        <hr />


        <Grid container spacing={2} minHeight={160}>
        <Grid xs display="flex" justifyContent="center" alignItems="center">
        West
        </Grid>
        <Grid display="flex" justifyContent="center" alignItems="center">
        <Table />
        </Grid>
        <Grid xs display="flex" justifyContent="center" alignItems="center">
        East
        </Grid>
      </Grid>
  </Container>
)};

export default Game;