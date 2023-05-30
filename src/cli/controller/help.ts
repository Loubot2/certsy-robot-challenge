const help = (): void => {
  console.log('> PLACE will put the toy robot on the table in position X,Y and facing NORTH, SOUTH, EAST or WEST. \n' +
  'The origin (0,0) can be considered to be the SOUTH WEST most corner.\n' +
  'The first valid command to the robot is a PLACE command, after that, any sequence of commands may be issued, in any order, including another PLACE command. The application should discard all commands in the sequence until a valid PLACE command has been executed.\n' +
  '> MOVE will move the toy robot one unit forward in the direction it is currently facing.\n' +
  '> LEFT and RIGHT will rotate the robot 90 degrees in the specified direction without changing the position of the robot.\n' +
  '> REPORT will announce the X,Y and orientation of the robot.A robot that is not on the table can choose to ignore the MOVE, LEFT, RIGHT and REPORT commands.\n' +
  '> EXIT exit this program.\n' +
  '> you can also exit the program using ctrl-c.\n' +
  '  use tab to autocomplete')
}

export default help
