export enum Facing  {
  NORTH = "NORTH", 
  EAST = "EAST", 
  SOUTH = "SOUTH", 
  WEST = "WEST", 
}

export type RobotPosition =  {
  x: number;
  y: number;
  orientation: Facing;
}

export type Table =  {
  length: number;
  width: number;
}