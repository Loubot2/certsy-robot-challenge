import { Facing, RobotPosition, Table } from "./types";

type RobotInput = {
  instructions: string[];
  reportOutput: RobotPosition[];
  table: Table;
  robot?: RobotPosition
}

export const executeInstructions =  ({instructions, table, robot: robotInput, reportOutput}: RobotInput): RobotPosition | undefined => {
  let robot: RobotPosition = robotInput;
  instructions.forEach((instuction: string) => {
    const command = instuction.split(' ');
    if(command.length > 0) {
      const action = command[0];
      if(command.length > 1 && action === 'PLACE') {
        robot = placeRobot(command[1], table);
      }
      //REPORT will announce the X,Y and orientation of the robot.
      if(robot && action === 'REPORT') {
        reportRobot(robot, reportOutput);
      }

      // MOVE will move the toy robot one unit forward in the direction it is currently facing.
      if(robot && action === 'MOVE') {
        console.log('Move Robot', instuction);
        robot = moveRobot(robot, table);
      }
    }
  });
  return robot;
};

//TODO: valididate robot placement
export const placeRobot =  (command: string, table: Table): RobotPosition => {
 const location = command.split(',');
  console.log('place Robot', location);
  const typedFacingString = location[2] as keyof typeof Facing;
  const x = Number.parseInt(location[0]);
  const y = Number.parseInt(location[1]);
  const orientation = Facing[typedFacingString];
  return {
    x,
    y,
    orientation,
  };
};


export const reportRobot =  (robot: RobotPosition, reportOutput: RobotPosition[]) => {
  console.log('Report Robot', robot);
  reportOutput.push({
    x: robot.x,
    y: robot.y,
    orientation: robot.orientation,
  })
};


export const moveRobot =  (robot: RobotPosition, table: Table): RobotPosition => {
  let {x,y,orientation} = robot;
  switch (orientation) {
    case Facing.NORTH: {
      if(x < table.length) x++;
      break;
    }
    case Facing.SOUTH: {
      if(x > 0) x--;
      break;
    }
    case Facing.EAST: {
      if(y < table.width) y++;
      break;
    }
    case Facing.WEST: {
      if(y > 0) y--;
      break;
    }
  }
  return {
    x,
    y,
    orientation,
  };
};