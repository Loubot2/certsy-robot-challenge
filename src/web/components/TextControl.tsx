import React, { useState } from 'react'
import Button from '@mui/material/Button'
import { Container, TextareaAutosize, FormControl, InputLabel, Grid, Box, ButtonGroup } from '@mui/material'
interface TableProps {
  onExecute: (instructions: string) => void
  onClear: () => void
}

const TextControl = ({ onExecute, onClear }: TableProps) => {
  const [instructions, setInstructions] = useState('')
  return (
  <Container>
    <Grid>
      <Box margin={5}>
        <ul>
          <li>PLACE will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST.</li>
          <li>The origin (0,0) can be considered to be the SOUTH WEST most corner.</li>
          <li>The first valid command to the robot is a PLACE command, after that, any sequence of commands may be issued, in any order, including another PLACE command. The application should discard all commands in the sequence until a valid PLACE command has been executed.</li>
          <li>MOVE will move the toy robot one unit forward in the direction it is currently facing.</li>
          <li>LEFT and RIGHT will rotate the robot 90 degrees in the specified direction without changing the position of the robot.</li>
          <li>REPORT will announce the X,Y and orientation of the robot.</li>
          <li>A robot that is not on the table can choose to ignore the MOVE, LEFT, RIGHT and REPORT commands.</li>
        </ul>

      </Box>

      <InputLabel id="demo-simple-select-label">Instructions</InputLabel>
    <FormControl>
      <TextareaAutosize
      minRows={10}
      id="commands"
      onChange={(e) => {
        if (instructions !== e.target.value) {
          setInstructions(e.target.value)
        }
      }}
      />
    </FormControl>

    </Grid>
    <Box margin={5}>
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
      <Button onClick={() => {
        onExecute(instructions)
      }}>Execute</Button>

      <Button onClick={() => { onClear() }}>Clear</Button>
    </ButtonGroup>
    </Box>
  </Container>
  )
}

export default TextControl
