import { placeRobot, executeInstructions, moveRobot, turnRobotRight, turnRobotLeft } from './robot'
import { Facing, RobotPosition, Table } from './types'

describe('Robot', () => {

  const table: Table  = {
    length: 5,
    width: 5
  }

  test('executeInstructions', () => {
    const instructions = ['PLACE 0,0,NORTH',
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

    const instructionsMoveLeft = ['PLACE 0,0,NORTH',
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

    const instructionsMoveComplex = ['PLACE 1,2,EAST',
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
      const command = '1,0,SOUTH'
      expect(placeRobot(command, table)).toEqual({
        orientation: 'SOUTH',
        x: 1,
        y: 0
      })
    })
  })
  describe('moveRobot', () => {
    test('moveRobot north', () => {
      const southRobot = {
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
      const southRobot :RobotPosition = {
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
      const southRobot = {
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
      const southRobot = {
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
      const southRobot = {
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
    const robot = {
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
    const robot = {
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
