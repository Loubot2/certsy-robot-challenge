import { Facing, RobotPosition, Table } from './types'

interface RobotInput {
  instructions: string[]
  errorOutput: string[]
  reportOutput: RobotPosition[]
  table: Table
  robot?: RobotPosition
}

export const executeInstructions = ({ instructions, table, robot: robotInput, reportOutput, errorOutput }: RobotInput): RobotPosition | undefined => {
  let robot: RobotPosition | undefined = robotInput
  instructions.forEach((instruction: string) => {
    try {
    robot = executeInstruction({
      instruction,
      robotInput: robot,
      table,
      reportOutput
    });
  } catch (error) {
    errorOutput.push(error as string)
  }
  })
  return robot
}

export const executeInstruction = ({ instruction, robotInput, table, reportOutput }: { instruction: string, robotInput: RobotPosition | undefined,
  reportOutput: RobotPosition[], table: Table }): RobotPosition | undefined => {
    let robot: RobotPosition | undefined = robotInput
    const command = instruction.split(' ');
    const action = command[0];
    if (action === 'REPORT') {
      reportRobot(robot, reportOutput)
    } else {
      return executeRobotPosition({ instruction, robotInput, table });
  }
  return robot
}

export const executeRobotPosition = ({ instruction, robotInput, table }: { instruction: string, robotInput: RobotPosition | undefined,
   table: Table }): RobotPosition | undefined => {
  let robot: RobotPosition | undefined = robotInput
    const command = instruction.split(' ')
    if (command.length > 0) {
      const action = command[0]
      if (action === 'PLACE') {
        if (command.length > 1) {
          robot = placeRobot(command[1], table)
        } else {
          throw 'Place instructions missing'
        }
      }
      if (robot) {
        switch (action) {
          case 'MOVE': {
            robot = moveRobot(robot, table)
            break
          }
          case 'LEFT': {
            robot = turnRobotLeft(robot)
            break
          }
          case 'RIGHT': {
            robot = turnRobotRight(robot)
            break
          }
        }
      }
    }
  return robot
}

export const placeRobot = (command: string, table: Table): RobotPosition | undefined => {
  const location = command.split(',')
  const typedFacingString = location[2] as keyof typeof Facing
  const x = Number.parseInt(location[0])
  const y = Number.parseInt(location[1])
  const orientation = Facing[typedFacingString]
  const valid = !!orientation && x >= 0 && y >= 0 && x < table.width && y < table.length
  if (valid) {
    return {
      x,
      y,
      orientation
    }
  } else throw 'Invalid Placement Command example: PLACE 0,0,NORTH'
}

export const reportRobot = (robot: RobotPosition | undefined, reportOutput: RobotPosition[]) => {
  if(robot) {
    reportOutput.push({
      x: robot.x,
      y: robot.y,
      orientation: robot.orientation
    })
  }
}

export const turnRobotRight = (robot: RobotPosition): RobotPosition => {
  let { x, y, orientation } = robot
  switch (orientation) {
    case Facing.NORTH: {
      orientation = Facing.EAST
      break
    }
    case Facing.EAST: {
      orientation = Facing.SOUTH
      break
    }
    case Facing.SOUTH: {
      orientation = Facing.WEST
      break
    }
    case Facing.WEST: {
      orientation = Facing.NORTH
      break
    }
  }
  return {
    x,
    y,
    orientation
  }
}

export const turnRobotLeft = (robot: RobotPosition): RobotPosition => {
  let { x, y, orientation } = robot
  switch (orientation) {
    case Facing.NORTH: {
      orientation = Facing.WEST
      break
    }
    case Facing.SOUTH: {
      orientation = Facing.EAST
      break
    }
    case Facing.EAST: {
      orientation = Facing.NORTH
      break
    }
    case Facing.WEST: {
      orientation = Facing.SOUTH
      break
    }
  }
  return {
    x,
    y,
    orientation
  }
}

export const moveRobot = (robot: RobotPosition, table: Table): RobotPosition => {
  // x axis is east, west
  // y axis is north, south
  let { x, y, orientation } = robot
  switch (orientation) {
    case Facing.NORTH: {
      if (y < table.length - 1) y++
      break
    }
    case Facing.SOUTH: {
      if (y > 0) y--
      break
    }
    case Facing.EAST: {
      if (x < table.width - 1) x++
      break
    }
    case Facing.WEST: {
      if (x > 0) x--
      break
    }
  }
  return {
    x,
    y,
    orientation
  }
}
