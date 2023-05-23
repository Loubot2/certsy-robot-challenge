export enum Facing {
  NORTH = 'NORTH',
  EAST = 'EAST',
  SOUTH = 'SOUTH',
  WEST = 'WEST',
}

export interface RobotPosition {
  x: number
  y: number
  orientation: Facing
}

export interface Table {
  length: number
  width: number
}
