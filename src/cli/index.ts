import promptSync from 'prompt-sync';
import { Table } from '../core'
import Game from './controller/game'

console.log('cli');
  // This variable is used to determine if the app should continue prompting the user for input
  let exit = false;

  console.log(`PLACE will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST.
  The origin (0,0) can be considered to be the SOUTH WEST most corner.
  The first valid command to the robot is a PLACE command, after that, any sequence of commands may be issued, in any order, including another PLACE command. The application should discard all commands in the sequence until a valid PLACE command has been executed.
  MOVE will move the toy robot one unit forward in the direction it is currently facing.
  LEFT and RIGHT will rotate the robot 90 degrees in the specified direction without changing the position of the robot.
  REPORT will announce the X,Y and orientation of the robot.
  A robot that is not on the table can choose to ignore the MOVE, LEFT, RIGHT and REPORT commands.
  to exit type 'exit'`)

  const prompt = promptSync({sigint: true});
  const table :Table = {
    length: 5,
    width: 5
  }
  const game = new Game(table);
  while (!exit) {
    // Get user input
    let instruction = prompt('enter command for robot: \n');

    if (instruction.toUpperCase() === 'exit') {
      exit = true;
    } else {
      try {
        game.executeInstruction(instruction?.toUpperCase());
      } catch (error) {
          console.error(error);
      }
    }
  }