import React, { useState } from 'react'
import { type RobotPosition } from '@toy-robot/core'
import { Container, Alert } from '@mui/material'
import TextControl from './TextControl'
import { executeInstructions } from '@toy-robot/core'
import GameTable from './GameTable'

const Game = () => {
  const [output, setOutput] = useState<RobotPosition[]>([])
  const [robot, setRobot] = useState<RobotPosition | undefined>(undefined)
  const [errors, setErrors] = useState<string[]>([])

  const onExecute = (instructions: string) => {
    const updatedOutput = [...output]
    const updatedErrors = [...errors]
    const robotOutput = executeInstructions({ instructions: instructions.split('\n'), table: { width: 5, length: 5 }, robot, reportOutput: updatedOutput, errorOutput: updatedErrors })
    setRobot(robotOutput)
    setOutput(updatedOutput)
    setErrors(updatedErrors)
  }

  const onClear = () => {
    setRobot(undefined)
    setOutput([])
    setErrors([])
  }

  const outputList = output.map((robotPosition: RobotPosition) => {
    return <div>{robotPosition.y},{robotPosition.x} {robotPosition.orientation}</div>
  })
  let error: JSX.Element | undefined
  if (errors.length > 0) {
    const errorList = errors.map((error: string) => {
      return <div>{error}</div>
    })
    error = <Alert severity="error">{errorList}</Alert>
  }
  return (
  <Container>
    <TextControl onExecute={onExecute} onClear={onClear}></TextControl>
        <p>
        output:
        </p>
{error}
        <hr />

        {outputList}

        <GameTable robot={robot}/>
  </Container>
  )
}

export default Game
