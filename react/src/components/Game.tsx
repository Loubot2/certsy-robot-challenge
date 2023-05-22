import React, {useState} from "react";
import  { RobotPosition } from './types'
import Container from '@mui/material/Container';
import TextControl from './TextControl';
import {executeInstructions} from './Robot';
import GameTable from './GameTable';

const Game = () => {
  const [output, setOutput] = useState<RobotPosition[]>([]);
  const [robot, setRobot] = useState<RobotPosition | undefined>(undefined);

  const onExecute = (instructions: string) => {
    let updatedOutput = [...output];
    const robotOutput = executeInstructions({instructions: instructions.split('\n'), table: {width: 5, length: 5}, robot, reportOutput: updatedOutput});
    setRobot(robotOutput);
    setOutput(updatedOutput);
  }

  const onClear = () => {
    setRobot(undefined)
    setOutput([]);
  }

  const outputList=output.map((robotPosition: RobotPosition)=> {
    return <div>{robotPosition.y},{robotPosition.x} {robotPosition.orientation}</div>
  });
  return (
  <Container>
    <TextControl onExecute={onExecute} onClear={onClear}></TextControl>
        <p>
        output
        </p>
        
        <hr />


        {outputList}

        <GameTable />
  </Container>
)};

export default Game;