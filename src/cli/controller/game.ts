import { executeRobotPosition, RobotPosition, Table } from '../../core'
const Game = class {
  robotPosition: RobotPosition | undefined;
  table: Table;
 
  constructor(table: Table) {
    this.table = table;
  }

  executeInstruction(instruction: string) {
      const command = instruction.split(' ');
      const action = command[0];
      if (action === 'REPORT') {
        if(this.robotPosition) {
          console.log(`${this.robotPosition.y},${this.robotPosition.x},${this.robotPosition.orientation}`);
        }
      } else {
        this.robotPosition = executeRobotPosition({ instruction, robotInput: this.robotPosition, table: this.table });
    }
  }
}
 
export default Game;