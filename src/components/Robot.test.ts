import { placeRobot, executeInstructions, moveRobot, turnRobotRight, turnRobotLeft } from './Robot'
import { Facing, type RobotPosition, type Table } from './types'

describe('Robot', () => {
  const table: Table = {
    length: 5,
    width: 5
  }
  test('executeInstructions', () => {
    const instructions: string[] = ['PLACE 0,0,NORTH',
      'MOVE',
      'REPORT']
    expect(executeInstructions({
      instructions,
      reportOutput: [],
      errorOutput: [],
      table
    })).toEqual({
      orientation: 'NORTH',
      x: 0,
      y: 1
    })

    const instructionsMoveLeft: string[] = ['PLACE 0,0,NORTH',
      'LEFT',
      'REPORT']
    expect(executeInstructions({
      instructions: instructionsMoveLeft,
      reportOutput: [],
      errorOutput: [],
      table
    })).toEqual({
      orientation: 'WEST',
      x: 0,
      y: 0
    })

    const instructionsMoveComplex: string[] = ['PLACE 1,2,EAST',
      'MOVE',
      'MOVE',
      'LEFT',
      'MOVE',
      'REPORT'
    ]
    expect(executeInstructions({
      instructions: instructionsMoveComplex,
      reportOutput: [],
      errorOutput: [],
      table
    })).toEqual({
      orientation: 'NORTH',
      x: 3,
      y: 3
    })
  })

  describe('placeRobot', () => {
    test('should placeRobot successfully', () => {
      const command: string = '1,0,SOUTH'
      const table: Table = {
        length: 5,
        width: 5
      }
      expect(placeRobot(command, table)).toEqual({
        orientation: 'SOUTH',
        x: 1,
        y: 0
      })
    })
  })
  describe('moveRobot', () => {
    test('moveRobot north', () => {
      const southRobot: RobotPosition = {
        orientation: Facing.NORTH,
        x: 1,
        y: 1
      }
      expect(moveRobot(southRobot, table)).toEqual({
        orientation: Facing.NORTH,
        x: 1,
        y: 2
      })
    })

    test('moveRobot north out of bounds', () => {
      const southRobot: RobotPosition = {
        orientation: Facing.NORTH,
        x: 4,
        y: 4
      }
      expect(moveRobot(southRobot, table)).toEqual({
        orientation: Facing.NORTH,
        x: 4,
        y: 4
      })
    })

    test('moveRobot east', () => {
      const southRobot: RobotPosition = {
        orientation: Facing.EAST,
        x: 1,
        y: 1
      }
      expect(moveRobot(southRobot, table)).toEqual({
        orientation: Facing.EAST,
        x: 2,
        y: 1
      })
    })

    test('moveRobot south', () => {
      const southRobot: RobotPosition = {
        orientation: Facing.SOUTH,
        x: 1,
        y: 1
      }
      expect(moveRobot(southRobot, table)).toEqual({
        orientation: Facing.SOUTH,
        x: 1,
        y: 0
      })
    })

    test('moveRobot west', () => {
      const southRobot: RobotPosition = {
        orientation: Facing.WEST,
        x: 1,
        y: 1
      }
      expect(moveRobot(southRobot, table)).toEqual({
        orientation: Facing.WEST,
        x: 0,
        y: 1
      })
    })
  })

  test('turnRobotLeft', () => {
    const robot: RobotPosition = {
      orientation: Facing.NORTH,
      x: 1,
      y: 0
    }
    expect(turnRobotLeft(robot)).toEqual({
      orientation: Facing.WEST,
      x: 1,
      y: 0
    })
  })

  test('turnRobotRight', () => {
    const robot: RobotPosition = {
      orientation: Facing.NORTH,
      x: 1,
      y: 0
    }
    expect(turnRobotRight(robot)).toEqual({
      orientation: Facing.EAST,
      x: 1,
      y: 0
    })
  })
})
